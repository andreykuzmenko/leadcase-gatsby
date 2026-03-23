const { execSync } = require('child_process')
const fs = require('fs')
const path = require('path')

const PUBLIC_DIR = path.join(__dirname, '../public')
const WORKTREE_DIR = path.join(__dirname, '../../leadcase-deploy')

try {
  // Add worktree for gh-pages branch
  execSync(`git worktree add "${WORKTREE_DIR}" gh-pages`, { stdio: 'inherit' })

  // Clear existing files (use node to avoid ENAMETOOLONG on Windows)
  execSync(`git rm -r . --quiet`, { cwd: WORKTREE_DIR, stdio: 'inherit' })

  // Copy public/ into the worktree
  fs.cpSync(PUBLIC_DIR, WORKTREE_DIR, { recursive: true })

  // Commit and push
  execSync('git add -A', { cwd: WORKTREE_DIR, stdio: 'inherit' })
  execSync('git commit -m "Deploy"', { cwd: WORKTREE_DIR, stdio: 'inherit' })
  execSync('git push origin gh-pages', { cwd: WORKTREE_DIR, stdio: 'inherit' })

  console.log('\nPublished.')
} finally {
  execSync(`git worktree remove "${WORKTREE_DIR}" --force`, { stdio: 'inherit' })
}
