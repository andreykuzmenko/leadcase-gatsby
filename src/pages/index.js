import React, { useState, useMemo, useEffect } from 'react'
import { graphql, navigate } from 'gatsby'
import { getImage } from 'gatsby-plugin-image'
import Layout from '../components/Layout'
import TopicCard from '../components/TopicCard'

const IndexPage = ({ data, location }) => {
  const tags = data.allTag.nodes
  const topics = data.allTopic.nodes

  const [activeTag, setActiveTag] = useState(() => {
    if (typeof window === 'undefined') return null
    return new URLSearchParams(location.search).get('tag') || null
  })

  useEffect(() => {
    const tag = new URLSearchParams(location.search).get('tag') || null
    setActiveTag(tag)
  }, [location.search])

  const selectTag = (tagId) => {
    setActiveTag(tagId)
    if (tagId) {
      navigate(`/?tag=${tagId}`, { replace: true })
    } else {
      navigate('/', { replace: true })
    }
  }

  const filtered = useMemo(() => {
    if (!activeTag) return topics
    return topics.filter(topic => topic.tagIds?.includes(activeTag))
  }, [topics, activeTag])

  return (
    <Layout>
      <div style={{ background: '#f4f5f7', minHeight: 'calc(100vh - var(--nav-height))' }}>
        <div className="container" style={{ paddingTop: 48, paddingBottom: 64 }}>

          {/* Heading */}
          <div style={{ textAlign: 'center', marginBottom: 40 }}>
            <h1 style={{
              fontSize: 'clamp(28px, 5vw, 48px)',
              fontWeight: 700,
              letterSpacing: '-0.02em',
              marginBottom: 12,
              color: 'var(--color-text)',
            }}>
              Leader&rsquo;s toolbox
            </h1>
            <p style={{
              fontSize: 'clamp(14px, 2vw, 17px)',
              color: 'var(--color-text-muted)',
              maxWidth: 560,
              margin: '0 auto',
            }}>
              Collection of tools, frameworks, models, and ideas to grow people and improve teamwork
            </p>
          </div>

          {/* Filter pills */}
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: 8,
            justifyContent: 'center',
            marginBottom: 32,
          }}>
            <button
              onClick={() => selectTag(null)}
              style={{
                padding: '8px 20px',
                borderRadius: 99,
                fontSize: 14,
                fontWeight: 500,
                border: '1.5px solid',
                borderColor: activeTag === null ? '#10b981' : 'var(--color-border)',
                background: activeTag === null ? '#10b981' : '#fff',
                color: activeTag === null ? '#fff' : 'var(--color-text)',
                transition: 'all 0.15s',
                cursor: 'pointer',
              }}
            >
              All
            </button>
            {tags.map(tag => (
              <button
                key={tag.key}
                onClick={() => selectTag(activeTag === tag.key ? null : tag.key)}
                style={{
                  padding: '8px 20px',
                  borderRadius: 99,
                  fontSize: 14,
                  fontWeight: 500,
                  border: '1.5px solid',
                  borderColor: activeTag === tag.key ? '#10b981' : 'var(--color-border)',
                  background: activeTag === tag.key ? '#10b981' : '#fff',
                  color: activeTag === tag.key ? '#fff' : 'var(--color-text)',
                  transition: 'all 0.15s',
                  cursor: 'pointer',
                }}
              >
                {tag.title}
              </button>
            ))}
          </div>

          {/* Topic grid */}
          <div id="library" style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
            gap: 16,
          }}>
            {filtered.map(topic => (
              <TopicCard
                key={topic.slug}
                slug={topic.slug}
                title={topic.title}
                description={topic.description}
                image={getImage(topic.localImage)}
                topicType={topic.topicType}
                tagTitles={topic.tagTitles || []}
              />
            ))}
          </div>
        </div>
      </div>
    </Layout>
  )
}

export const query = graphql`
  query HomeQuery {
    allTag(sort: { orderRank: ASC }) {
      nodes {
        title
        key
        orderRank
      }
    }
    allTopic(sort: { orderRank: ASC }) {
      nodes {
        slug
        title
        description
        topicType
        tagIds
        tagTitles
        localImage {
          childImageSharp {
            gatsbyImageData(width: 90, height: 90, layout: FIXED, placeholder: NONE)
          }
        }
      }
    }
  }
`

export default IndexPage

export const Head = () => (
  <>
    <title>Leader's toolbox | Leadcase</title>
    <meta name="description" content="Collection of tools, frameworks, models, and ideas to grow people and improve teamwork." />
    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;500;600;700&display=swap" />
  </>
)
