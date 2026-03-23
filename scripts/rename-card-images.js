const fs = require('fs')
const path = require('path')

const TOPICS_DIR = path.join(__dirname, '../data/topics')
const CARDS_DIR = path.join(__dirname, '../static/images/cards')

function toSlug(text) {
  return text
    .replace(/[\u{1F000}-\u{1FFFF}]/gu, '')  // remove emojis
    .replace(/[^\w\s-]/g, '')                  // remove special chars
    .trim()
    .toLowerCase()
    .replace(/\s+/g, '-')                      // spaces to hyphens
    .replace(/-+/g, '-')                       // collapse multiple hyphens
    .replace(/^-|-$/g, '')                     // trim leading/trailing hyphens
}

const files = fs.readdirSync(TOPICS_DIR).filter(f => f.endsWith('.md'))

for (const file of files) {
  const topicId = path.basename(file, '.md')
  const mdPath = path.join(TOPICS_DIR, file)
  let content = fs.readFileSync(mdPath, 'utf8')

  const lines = content.split('\n')
  const renames = []
  const usedSlugs = new Map() // slug -> count, to handle duplicates

  let lastHeading = topicId

  for (let i = 0; i < lines.length; i++) {
    const headingMatch = lines[i].match(/^#{1,3}\s+(.+)/)
    if (headingMatch) {
      lastHeading = toSlug(headingMatch[1])
    }

    const imageMatch = lines[i].match(/<!-- image: \/images\/cards\/[^/]+\/(.+?) -->/)
    if (imageMatch) {
      const oldFilename = imageMatch[1]
      const ext = path.extname(oldFilename)

      // Handle duplicate headings in same topic
      const count = usedSlugs.get(lastHeading) || 0
      usedSlugs.set(lastHeading, count + 1)
      const newFilename = count === 0 ? `${lastHeading}${ext}` : `${lastHeading}-${count + 1}${ext}`

      renames.push({ oldFilename, newFilename })
    }
  }

  if (!renames.length) continue

  for (const { oldFilename, newFilename } of renames) {
    if (oldFilename === newFilename) continue

    const src = path.join(CARDS_DIR, topicId, oldFilename)
    const dest = path.join(CARDS_DIR, topicId, newFilename)

    if (!fs.existsSync(src)) {
      console.warn(`  MISSING: ${topicId}/${oldFilename}`)
      continue
    }

    fs.renameSync(src, dest)
    content = content.replace(
      `/images/cards/${topicId}/${oldFilename}`,
      `/images/cards/${topicId}/${newFilename}`
    )
    console.log(`  ${topicId}: ${oldFilename} → ${newFilename}`)
  }

  fs.writeFileSync(mdPath, content, 'utf8')
}

console.log('\nDone.')
