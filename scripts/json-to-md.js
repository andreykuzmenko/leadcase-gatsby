/**
 * Migrate topic JSON files to Markdown with YAML frontmatter.
 * Run with: node scripts/json-to-md.js
 *
 * Reads data/topics/*.json and writes data/topics/*.md
 * JSON files are NOT deleted — delete them manually after verifying the build.
 */

const fs = require('fs')
const path = require('path')
const matter = require('gray-matter')

const DATA_DIR = path.join(__dirname, '../data')
const TOPICS_DIR = path.join(DATA_DIR, 'topics')

const tags = JSON.parse(fs.readFileSync(path.join(DATA_DIR, 'tags.json'), 'utf8'))
const tagByTitle = Object.fromEntries(tags.map(t => [t.title, t]))

const files = fs.readdirSync(TOPICS_DIR).filter(f => f.endsWith('.json'))
let success = 0

files.forEach(file => {
  const detail = JSON.parse(fs.readFileSync(path.join(TOPICS_DIR, file), 'utf8'))

  // Validate tags
  ;(detail.tags || []).forEach(t => {
    if (!tagByTitle[t.title]) {
      console.warn(`  ⚠ Unknown tag "${t.title}" in ${file}`)
    }
  })

  const frontmatter = {
    id: detail.id,
    title: (detail.title || '').trim(),
    slug: detail.slug,
    description: detail.description || '',
    ...(detail.topicType?.name ? { topicType: detail.topicType.name } : {}),
    tags: (detail.tags || []).map(t => t.title),
    links: (detail.links || []).map(l => ({
      title: l.title,
      url: l.url,
      ...(l.minutes != null ? { minutes: l.minutes } : {}),
    })),
    ...(detail.whatDescription ? { whatDescription: detail.whatDescription } : {}),
    ...(detail.howDescription ? { howDescription: detail.howDescription } : {}),
  }

  // Build body from cards sorted by orderRank
  const cards = [...(detail.cards || [])].sort((a, b) => (a.orderRank ?? 0) - (b.orderRank ?? 0))

  const bodyParts = cards.map(card => {
    const title = (card.title || '').trim()
    let section = `## ${title}\n\n`
    if (card.image?.localUrl) {
      section += `<!-- image: ${card.image.localUrl} -->\n\n`
    }
    if (card.text) {
      section += card.text.trim() + '\n'
    }
    return section
  })

  const body = bodyParts.join('\n')
  const mdContent = matter.stringify(body, frontmatter)

  const outPath = path.join(TOPICS_DIR, file.replace('.json', '.md'))
  fs.writeFileSync(outPath, mdContent)
  success++
  process.stdout.write(`\r  Converted ${success}/${files.length}...`)
})

console.log(`\n✓ Done. ${success} topics written to data/topics/*.md`)
console.log('  JSON files are still present — delete them after verifying the build.')
