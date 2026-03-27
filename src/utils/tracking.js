import mixpanel from 'mixpanel-browser'

const isLocalhost = typeof window !== 'undefined' && window.location.hostname === 'localhost'

let initialized = false

function init() {
  if (initialized || typeof window === 'undefined' || isLocalhost) return
  mixpanel.init('c5c859e4c7d06ecace23993fbc656fd2', {
    track_pageview: true,
    persistence: 'localStorage',
  })
  initialized = true
}

export function trackTopicOpen(id, title, slug) {
  if (isLocalhost) return
  init()
  mixpanel.track('Topic', { Id: id, Title: title, Slug: slug })
}

export function trackFilter(id, title) {
  if (isLocalhost) return
  init()
  mixpanel.track('Filter', { Id: id, Title: title })
}
