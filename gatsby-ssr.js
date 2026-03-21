const React = require('react')
const { withPrefix } = require('gatsby')

exports.onRenderBody = ({ setHeadComponents }) => {
  setHeadComponents([
    React.createElement('link', {
      key: 'favicon',
      rel: 'icon',
      href: withPrefix('/favicon.ico'),
    }),
  ])
}
