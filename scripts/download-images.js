/**
 * Download all topic + card images locally and update JSON files to use local paths.
 * Run with: node scripts/download-images.js
 *
 * Output:
 *   data/images/{slug}.png          — topic header images
 *   data/images/cards/{id}.{ext}    — card content images
 */

const fetch = require('node-fetch')
const fs = require('fs')
const path = require('path')

const TOPICS_DIR = path.join(__dirname, '../data/topics')
const IMAGES_DIR = path.join(__dirname, '../data/images')
const CARDS_DIR = path.join(IMAGES_DIR, 'cards')
const STATIC_CARDS_DIR = path.join(__dirname, '../static/images/cards')

async function downloadFile(url, destPath) {
  const res = await fetch(url)
  if (!res.ok) throw new Error(`HTTP ${res.status}`)
  const buffer = await res.buffer()
  fs.writeFileSync(destPath, buffer)
}

async function main() {
  fs.mkdirSync(IMAGES_DIR, { recursive: true })
  fs.mkdirSync(CARDS_DIR, { recursive: true })
  fs.mkdirSync(STATIC_CARDS_DIR, { recursive: true })

  const files = fs.readdirSync(TOPICS_DIR).filter(f => f.endsWith('.json'))
  let topicSuccess = 0, topicSkipped = 0
  let cardSuccess = 0, cardSkipped = 0, cardFailed = 0

  await Promise.all(
    files.map(async file => {
      const filePath = path.join(TOPICS_DIR, file)
      const topic = JSON.parse(fs.readFileSync(filePath, 'utf8'))
      let changed = false

      // --- Topic header image ---
      if (topic.image?.url) {
        const ext = topic.image.name?.split('.').pop() || 'png'
        const localName = `${topic.slug}.${ext}`
        const localPath = path.join(IMAGES_DIR, localName)
        const localRef = `/images/${localName}`

        if (!fs.existsSync(localPath)) {
          try {
            await downloadFile(topic.image.url, localPath)
            topicSuccess++
          } catch (err) {
            console.error(`\n✗ Topic image failed: ${topic.slug} — ${err.message}`)
          }
        } else {
          topicSkipped++
        }

        if (topic.imageUrl !== localRef) {
          topic.imageUrl = localRef
          changed = true
        }
      }

      // --- Card images ---
      const cards = topic.cards || []
      for (const card of cards) {
        if (!card.image?.url) continue

        const ext = card.image.name?.split('.').pop() || 'png'
        const localName = `${card.image.id}.${ext}`
        const localPath = path.join(CARDS_DIR, localName)
        const localRef = `/images/cards/${localName}`

        if (!fs.existsSync(localPath)) {
          try {
            await downloadFile(card.image.url, localPath)
            fs.copyFileSync(localPath, path.join(STATIC_CARDS_DIR, localName))
            card.image.localUrl = localRef
            cardSuccess++
            process.stdout.write(`\r  Card images: ${cardSuccess} downloaded...`)
          } catch (err) {
            console.error(`\n✗ Card image failed: ${card.image.id} — ${err.message}`)
            cardFailed++
          }
        } else {
          if (!card.image.localUrl) card.image.localUrl = localRef
          cardSkipped++
        }
        changed = true
      }

      if (changed) {
        topic.cards = cards
        fs.writeFileSync(filePath, JSON.stringify(topic, null, 2))
      }
    })
  )

  console.log(`\n✓ Topic images: ${topicSuccess} downloaded, ${topicSkipped} skipped`)
  console.log(`✓ Card images:  ${cardSuccess} downloaded, ${cardSkipped} skipped, ${cardFailed} failed`)
}

main().catch(err => {
  console.error('Error:', err)
  process.exit(1)
})
