import React, { useEffect } from 'react'
import { graphql, withPrefix, Link } from 'gatsby'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'
import Layout from '../components/Layout'
import TopicCard from '../components/TopicCard'
import { trackTopicOpen } from '../utils/tracking'

const card = {
  background: '#fff',
  borderRadius: 16,
  boxShadow: '0 2px 12px rgba(0,0,0,0.07)',
  padding: '24px 28px',
  marginBottom: 16,
}

const TopicTemplate = ({ data }) => {
  const topic = data.topic

  useEffect(() => {
    trackTopicOpen(topic.slug, topic.title, topic.slug)
  }, [topic.slug])
  const cards = JSON.parse(topic.cards || '[]')
  const links = JSON.parse(topic.links || '[]')
  const image = getImage(topic.localImage)
  const related = data.related?.nodes || []

  return (
    <Layout>
      <div style={{ background: '#f4f5f7', minHeight: 'calc(100vh - var(--nav-height))', padding: '32px 0 80px' }}>
        <div className="container" style={{ maxWidth: 720 }}>

          {/* Header card */}
          <div style={{ ...card, padding: '28px 32px', marginBottom: 16 }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: 24 }}>
              {image && (
                <div style={{ flexShrink: 0 }}>
                  <GatsbyImage image={image} alt={topic.title} style={{ width: 90, height: 90, display: 'block' }} />
                </div>
              )}
              <div style={{ flex: 1 }}>
                <h1 style={{ fontSize: 'clamp(22px, 3.5vw, 32px)', fontWeight: 800, marginBottom: 12, lineHeight: 1.2 }}>
                  {topic.title}
                </h1>
                {topic.tagTitles?.length > 0 && (
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: topic.description ? 16 : 0 }}>
                    {topic.tagTitles.map((tag, i) => (
                      <Link key={tag} to={`/?tag=${topic.tagIds[i]}`} style={{
                        fontSize: 14,
                        fontWeight: 500,
                        color: '#374151',
                        border: '1.5px solid #d1d5db',
                        borderRadius: 99,
                        padding: '5px 16px',
                        background: '#fff',
                        textDecoration: 'none',
                      }}>{tag}</Link>
                    ))}
                  </div>
                )}
                {topic.description && (
                  <p style={{ fontSize: 15, color: 'var(--color-text-muted)', lineHeight: 1.7, margin: 0 }}>
                    {topic.description}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Content cards */}
          {cards.map((c, i) => (
            <div key={c.id || i} style={card}>
              {c.title && (
                <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 14, lineHeight: 1.4 }}>
                  {c.title}
                </h2>
              )}
              {(c.image?.localUrl || c.image?.url) && (
                <img
                  src={c.image.localUrl ? withPrefix(c.image.localUrl) : c.image.url}
                  alt={c.title || ''}
                  style={{
                    display: 'block',
                    width: '100%',
                    objectFit: 'contain',
                    marginBottom: 16,
                  }}
                />
              )}
              {c.text && (
                <div
                  className="card-text"
                  dangerouslySetInnerHTML={{ __html: c.text }}
                  style={{ fontSize: 15, lineHeight: 1.75, color: 'var(--color-text)' }}
                />
              )}
            </div>
          ))}

          {/* Further reading */}
          {links.length > 0 && (
            <div style={card}>
              <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 14, lineHeight: 1.4 }}>
                🔗 Additional links
              </h2>
              <ul style={{ margin: 0, paddingLeft: 20, display: 'flex', flexDirection: 'column', gap: 6, listStyleType: 'disc' }}>
                {links.map((link, i) => (
                  <li key={link.id || i}>
                  <a
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ fontSize: 15, color: '#2563eb', textDecoration: 'underline' }}
                  >
                    {link.title}
                  </a>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Related topics */}
          {related.length > 0 && (
            <div style={{ marginTop: 40 }}>
              <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 16, color: 'var(--color-text)' }}>
                Related topics
              </h2>
              <div style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: 16,
              }}>
                {related.map(t => (
                  <TopicCard
                    key={t.slug}
                    slug={t.slug}
                    title={t.title}
                    description={t.description}
                    image={getImage(t.localImage)}
                    topicType={t.topicType}
                    tagTitles={t.tagTitles || []}
                  />
                ))}
              </div>
            </div>
          )}

        </div>
      </div>
    </Layout>
  )
}

export const query = graphql`
  query TopicQuery($slug: String!, $relatedSlugs: [String!]) {
    site {
      siteMetadata {
        siteUrl
      }
    }
    topic: topic(slug: { eq: $slug }) {
      title
      description
      metaDescription
      slug
      topicType
      tagTitles
      tagIds
      links
      cards
      localImage {
        childImageSharp {
          gatsbyImageData(width: 90, height: 90, layout: FIXED, placeholder: NONE)
        }
      }
    }
    related: allTopic(filter: { slug: { in: $relatedSlugs } }) {
      nodes {
        slug
        title
        description
        topicType
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

export default TopicTemplate

export const Head = ({ data }) => {
  const { title, description, metaDescription, slug } = data.topic
  const siteUrl = data.site.siteMetadata.siteUrl
  const pageUrl = `${siteUrl}/topics/${slug}/`
  const imageUrl = `${siteUrl}/images/topics/${slug}.png`
  const seoDescription = metaDescription || description
  return (
    <>
      <title>{title} | Leadcase</title>
      <link rel="canonical" href={pageUrl} />
      <meta name="description" content={seoDescription} />
      <meta property="og:type" content="article" />
      <meta property="og:url" content={pageUrl} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={seoDescription} />
      <meta property="og:image" content={imageUrl} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={imageUrl} />
      <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;500;600;700&display=swap" />
    </>
  )
}
