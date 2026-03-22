const fs = require('fs')
const path = require('path')
const matter = require('gray-matter')
const { marked } = require('marked')

const DATA_DIR = path.join(__dirname, 'data')
const TOPICS_DIR = path.join(DATA_DIR, 'topics')

function parseCards(body) {
  const sections = body.split(/^## /m).filter(s => s.trim())
  return sections.map((section, i) => {
    const newline = section.indexOf('\n')
    const title = newline === -1 ? section.trim() : section.slice(0, newline).trim()
    const rest = newline === -1 ? '' : section.slice(newline + 1)

    const imageMatch = rest.match(/<!--\s*image:\s*(.+?)\s*-->/)
    const imageLocalUrl = imageMatch ? imageMatch[1].trim() : null
    const mdText = imageMatch
      ? rest.replace(/<!--\s*image:\s*.+?\s*-->\n?/, '').trim()
      : rest.trim()
    const text = mdText ? marked(mdText) : ''

    return {
      id: `card-${i}`,
      title,
      text,
      orderRank: i,
      image: imageLocalUrl ? { localUrl: imageLocalUrl } : null,
    }
  })
}

exports.sourceNodes = ({ actions, createNodeId, createContentDigest, reporter }) => {
  const { createNode } = actions

  // Load tags
  const tags = JSON.parse(fs.readFileSync(path.join(DATA_DIR, 'tags.json'), 'utf8'))
  const tagByTitle = Object.fromEntries(tags.map(t => [t.title, t]))
  tags.forEach(tag => {
    createNode({
      ...tag,
      apiId: tag.id,
      id: createNodeId(`Tag-${tag.id}`),
      internal: {
        type: 'Tag',
        contentDigest: createContentDigest(tag),
      },
    })
  })
  reporter.info(`Loaded ${tags.length} tags from data/tags.json`)

  // Load topic order
  const topicOrder = JSON.parse(fs.readFileSync(path.join(DATA_DIR, 'topic-order.json'), 'utf8'))
  const orderMap = Object.fromEntries(topicOrder.map((slug, i) => [slug, i]))

  // Load topics from .md files
  const files = fs.readdirSync(TOPICS_DIR).filter(f => f.endsWith('.md'))
  files.forEach(file => {
    const raw = fs.readFileSync(path.join(TOPICS_DIR, file), 'utf8')
    const { data: fm, content: body } = matter(raw)

    const tagObjects = (fm.tags || []).map(title => {
      const tag = tagByTitle[title]
      if (!tag) reporter.warn(`Unknown tag "${title}" in ${file}`)
      return tag
    }).filter(Boolean)

    const cards = parseCards(body)

    createNode({
      apiId: fm.id,
      title: (fm.title || '').trim(),
      description: fm.description || '',
      slug: fm.slug,
      orderRank: orderMap[fm.slug] ?? 999,
      topicType: fm.topicType || null,
      tagIds: tagObjects.map(t => t.id),
      tagTitles: tagObjects.map(t => t.title),
      links: JSON.stringify(fm.links || []),
      cards: JSON.stringify(cards),
      id: createNodeId(`Topic-${fm.id}`),
      internal: {
        type: 'Topic',
        contentDigest: createContentDigest(raw),
      },
    })
  })
  reporter.info(`Loaded ${files.length} topics from data/topics/*.md`)
}

exports.createResolvers = ({ createResolvers }) => {
  createResolvers({
    Topic: {
      localImage: {
        type: 'File',
        resolve(source, args, context) {
          return context.nodeModel.findOne({
            type: 'File',
            query: {
              filter: {
                sourceInstanceName: { eq: 'topic-images' },
                name: { eq: source.slug },
              },
            },
          })
        },
      },
    },
  })
}

exports.createPages = async ({ graphql, actions, reporter }) => {
  const { createPage } = actions

  const result = await graphql(`
    query {
      allTopic(sort: { orderRank: ASC }) {
        nodes {
          slug
          tagIds
        }
      }
    }
  `)

  if (result.errors) {
    reporter.panicOnBuild('Error querying topics', result.errors)
    return
  }

  const allTopics = result.data.allTopic.nodes
  const topicTemplate = require.resolve('./src/templates/topic.js')

  allTopics.forEach(({ slug, tagIds }) => {
    const relatedSlugs = allTopics
      .filter(t => t.slug !== slug && t.tagIds.some(id => tagIds.includes(id)))
      .slice(0, 6)
      .map(t => t.slug)

    createPage({
      path: `/topics/${slug}`,
      component: topicTemplate,
      context: { slug, relatedSlugs },
    })
  })

  reporter.info(`Created ${result.data.allTopic.nodes.length} topic pages`)
}
