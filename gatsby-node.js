const path = require(`path`)
const { createFilePath } = require(`gatsby-source-filesystem`)

exports.createPages = async ({ graphql, actions, reporter }) => {
  const { createPage } = actions

  // Define a template for blog post
  const clinicalAreaT = path.resolve(`./src/templates/clinical-area.js`)

  // Get all the content from Clinical Areas endpoint
  const result = await graphql(
    `
      {
        allRestApiApiClinicalAreas {
          edges {
            node {
              id
              endpointId
              name
              parent_Id
              inactive
              clinical_Area_Ref
            }
          }
        }
      }
    `
  )

  if (result.errors) {
    reporter.panicOnBuild(
      `There was an error loading your clinical areas`,
      result.errors
    )
    return
  }
  const clinicalAreas = result.data.allRestApiApiClinicalAreas.edges

  // Create blog posts pages
  // But only if there's at least one markdown file found at "content/blog" (defined in gatsby-config.js)
  // `context` is available in the template as a prop and as a variable in GraphQL
  if (clinicalAreas.length > 0) {
    clinicalAreas.forEach(async (clinicalArea, index) => {
      let str = clinicalArea.node.name.replace(/\s/g, "-")
      str = str.replace(/[{()}]/g, "")

      // if (clinicalArea.node.parent_Id != null && str) {
        
        createPage({
          endpointId: clinicalArea.node.endpointId,
          path: `/clinical-area/${str}/`,
          component: clinicalAreaT,
          context: {
            id: clinicalArea.node.id,
            endpointId: clinicalArea.node.endpointId,
            name: clinicalArea.node.name,
            parent_Id: clinicalArea.node.parent_Id,
            inactive: clinicalArea.node.inactive,
            clinical_Area_Ref: clinicalArea.node.clinical_Area_Ref,
          },
        })
      // } else if (str){
      //   const reviewResult = await graphql(
      //     `
      //   {
      //     allRestApiApiReviews(filter: {clinical_Area_Id: {eq: "${clinicalArea.node.endpointId}"}}) {
      //       nodes {
      //         endpointId
      //         name
      //         clinical_Area_Id
      //         modified_Time
      //       }
      //     }
      //   }
      //   `
      //   )

      //   if (reviewResult.errors) {
      //     reporter.panicOnBuild(
      //       `There was an error loading your reviews`,
      //       reviewResult.errors
      //     )
      //     return
      //   }
      //   const reviewData = reviewResult.data.allRestApiApiReviews.nodes

      //   createPage({
      //     endpointId: clinicalArea.node.endpointId,
      //     path: `/clinical-area/${str}/`,
      //     component: clinicalArea,
      //     context: {
      //       id: clinicalArea.node.id,
      //       endpointId: clinicalArea.node.endpointId,
      //       name: clinicalArea.node.name,
      //       parent_Id: clinicalArea.node.parent_Id,
      //       inactive: clinicalArea.node.inactive,
      //       clinical_Area_Ref: clinicalArea.node.clinical_Area_Ref,
      //       reviewData: reviewData,
      //     },
      //   })
      // }
    })
  }
}

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions

  if (node.internal.type === `MarkdownRemark`) {
    const value = createFilePath({ node, getNode })

    createNodeField({
      name: `slug`,
      node,
      value,
    })
  }
}

exports.createSchemaCustomization = ({ actions }) => {
  const { createTypes } = actions

  // Explicitly define the siteMetadata {} object
  // This way those will always be defined even if removed from gatsby-config.js

  // Also explicitly define the Markdown frontmatter
  // This way the "MarkdownRemark" queries will return `null` even when no
  // blog posts are stored inside "content/blog" instead of returning an error
  createTypes(`
    type SiteSiteMetadata {
      author: Author
      siteUrl: String
      social: Social
    }

    type Author {
      name: String
      summary: String
    }

    type Social {
      twitter: String
    }

    type MarkdownRemark implements Node {
      frontmatter: Frontmatter
      fields: Fields
    }

    type Frontmatter {
      title: String
      description: String
      date: Date @dateformat
    }

    type Fields {
      slug: String
    }
  `)
}
