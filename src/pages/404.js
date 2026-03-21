import React from 'react'
import { Link } from 'gatsby'
import Layout from '../components/Layout'

const NotFoundPage = () => {
  return (
    <Layout>
      <div style={{
        background: '#f4f5f7',
        minHeight: 'calc(100vh - var(--nav-height))',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '80px 24px',
        textAlign: 'center',
      }}>
        <h1 style={{ fontSize: 'clamp(60px, 15vw, 120px)', fontWeight: 800, margin: 0, color: '#1e293b', lineHeight: 1 }}>
          404
        </h1>
        <h2 style={{ fontSize: 'clamp(20px, 4vw, 28px)', fontWeight: 700, marginTop: 16, marginBottom: 12 }}>
          Page not found
        </h2>
        <p style={{ fontSize: 16, color: 'var(--color-text-muted)', marginBottom: 32, maxWidth: 400 }}>
          The page you're looking for doesn't exist or has been moved.
        </p>
        <Link
          to="/"
          style={{
            display: 'inline-block',
            background: '#10b981',
            color: '#fff',
            padding: '12px 28px',
            borderRadius: 99,
            fontWeight: 600,
            fontSize: 15,
            textDecoration: 'none',
          }}
        >
          Go to Home page
        </Link>
      </div>
    </Layout>
  )
}

export default NotFoundPage

export const Head = () => (
  <>
    <title>404 - Page not found | Leadcase</title>
    <meta name="description" content="Page not found" />
  </>
)
