/**
 * Convert HTML card content in topic .md files to Markdown.
 * Run with: node scripts/html-to-md.js
 */

const fs = require('fs')
const path = require('path')
const matter = require('gray-matter')
const TurndownService = require('turndown')

const TOPICS_DIR = path.join(__dirname, '../data/topics')

const td = new TurndownService({
  headingStyle: 'atx',
  bulletListMarker: '-',
  codeBlockStyle: 'fenced',
})

// Strip inline styles and redundant spans but keep links, bold, italic, lists
td.addRule('remove-style-spans', {
  filter: node => node.nodeName === 'SPAN' && node.getAttribute('style'),
  replacement: (content) => content,
})

// Parse cards from body (same logic as gatsby-node.js)
function parseAndReplaceSections(body) {
  const IMAGE_RE = /<!--\s*image:\s*(.+?)\s*-->/

  const sections = body.split(/^## /m).filter(s => s.trim())
  const converted = sections.map(section => {
    const newline = section.indexOf('\n')
    const title = newline === -1 ? section.trim() : section.slice(0, newline).trim()
    const rest = newline === -1 ? '' : section.slice(newline + 1)

    const imageMatch = rest.match(IMAGE_RE)
    const imageComment = imageMatch ? imageMatch[0] : null
    const text = imageMatch ? rest.replace(IMAGE_RE, '').trim() : rest.trim()

    // Convert HTML to markdown
    const md = text ? td.turndown(text).trim() : ''

    let section_out = `## ${title}\n\n`
    if (imageComment) section_out += `${imageComment}\n\n`
    if (md) section_out += md + '\n'
    return section_out
  })

  return converted.join('\n')
}

const files = fs.readdirSync(TOPICS_DIR).filter(f => f.endsWith('.md'))
let count = 0

files.forEach(file => {
  const fp = path.join(TOPICS_DIR, file)
  const raw = fs.readFileSync(fp, 'utf8')
  const { data: fm, content: body } = matter(raw)

  const newBody = parseAndReplaceSections(body)
  fs.writeFileSync(fp, matter.stringify(newBody, fm))
  count++
  process.stdout.write(`\r  Converted ${count}/${files.length}...`)
})

console.log(`\n✓ Done. ${count} files converted.`)
