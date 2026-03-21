const React = require('react')

exports.onRenderBody = ({ setHeadComponents }) => {
  setHeadComponents([
    React.createElement('link', {
      key: 'favicon',
      rel: 'icon',
      href: '/favicon.ico',
    }),
  ])
}
