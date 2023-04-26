const config = require('./config');

module.exports = {
  siteMetadata: {
    title: `Research Review`,
    author: {
      name: `System7`,
    },
  },
  flags: {
    DEV_SSR: true
  },
  plugins: [
    `gatsby-plugin-image`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    {
      resolve: "gatsby-source-apiserver",
      options: {
        // Type prefix of entities from server
        typePrefix: "zoho__",
        url: `https://researchreview.dev.s05.system7.co.nz/api/clinicalAreas`,
        method: "get",
        headers: {
          "Content-Type": "application/json",
          "Country": config.countryCode,
        },
        name: `ClinicalAreas`,
        verboseOutput: true, // For debugging purposes
        skipCreateNode: false, // skip import to graphQL, only use if localSave is all you want
      }
    },
    {
      resolve: "gatsby-source-apiserver",
      options: {
        // Type prefix of entities from server
        typePrefix: "zoho__",
        url: `https://researchreview.dev.s05.system7.co.nz/api/writers`,
        method: "get",
        headers: {
          "Content-Type": "application/json",
          "Country": config.countryCode,
        },
        name: `Writers`,
        verboseOutput: true, // For debugging purposes
        skipCreateNode: false, // skip import to graphQL, only use if localSave is all you want
      }
    },
    {
      resolve: "gatsby-source-apiserver",
      options: {
        // Type prefix of entities from server
        typePrefix: "zoho__",
        url: `https://researchreview.dev.s05.system7.co.nz/api/reviews`,
        method: "get",
        headers: {
          "Content-Type": "application/json",
          "Country": config.countryCode,
        },
        name: `Reviews`,
        verboseOutput: true, // For debugging purposes
        skipCreateNode: false, // skip import to graphQL, only use if localSave is all you want
      }
    },
    {
      resolve: "gatsby-source-apiserver",
      options: {
        // Type prefix of entities from server
        typePrefix: "zoho__",
        url: `https://researchreview.dev.s05.system7.co.nz/api/sections/featured`,
        method: "get",
        headers: {
          "Content-Type": "application/json",
          "Country": config.countryCode,
        },
        name: `FeaturedArticle`,
        verboseOutput: true, // For debugging purposes
        skipCreateNode: false, // skip import to graphQL, only use if localSave is all you want
      }
    },
    {
      resolve: "gatsby-source-apiserver",
      options: {
        // Type prefix of entities from server
        typePrefix: "zoho__",
        url: `https://researchreview.dev.s05.system7.co.nz/api/professionaldevelopment/modules`,
        method: "get",
        headers: {
          "Content-Type": "application/json",
          "Country": config.countryCode,
        },
        name: `Modules`,
        verboseOutput: true, // For debugging purposes
        skipCreateNode: false, // skip import to graphQL, only use if localSave is all you want
      }
    },
    {
      resolve: "gatsby-source-apiserver",
      options: {
        // Type prefix of entities from server
        typePrefix: "zoho__",
        url: `https://researchreview.dev.s05.system7.co.nz/api/professionaldevelopment/partners`,
        method: "get",
        headers: {
          "Content-Type": "application/json",
          "Country": config.countryCode,
        },
        name: `Partners`,
        verboseOutput: true, // For debugging purposes
        skipCreateNode: false, // skip import to graphQL, only use if localSave is all you want
      }
    },
    {
      resolve: "gatsby-source-apiserver",
      options: {
        // Type prefix of entities from server
        typePrefix: "zoho__",
        url: `https://researchreview.dev.s05.system7.co.nz/api/home`,
        method: "get",
        headers: {
          "Content-Type": "application/json",
          "Country": config.countryCode,
        },
        name: `Home`,
        verboseOutput: true, // For debugging purposes
        skipCreateNode: false, // skip import to graphQL, only use if localSave is all you want
      }
    }, 
    {
      resolve: "gatsby-source-apiserver",
      options: {
        // Type prefix of entities from server
        typePrefix: "zoho__",
        url: `https://researchreview.dev.s05.system7.co.nz/api/join`,
        method: "get",
        headers: {
          "Content-Type": "application/json",
          "Country": config.countryCode,
        },
        name: `Join`,
        verboseOutput: true, // For debugging purposes
        skipCreateNode: false, // skip import to graphQL, only use if localSave is all you want
      }
    },
    {
      resolve: "gatsby-source-apiserver",
      options: {
        // Type prefix of entities from server
        typePrefix: "zoho__",
        url: `https://researchreview.dev.s05.system7.co.nz/api/advertisements`,
        method: "get",
        headers: {
          "Content-Type": "application/json",
          "Country": config.countryCode,
        },
        name: `Advertisements`,
        verboseOutput: true, // For debugging purposes
        skipCreateNode: false, // skip import to graphQL, only use if localSave is all you want
      }
    },
    // {
    //   resolve: 'gatsby-source-rest-api',
    //   options: {
    //     endpoints: [
    //       `https://researchreview.dev.s05.system7.co.nz/api/clinicalAreas`,
    //       // `https://researchreview.dev.s05.system7.co.nz/api/writers`,
    //       // `https://researchreview.dev.s05.system7.co.nz/api/reviews`,
    //     ]
    //   },
    //   headers: {
    //     "Country": `${config.countryCode}`
    //   },
    // },
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 630,
            },
          },
          {
            resolve: `gatsby-remark-responsive-iframe`,
            options: {
              wrapperStyle: `margin-bottom: 1.0725rem`,
            },
          },
          `gatsby-remark-prismjs`,
          `gatsby-remark-copy-linked-files`,
          `gatsby-remark-smartypants`,
        ],
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-feed`,
      options: {
        query: `
          {
            site {
              siteMetadata {
                title
                description
                siteUrl
                site_url: siteUrl
              }
            }
          }
        `,
        feeds: [
          {
            serialize: ({ query: { site, allMarkdownRemark } }) => {
              return allMarkdownRemark.nodes.map(node => {
                return Object.assign({}, node.frontmatter, {
                  description: node.excerpt,
                  date: node.frontmatter.date,
                  url: site.siteMetadata.siteUrl + node.fields.slug,
                  guid: site.siteMetadata.siteUrl + node.fields.slug,
                  custom_elements: [{ "content:encoded": node.html }],
                })
              })
            },
            query: `
              {
                allMarkdownRemark(
                  sort: { order: DESC, fields: [frontmatter___date] },
                ) {
                  nodes {
                    excerpt
                    html
                    fields {
                      slug
                    }
                    frontmatter {
                      title
                      date
                    }
                  }
                }
              }
            `,
            output: "/rss.xml",
            title: "Gatsby Starter Blog RSS Feed",
          },
        ],
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Gatsby Starter Blog`,
        short_name: `GatsbyJS`,
        start_url: `/`,
        background_color: `#ffffff`,
        // This will impact how browsers show your PWA/website
        // https://css-tricks.com/meta-theme-color-and-trickery/
        // theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `src/images/gatsby-icon.png`, // This path is relative to the root of the site.
      },
    },
  ],
}

exports.shouldUpdateScroll = ({ routerProps: { location } }) => {
  // Prevent scrolling to top on page change
  if (location.action === 'PUSH') {
    return false;
  }

  // Default behavior (scroll to top)
  return false;
};