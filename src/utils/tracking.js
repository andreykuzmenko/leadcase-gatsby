import mixpanel from 'mixpanel-browser'

let initialized = false

function init() {
  if (initialized || typeof window === 'undefined') return
  mixpanel.init('c5c859e4c7d06ecace23993fbc656fd2', {
    track_pageview: true,
    persistence: 'localStorage',
  })
  initialized = true
}

export function trackTopicOpen(id, title, slug) {
  init()
  mixpanel.track('Topic', { Id: id, Title: title, Slug: slug })
}

export function trackFilter(id, title) {
  init()
  mixpanel.track('Filter', { Id: id, Title: title })
}
