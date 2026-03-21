import React from 'react'
import { Link } from 'gatsby'
import { GatsbyImage } from 'gatsby-plugin-image'
import * as styles from './TopicCard.module.css'

const TopicCard = ({ slug, title, description, image, topicType, tagTitles = [] }) => {
  return (
    <Link to={`/topics/${slug}`} className={styles.card}>
      <div className={styles.imageWrap}>
        {image ? (
          <GatsbyImage image={image} alt={title} className={styles.image} />
        ) : (
          <div className={styles.imagePlaceholder}>
            {title.charAt(0)}
          </div>
        )}
      </div>
      <div className={styles.body}>
        {(tagTitles.length > 0 || topicType) && (
          <div className={styles.tags}>
            {tagTitles.map(tag => (
              <span key={tag} className={styles.tag}>{tag}</span>
            ))}
            {topicType && (
              <span className={styles.typeTag}>{topicType}</span>
            )}
          </div>
        )}
        <h3 className={styles.title}>{title}</h3>
        {description && (
          <p className={styles.description}>{description}</p>
        )}
      </div>
    </Link>
  )
}

export default TopicCard
