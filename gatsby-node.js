const path = require(`path`)
const { createFilePath } = require(`gatsby-source-filesystem`)
const { filter } = require('lodash');
const axios = require('axios');

exports.createPages = async ({ graphql, actions, reporter }) => {
  const { createPage } = actions

  // Define a template for each page using content from Gatsby
  const indexTemp = path.resolve(`./src/templates/index.js`)
  const reviewTemp = path.resolve(`./src/templates/review.js`)
  const writerListTemp = path.resolve(`./src/templates/writer-list.js`)
  const clinicalAreasTemp = path.resolve(`./src/templates/clinical-areas.js`)
  const writerTemp = path.resolve(`./src/templates/writer.js`)
  const articleTemp = path.resolve(`./src/templates/article.js`)
  const modulesTemp = path.resolve(`./src/templates/modules.js`)
  const partnersTemp = path.resolve(`./src/templates/partners.js`)
  const subscriptionsTemp = path.resolve(`./src/templates/subscriptions.js`)
  //TODO - Set up podcast page
  const podcastTemp = path.resolve(`./src/templates/review.js`)

  async function getIssues(reviewId) {
    let responseData = await axios.get(`https://researchreview.dev.s05.system7.co.nz/api/reviews/${reviewId}/issues`).then(
      (response) => {
        return response.data;
      })
    return responseData;
  }

  async function getArticles(issueId) {
    let responseData = await axios.get(`https://researchreview.dev.s05.system7.co.nz/api/issues/${issueId}/sections`).then(
      (response) => {
        return response.data;
      })
    return responseData;
  }

  async function getPodcasts(reviewId) {
    let responseData = await axios.get(`https://researchreview.dev.s05.system7.co.nz/api/reviews/${reviewId}/podcasts`).then(
      (response) => {
        return response.data;
      })
    return responseData;
  }

  async function getWritersByReview(reviewId) {
    let responseData = await axios.get(`https://researchreview.dev.s05.system7.co.nz/api/reviews/${reviewId}/writers`).then(
      (response) => {
        return response.data;
      })
    return responseData;
  }

  // Get all the content from Clinical Areas endpoint
  const clinicalAreasResult = await graphql(
    `
      {
        allZohoClinicalAreas {
          nodes {
            id
            alternative_id
            name
            parent_Id
            inactive
            clinical_Area_Ref
          }      
        }
      }
    `
  )

  const writerResult = await graphql(
    `
      {
        allZohoWriters {
          nodes {
            id
            alternative_id
            name
            first_Name
            last_Name
            bio
            email
            image
            initials
          }      
        }
      }
    `
  )

  const featuredArticleResult = await graphql(
    `
      {
        allZohoFeaturedArticle {
          nodes {
            id
            alternative_id
            title
            subtitle
            text
            section_Id
            image
          }      
        }
      }
    `
  )

  const partnersResult = await graphql(
    `
      {
        allZohoPartners {
          nodes {
            id
            alternative_id
            name
            partnerName
            partnerText
            image
            link
          }      
        }
      }
    `
  )

  const modulesResult = await graphql(
    `
      {
        allZohoModules {
          nodes {
            id
            alternative_id
            name
            title
            introText
            link
          }      
        }
      }
    `
  )

  const homeResult = await graphql(
    `
      {
        allZohoHome {
          nodes {
            id
            clinicalAreas {
              alternative_id
              created_Time
              modified_Time
              inactive
              name
              clinical_Area_Ref
              country
            }
            latestPodcasts {
              created_Time
              review_Id
              alternative_id
              modified_Time
              introText
              title
              link
            }
          }      
        }
      }
    `
  )

  const joinResult = await graphql(
    `
      {
        allZohoJoin {
          nodes {
            id
            alternative_id
            created_Time
            modified_Time
            name
            podcastsText
            speakerEventsText
            productReviewsText
            reasonsToJoinImage
            reasonsToJoinTitle
            reasonsToJoinSubTitle
            reasonsToJoinText
            country
            podcastsTitle
            speakerEventsTitle
            productReviewsTitle
          }
        }
      }
    `
  )

  const advertisementsResult = await graphql(
    `
      {
        allZohoAdvertisements {
          nodes {
            id
            alternative_id
            created_Time
            modified_Time
            name
            advertisementName
            image
            link
            country
            advertisementType
          }
        }
      }
    `
  )

  if (clinicalAreasResult.errors) {
    reporter.panicOnBuild(
      `There was an error loading your clinical areas`,
      clinicalAreasResult.errors
    )
    return
  }
  if (writerResult.errors) {
    reporter.panicOnBuild(
      `There was an error loading your writers`,
      writerResult.errors
    )
    return
  }
  if (featuredArticleResult.errors) {
    reporter.panicOnBuild(
      `There was an error loading your featured articles`,
      featuredArticleResult.errors
    )
    return
  }
  if (partnersResult.errors) {
    reporter.panicOnBuild(
      `There was an error loading your partners`,
      partnersResult.errors
    )
    return
  }
  if (modulesResult.errors) {
    reporter.panicOnBuild(
      `There was an error loading your modules`,
      modulesResult.errors
    )
    return
  }
  if (homeResult.errors) {
    reporter.panicOnBuild(
      `There was an error loading your modules`,
      homeResult.errors
    )
    return
  }
  if (joinResult.errors) {
    reporter.panicOnBuild(
      `There was an error loading your modules`,
      joinResult.errors
    )
    return
  }
  if (advertisementsResult.errors) {
    reporter.panicOnBuild(
      `There was an error loading your modules`,
      advertisementsResult.errors
    )
    return
  }



  const clinicalAreas = clinicalAreasResult.data.allZohoClinicalAreas.nodes
  const writers = writerResult.data.allZohoWriters.nodes
  const featuredArticle = featuredArticleResult.data.allZohoFeaturedArticle.nodes
  const partners = partnersResult.data.allZohoPartners.nodes
  const modules = modulesResult.data.allZohoModules.nodes
  const homeContent = homeResult.data.allZohoHome.nodes
  const joinContent = joinResult.data.allZohoJoin.nodes
  const advertisementsContent = advertisementsResult.data.allZohoAdvertisements.nodes
  // Create clinical area pages

  async function getSubClinicalAreas(clinicalAreas, alternative_id, url) {
    // function code
    const clinicalAreasTemp = clinicalAreas.filter(clinicalArea => { return clinicalArea.parent_Id == alternative_id });

    if (clinicalAreasTemp.length > 0) {
      await Promise.all(clinicalAreasTemp.map(async (clinicalArea) => {
        // clinicalAreasTemp.forEach(async (clinicalArea) => {
        clinicalArea.name = clinicalArea.name.split(" (")[0];
        let urlTemp = clinicalArea.name.toLowerCase();
        urlTemp = urlTemp.split(' ').join('-');
        urlTemp = url + "/" + urlTemp;

        const children = await getSubClinicalAreas(clinicalAreas, clinicalArea.alternative_id, urlTemp);

        if (children) {
          clinicalArea['children'] = children;
        } else {
          const reviewResult = await graphql(
            `
              {
                allZohoReviews(filter: {clinical_Area_Id: {eq: "${clinicalArea.alternative_id}"}}) {
                  nodes {
                    alternative_id
                    name
                    clinical_Area_Id
                    modified_Time
                  }
                }
              }
            `
          )
          if (reviewResult.errors) {
            reporter.panicOnBuild(
              `There was an error loading your clinical areas`,
              reviewResult.errors
            )
            return
          }
          if (reviewResult.data.allZohoReviews.nodes) {
            let reviews = [...reviewResult.data.allZohoReviews.nodes];

            await Promise.all(reviews.map(async (review) => {
              // reviews.forEach(async (review) => {
              // Create URL
              review.name = review.name.split(" (")[0];
              let reviewUrlTemp = review.name.toLowerCase();
              reviewUrlTemp = reviewUrlTemp.split(' ').join('-');
              reviewUrlTemp = urlTemp + "/" + reviewUrlTemp;

              let issues = [];
              issues = await getIssues(review.alternative_id);

              let podcasts = [];
              podcasts = await getPodcasts(review.alternative_id);

              let writersByReview = [];
              writersByReview = await getWritersByReview(review.alternative_id);

              createPage({
                path: `/clinical-areas/${reviewUrlTemp}/`,
                component: reviewTemp,
                context: {
                  review: review,
                  issues: issues,
                  podcasts: podcasts,
                  writersByReview: writersByReview,
                  advertisements: advertisementsContent,
                },
              })

              await Promise.all(podcasts.map(async (podcast) => {
                // podcasts.forEach(async (podcast) => {

                let podcastUrlTemp = podcast.title.toLowerCase();
                podcastUrlTemp = podcastUrlTemp.split(' ').join('-');

                createPage({
                  path: `/podcasts/${reviewUrlTemp}/${podcastUrlTemp}/`,
                  component: podcastTemp,
                  context: {
                    podcast: podcast,
                    review: review,
                    advertisements: advertisementsContent,
                  },
                })
              }))

              if (issues.length > 0) {
                await Promise.all(issues.map(async (issue) => {
                  // issues.forEach(async (issue) => {
                  let articles = [];
                  articles = await getArticles(issue.id);

                  // createPage({
                  //   path: `/clinical-areas/${reviewUrlTemp}/${issue.name}/`,
                  //   component: issueTemp,
                  //   context: {
                  //     issue: issue,
                  //     articles: articles,
                  //   },
                  // })
                  if (articles.length > 0) {
                    await Promise.all(articles.map((article) => {
                      // articles.forEach((article) => {
                      createPage({
                        path: `/clinical-areas/${reviewUrlTemp}/${issue.name}/${article.name}`,
                        component: articleTemp,
                        context: {
                          article: article,
                          otherArticles: articles,
                          writersByReview: writersByReview,
                          advertisements: advertisementsContent,
                          tempUrlPath: `/clinical-areas/${reviewUrlTemp}/${issue.name}/`
                        },
                      })
                    }))
                  }
                }))
              }

              createPage({
                path: `/expert-writers/${reviewUrlTemp}/`,
                component: writerListTemp,
                context: {
                  review: review,
                  writers: writers,
                  url: `/expert-writers/${reviewUrlTemp}/`,
                  advertisements: advertisementsContent,
                },
              })
              const topTwoWriters = writers.slice(0, 2);


              await Promise.all(topTwoWriters.map((writer) => {
                // topTwoWriters.forEach((writer) => {
                let writerUrlTemp = writer.name.toLowerCase();
                writerUrlTemp = writerUrlTemp.split(' ').join('-');
                createPage({
                  path: `/expert-writers/${reviewUrlTemp}/${writerUrlTemp}`,
                  component: writerTemp,
                  context: {
                    writer: writer,
                    advertisements: advertisementsContent,
                  },
                })
              }));

            review['url'] = reviewUrlTemp;
          }))
      clinicalArea['children'] = reviews;
    }
  }

}))
//Return updated clinical areas
//Have add reviews under children nodes
return clinicalAreas;
    }
    else {
  return;
}
    // function code
  }

if (clinicalAreas.length > 0) {



  let clinicalAreaTree = filter(clinicalAreas, { parent_Id: null, inactive: false }, []);
  await Promise.all(clinicalAreaTree.map(async (clinicalArea) => {
    // clinicalAreaTree.forEach((clinicalArea) => {
    if (clinicalArea.name) {
      clinicalArea.name = clinicalArea.name.split(" (")[0];
      let url = clinicalArea.name.toLowerCase();
      url = url.split(' ').join('-');
      // console.log("before getSubClinicalAreas", clinicalArea.name);
      const children = await getSubClinicalAreas(clinicalAreas, clinicalArea.alternative_id, url);
      clinicalArea['children'] = children;
    }
  }))

  // phil hack
  //let clinicalAreaTree = filter(clinicalAreas, { parent_Id: null, inactive: false }, []);    
  //console.log(clinicalAreaTree);
  clinicalAreas.forEach((clinicalArea) => {

    // if (clinicalArea.name) {
    //   clinicalArea.name = clinicalArea.name.split(" (")[0];
    //   // console.log("before getSubClinicalAreas", clinicalArea.name);
    const clinicalAreasTemp = filter(clinicalAreas, { parent_Id: clinicalArea.alternative_id }, []);
    clinicalArea['children'] = clinicalAreasTemp;
  })

  let clinicalAreaTreePhil = filter(clinicalAreas, { parent_Id: null, inactive: false }, []);
  // 


  createPage({
    path: `/clinical-areas/`,
    component: clinicalAreasTemp,
    context: {
      clinicalAreas: clinicalAreaTree,
      advertisements: advertisementsContent,
    },
  })

  createPage({
    path: `/expert-writers/`,
    component: clinicalAreasTemp,
    context: {
      clinicalAreas: clinicalAreaTree,
      advertisements: advertisementsContent,
    },
  })

  createPage({
    path: `/subscriptions/`,
    component: subscriptionsTemp,
    context: {
      clinicalAreas: clinicalAreaTree,
      advertisements: advertisementsContent,
    },
  })

  createPage({
    path: `/`,
    component: indexTemp,
    context: {
      featuredArticle: featuredArticle,
      homeContent: homeContent,
      advertisements: advertisementsContent,
    },
  })

  createPage({
    path: `/partners`,
    component: partnersTemp,
    context: {
      partners: partners,
      advertisements: advertisementsContent,
    },
  })

  createPage({
    path: `/modules`,
    component: modulesTemp,
    context: {
      modules: modules,
      advertisements: advertisementsContent,
    },
  })


  // clinicalAreas.forEach(async (clinicalArea, index) => {
  //   let str = clinicalArea.name;


  //   if (clinicalArea.parent_Id != null && str) {

  //     createPage({
  //       alternative_id: clinicalArea.alternative_id,
  //       path: `/clinical-areas/${str}/`,
  //       component: reviewTemp,
  //       context: {
  //         id: clinicalArea.id,
  //         alternative_id: clinicalArea.alternative_id,
  //         name: clinicalArea.name,
  //         parent_Id: clinicalArea.parent_Id,
  //         inactive: clinicalArea.inactive,
  //         clinical_Area_Ref: clinicalArea.clinical_Area_Ref,
  //       },
  //     })
  //   } else if (str){
  //     const reviewResult = await graphql(
  //       `
  //         {
  //           allZohoReviews(filter: {clinical_Area_Id: {eq: "${clinicalArea.alternative_id}"}}) {
  //             nodes {
  //               alternative_id
  //               name
  //               clinical_Area_Id
  //               modified_Time
  //             }
  //           }
  //         }
  //       `
  //     )

  //     if (reviewResult.errors) {
  //       reporter.panicOnBuild(
  //         `There was an error loading your reviews`,
  //         reviewResult.errors
  //       )
  //       return
  //     }
  //     const reviewData = reviewResult.data.allZohoReviews.nodes
  //     console.log(reviewData)
  //     // if(!clinicalArea.inactive){

  //     //   createPage({
  //     //     alternative_id: clinicalArea.alternative_id,
  //     //     path: `/clinical-areas/${str}/`,
  //     //     component: clinicalAreaTemp,
  //     //     context: {
  //     //       id: clinicalArea.id,
  //     //       alternative_id: clinicalArea.alternative_id,
  //     //       name: clinicalArea.name,
  //     //       parent_Id: clinicalArea.parent_Id,
  //     //       inactive: clinicalArea.inactive,
  //     //       clinical_Area_Ref: clinicalArea.clinical_Area_Ref,
  //     //       reviewData: reviewData,
  //     //     },
  //     //   })
  //     // }
  //   }

  //   // Create Writers List
  //   // clinicalArea
  // })

  // const writerListTemp = path.resolve(`./src/templates/writer-list.js`)


  // Create Contact Us Page
  const contactUsTemp = path.resolve(`./src/templates/contact-us.js`)
  createPage({
    path: `/contact-us/`,
    component: contactUsTemp,
    context: {
      advertisements: advertisementsContent,
    },
  })

  // Create Join Research Review Page
  const JoinRRTemp = path.resolve(`./src/templates/join-rr.js`)
  createPage({
    path: `/join-research-review/`,
    component: JoinRRTemp,
    context: {
      content: joinContent,
      advertisements: advertisementsContent,
    },
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
