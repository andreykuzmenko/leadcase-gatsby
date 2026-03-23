/** @type {import('gatsby').GatsbyConfig} */
module.exports = {
  siteMetadata: {
    title: `Leadcase`,
    description: `Collection of tools, frameworks, models, and ideas to grow people and improve teamwork`,
    siteUrl: `https://leadcase.net`,
    twitterHandle: `@andreyzt`,
  },
  plugins: [
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'topic-images',
        path: `${__dirname}/static/images/topics`,
      },
    },
    'gatsby-plugin-sharp',
    'gatsby-transformer-sharp',
    'gatsby-plugin-image',
    {
      resolve: 'gatsby-plugin-google-gtag',
      options: {
        trackingIds: ['G-8S2KLP9294'],
        pluginConfig: {
          head: true,
        },
      },
    },
  ],
}
