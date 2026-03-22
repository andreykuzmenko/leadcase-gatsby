const React = require('react')
const { withPrefix } = require('gatsby')

const FONT_URL =
  'https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;500;600;700&display=swap'

exports.onRenderBody = ({ setHtmlAttributes, setHeadComponents }) => {
  setHtmlAttributes({ lang: 'en' })
  setHeadComponents([
    React.createElement('link', {
      key: 'favicon',
      rel: 'icon',
      href: withPrefix('/favicon.ico'),
    }),
    React.createElement('link', {
      key: 'preconnect-googleapis',
      rel: 'preconnect',
      href: 'https://fonts.googleapis.com',
    }),
    React.createElement('link', {
      key: 'preconnect-gstatic',
      rel: 'preconnect',
      href: 'https://fonts.gstatic.com',
      crossOrigin: 'anonymous',
    }),
    React.createElement('link', {
      key: 'google-fonts',
      rel: 'stylesheet',
      href: FONT_URL,
    }),
  ])
}
