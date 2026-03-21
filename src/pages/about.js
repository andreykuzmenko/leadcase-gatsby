import React from 'react'
import { withPrefix } from 'gatsby'
import Layout from '../components/Layout'

const AboutPage = () => {
  return (
    <Layout>
      <div style={{ background: '#f4f5f7', minHeight: 'calc(100vh - var(--nav-height))', padding: '32px 0 80px' }}>
        <div className="container" style={{ maxWidth: 824 }}>

          {/* Centered intro */}
          <div style={{ textAlign: 'center', marginBottom: 20 }}>
            <h1 style={{ fontSize: 'clamp(22px, 4vw, 32px)', fontWeight: 700, marginBottom: 0 }}>
              About
            </h1>
            <p style={{ fontWeight: 500, fontSize: '1.1em', marginTop: 20, marginBottom: 0 }}>
              Leadcase is a collection of tools, frameworks, and ideas to develop leadership skills
            </p>
          </div>

          {/* Author row: image + name/experience */}
          <div style={{ display: 'flex', gap: 24, marginTop: 20, alignItems: 'flex-start', flexWrap: 'wrap' }}>
            <div style={{ width: '25%', minWidth: 140, flexShrink: 0 }}>
              <img
                src={withPrefix('/andrii-kuzmenko.jpg')}
                alt="Andrii Kuzmenko"
                style={{ width: '100%', borderRadius: 50 }}
              />
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <p style={{ fontWeight: 500, fontSize: '1.2em', marginTop: 10, marginBottom: 5, lineHeight: '28px' }}>
                Andrii Kuzmenko
              </p>
              <p style={{ lineHeight: '28px', marginBottom: 5 }}>
                My name is Andrii Kuzmenko. I'm a creator of Leadcase.
              </p>
              <p style={{ lineHeight: '28px', marginBottom: 5 }}>
                Since 2010, I have been working with people in various leadership roles. I started as a technical team leader, then became a Scrum Master, and since 2018 I have led a department with 100+ people.
              </p>
            </div>
          </div>

          {/* Content sections */}
          <div style={{ marginTop: 20 }}>
            <h2 style={{ fontSize: '1.4em', marginBottom: 10, marginTop: 20 }}>💡 Idea of Leadcase</h2>
            <p style={{ lineHeight: '28px', marginBottom: 5 }}>
              My path in leadership is constant experimentation with approaches and tools in working with people and teams. This applies to motivating people, resolving conflicts, making decisions, implementing changes, etc. Over the years, I have kept links to materials or notes with ideas. Unfortunately, the information is scattered in different places, and it takes a long time to find something quickly.
            </p>
            <p style={{ lineHeight: '28px', marginBottom: 5 }}>
              In Leadcase, I structure knowledge by categories that can be useful to other leaders and me.
            </p>

            <h2 style={{ fontSize: '1.4em', marginBottom: 10, marginTop: 20 }}>💎 How to use Leadcase?</h2>
            <p style={{ lineHeight: '28px', marginBottom: 5 }}>
              The tools collected in Leadcase can help solve various challenges a leader faces. For best results, always consider the context in which you work and adapt ideas accordingly.
            </p>

            <h2 style={{ fontSize: '1.4em', marginBottom: 10, marginTop: 20 }}>📪 Contacts</h2>
            <p style={{ lineHeight: '28px', marginBottom: 5 }}>
              I would appreciate your feedback and suggestions. I plan to add new tools and improve Leadcase regularly.
            </p>
            <p style={{ lineHeight: '28px', marginBottom: 5 }}>
              I leave my Twitter for communication -{' '}
              <a
                href="https://twitter.com/andreyzt"
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: '#2563eb', textDecoration: 'underline' }}
              >
                @andreyzt
              </a>.
            </p>
          </div>

        </div>
      </div>
    </Layout>
  )
}

export default AboutPage

export const Head = () => (
  <>
    <title>About | Leadcase</title>
    <meta name="description" content="Leadcase is a collection of tools, frameworks, and ideas to develop leadership skills, created by Andrii Kuzmenko." />
    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;500;600;700&display=swap" />
  </>
)
