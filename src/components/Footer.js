import React from 'react'

const Footer = () => {
  return (
    <footer style={{
      borderTop: '1px solid var(--color-border)',
      padding: '32px 0',
      marginTop: 'auto',
      background: 'var(--color-bg-subtle)',
    }}>
      <div className="container" style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '16px',
      }}>
        <p style={{ fontSize: 14, color: 'var(--color-text-muted)' }}>
          © Leadcase 2023–{new Date().getFullYear()}. All rights reserved.
        </p>
        <div style={{ display: 'flex', gap: 24, alignItems: 'center' }}>
          <a
            href="https://twitter.com/andreyzt"
            target="_blank"
            rel="noopener noreferrer"
            style={{ fontSize: 14, color: 'var(--color-text-muted)' }}
          >
            Twitter
          </a>

        </div>
      </div>
    </footer>
  )
}

export default Footer
