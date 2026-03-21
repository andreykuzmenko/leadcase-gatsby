/**
 * Fetch all content from the Leadcase API and save to local JSON files.
 * Run with: node scripts/fetch-content.js
 *
 * Output:
 *   data/tags.json           — all competencies
 *   data/topics/{slug}.json  — full topic detail for each topic
 */

const fetch = require('node-fetch')
const fs = require('fs')
const path = require('path')

const API_BASE = 'https://api.leadcase.net/api'
const DATA_DIR = path.join(__dirname, '../data')
const TOPICS_DIR = path.join(DATA_DIR, 'topics')

async function main() {
  fs.mkdirSync(TOPICS_DIR, { recursive: true })

  // Fetch and save tags
  console.log('Fetching tags...')
  const tagsRes = await fetch(`${API_BASE}/tags`)
  const tags = await tagsRes.json()
  fs.writeFileSync(path.join(DATA_DIR, 'tags.json'), JSON.stringify(tags, null, 2))
  console.log(`✓ Saved ${tags.length} tags to data/tags.json`)

  // Fetch topic list
  console.log('Fetching topic list...')
  const topicsRes = await fetch(
    `${API_BASE}/topics?top=200&skip=0&tagId=&text=&showSavedOnly=false&behaviorId=`
  )
  const topics = await topicsRes.json()
  console.log(`Found ${topics.length} topics. Fetching full details...`)

  // Fetch and save each topic's full detail
  let success = 0
  let failed = 0
  await Promise.all(
    topics.map(async topic => {
      try {
        const res = await fetch(`${API_BASE}/topics/${topic.slug}`)
        const detail = await res.json()
        const filePath = path.join(TOPICS_DIR, `${topic.slug}.json`)
        fs.writeFileSync(filePath, JSON.stringify(detail, null, 2))
        success++
        process.stdout.write(`\r  Saved ${success}/${topics.length} topics...`)
      } catch (err) {
        console.error(`\n  ✗ Failed: ${topic.slug} — ${err.message}`)
        failed++
      }
    })
  )

  console.log(`\n✓ Done. ${success} topics saved, ${failed} failed.`)
  console.log(`  data/tags.json`)
  console.log(`  data/topics/ (${success} files)`)
}

main().catch(err => {
  console.error('Error:', err)
  process.exit(1)
})
