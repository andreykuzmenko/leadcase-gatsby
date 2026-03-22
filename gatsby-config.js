/** @type {import('gatsby').GatsbyConfig} */
module.exports = {
  siteMetadata: {
    title: `Leadcase`,
    description: `Collection of tools, frameworks, models, and ideas to grow people and improve teamwork`,
    siteUrl: `https://app.leadcase.net`,
    twitterHandle: `@andreyzt`,
  },
  plugins: [
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'topic-images',
        path: `${__dirname}/data/images`,
      },
    },
    'gatsby-plugin-sharp',
    'gatsby-transformer-sharp',
    'gatsby-plugin-image',
    {
      resolve: 'gatsby-plugin-sitemap',
      options: {
        query: `
          {
            allTopic {
              nodes {
                slug
              }
            }
          }
        `,
        resolveSiteUrl: () => 'https://app.leadcase.net',
        resolvePages: ({ allTopic: { nodes } }) =>
          nodes.map(({ slug }) => ({ path: `/topics/${slug}/` })),
        serialize: ({ path }) => ({ url: path }),
      },
    },
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
