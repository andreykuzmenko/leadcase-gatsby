const fs = require('fs')
const path = require('path')

const TOPICS_DIR = path.join(__dirname, '../data/topics')
const CARDS_DIR = path.join(__dirname, '../static/images/cards')

const files = fs.readdirSync(TOPICS_DIR).filter(f => f.endsWith('.md'))

for (const file of files) {
  const topicId = path.basename(file, '.md')
  const mdPath = path.join(TOPICS_DIR, file)
  let content = fs.readFileSync(mdPath, 'utf8')

  // Find all image references in this topic
  const imageRefs = [...content.matchAll(/<!-- image: \/images\/cards\/(.+?) -->/g)]
  if (!imageRefs.length) continue

  // Create per-topic folder
  const topicDir = path.join(CARDS_DIR, topicId)
  if (!fs.existsSync(topicDir)) fs.mkdirSync(topicDir)

  for (const [, filename] of imageRefs) {
    const src = path.join(CARDS_DIR, filename)
    const dest = path.join(topicDir, filename)

    if (!fs.existsSync(src)) {
      console.warn(`  MISSING: ${filename} (referenced in ${file})`)
      continue
    }

    fs.renameSync(src, dest)
    content = content.replaceAll(
      `/images/cards/${filename}`,
      `/images/cards/${topicId}/${filename}`
    )
    console.log(`  ${topicId}/${filename}`)
  }

  fs.writeFileSync(mdPath, content, 'utf8')
}

console.log('\nDone.')
