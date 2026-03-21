const fs = require('fs')
const path = require('path')

const DATA_DIR = path.join(__dirname, 'data')
const TOPICS_DIR = path.join(DATA_DIR, 'topics')

exports.sourceNodes = ({ actions, createNodeId, createContentDigest, reporter }) => {
  const { createNode } = actions

  // Load tags
  const tags = JSON.parse(fs.readFileSync(path.join(DATA_DIR, 'tags.json'), 'utf8'))
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

  // Load topics from individual JSON files
  const files = fs.readdirSync(TOPICS_DIR).filter(f => f.endsWith('.json'))
  files.forEach(file => {
    const detail = JSON.parse(fs.readFileSync(path.join(TOPICS_DIR, file), 'utf8'))
    createNode({
      apiId: detail.id,
      title: detail.title?.trim() || '',
      description: detail.description || '',
      slug: detail.slug,
      imageUrl: detail.image?.url || '',
      imageWidth: detail.image?.width || 400,
      imageHeight: detail.image?.height || 400,
      topicType: detail.topicType?.name || null,
      tagIds: (detail.tags || []).map(t => t.id),
      tagTitles: (detail.tags || []).map(t => t.title),
      whatDescription: detail.whatDescription || '',
      howDescription: detail.howDescription || '',
      links: JSON.stringify(detail.links || []),
      cards: JSON.stringify(detail.cards || []),
      id: createNodeId(`Topic-${detail.id}`),
      internal: {
        type: 'Topic',
        contentDigest: createContentDigest(detail),
      },
    })
  })
  reporter.info(`Loaded ${files.length} topics from data/topics/`)
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
      allTopic {
        nodes {
          slug
        }
      }
    }
  `)

  if (result.errors) {
    reporter.panicOnBuild('Error querying topics', result.errors)
    return
  }

  const topicTemplate = require.resolve('./src/templates/topic.js')
  result.data.allTopic.nodes.forEach(({ slug }) => {
    createPage({
      path: `/topics/${slug}`,
      component: topicTemplate,
      context: { slug },
    })
  })

  reporter.info(`Created ${result.data.allTopic.nodes.length} topic pages`)
}
