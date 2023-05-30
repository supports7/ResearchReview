const path = require(`path`)
const { createFilePath } = require(`gatsby-source-filesystem`)
const { filter, first, head, find } = require('lodash');
const axios = require('axios');
const { isGeneratorFunction } = require('util/types');

exports.createPages = async ({ graphql, actions, reporter }) => {
  const { createPage } = actions

  // Define a template for each page using content from Gatsby
  const indexTemp = path.resolve(`./src/templates/index.js`)
  const reviewTemp = path.resolve(`./src/templates/review.js`)
  const writerListTemp = path.resolve(`./src/templates/writer-list.js`)
  const clinicalAreasTemp = path.resolve(`./src/templates/clinical-areas.js`)
  const expertWritersTemp = path.resolve(`./src/templates/expert-writers.js`)
  const writerTemp = path.resolve(`./src/templates/writer.js`)
  const issueTemp = path.resolve(`./src/templates/issue.js`)
  const articleTemp = path.resolve(`./src/templates/article.js`)
  const linksTemp = path.resolve(`./src/templates/links.js`)
  const modulesTemp = path.resolve(`./src/templates/modules.js`)
  const partnersTemp = path.resolve(`./src/templates/partners.js`)
  const subscriptionsTemp = path.resolve(`./src/templates/subscriptions.js`)
  const podcastsTemp = path.resolve(`./src/templates/podcasts.js`)
  const podcastDetailTemp = path.resolve(`./src/templates/podcastDetails.js`)

  let featuredArticleUrl = "";

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

  async function getLinksByReview(reviewId) {
    let responseData = await axios.get(`https://researchreview.dev.s05.system7.co.nz/api/reviews/${reviewId}/links`).then(
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

  const UmbracoContentResult = await graphql(
    `
      {
        allZohoUmbracoContent {
          edges {
            node {
              id
              content {
                LastModified
                DocType
                Node
                twitterLink
                aboutTextLeftSide
                aboutTextRightSide
                bannerImage
                bannerText
                buttonLink
                buttonText
                clinicalAreasText
                expertWebinarsTitle
                facebookLink
                featuredArticleImage
                footerLogo
                footerText
                headerLogo
                introImage
                introText
                introTextLeft
                introTextRight
                linkedInLink
                section_Id
                partnersTitle
                signUpText
                subtitle
                text
                title
                Children {
                  DocType
                  LastModified
                  Node
                  bannerImage
                  bannerText
                  buttonLink
                  introTextLeft
                  buttonText
                  introTextRight
                  link
                  partnerLink
                  partnerLogo
                  partnerName
                  partnerText
                  serviceImage
                  siteImage
                  siteName
                  text
                  title
                  zohoID
                  Children {
                    DocType
                    LastModified
                    Node
                    bannerImage
                    bannerText
                    bio
                    buttonLink
                    email
                    buttonText
                    first_Name
                    initials
                    introText
                    last_Name
                    link
                    moduleName
                    partnerLink
                    partnerLogo
                    partnerName
                    partnerText
                    text
                    title
                    url
                    writerImage
                  }
                }
              }
            }
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
  if (UmbracoContentResult.errors) {
    reporter.panicOnBuild(
      `There was an error loading the Umbraco Content`,
      UmbracoContentResult.errors
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
  const featuredArticleArray = featuredArticleResult.data.allZohoFeaturedArticle.nodes
  
  const partners = partnersResult.data.allZohoPartners.nodes
  const modules = modulesResult.data.allZohoModules.nodes
  // const homeContent = homeResult.data.allZohoHome.nodes
  const joinContent = joinResult.data.allZohoJoin.nodes
  const advertisementsContent = advertisementsResult.data.allZohoAdvertisements.nodes
  const featuredArticle = first(featuredArticleArray);
  
  const umbracoContentObjectFromGatsby = UmbracoContentResult.data.allZohoUmbracoContent.edges
  let umbracoContent = head(umbracoContentObjectFromGatsby);
  umbracoContent = umbracoContent.node.content;
  const partnersMacroContent = find(umbracoContent, {"Node": "Partners"});
  const reviewsContentParent = find(umbracoContent, {"Node": "Reviews"});
  const reviewsContent = reviewsContentParent.Children;
  
  // console.log("umbraco content - ", umbracoContent)
  
  // Create clinical area pages
  async function getSubClinicalAreas(clinicalAreas, alternative_id, url) {
    // function code
    // Gatsby creates own Id. Save Id value from API into new field called alternative_id.
    const childClinicalAreas = clinicalAreas.filter(clinicalArea => {
      if (!clinicalArea.parent_Id) {
        return false;
      }
      return clinicalArea.parent_Id === alternative_id;
    });

    if (childClinicalAreas.length > 0) {
      await Promise.all(childClinicalAreas.map(async (childClinicalArea) => {
        // childClinicalAreas.forEach(async (clinicalArea) => {
        childClinicalArea.name = childClinicalArea.name.split(" (")[0];
        let urlTemp = childClinicalArea.name.toLowerCase();
        urlTemp = urlTemp.split(' ').join('-');
        urlTemp = url + "/" + urlTemp;

        //Checks to see if there are children of this child clinical area
        const children = await getSubClinicalAreas(clinicalAreas, childClinicalArea.alternative_id, urlTemp);
        let writersByReview = [];

        if (children) {
          childClinicalArea['children'] = children;
        } else {
          const reviewResult = await graphql(
            `
              {
                allZohoReviews(filter: {clinical_Area_Id: {eq: "${childClinicalArea.alternative_id}"}}) {
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
              let podcasts = [];
              
              let linksByReview = [];

              reviewContentSortedById = find(reviewsContent, {"zohoID": review.alternative_id});
              if(reviewContentSortedById) {
                podcasts = filter(reviewContentSortedById.Children, {"DocType": "podcast"});
                writersByReview = filter(reviewContentSortedById.Children, {"DocType": "writer"});
                linksByReview = filter(reviewContentSortedById.Children, {"DocType": "link"});
              }

              let issues = [];
              issues = await getIssues(review.alternative_id);

              if(review.name.toLowerCase() != "dermatitis") {

                podcasts = await getPodcasts(review.alternative_id);
                
                writersByReview = await getWritersByReview(review.alternative_id);
                
                linksByReview = await getLinksByReview(review.alternative_id);
              }

              //create the review page
              createPage({
                path: `/clinical-areas/${reviewUrlTemp}/`,
                component: reviewTemp,
                context: {
                  review: review,
                  issues: issues,
                  podcasts: podcasts,
                  writersByReview: writersByReview,
                  advertisements: advertisementsContent,
                  partnersMacroContent: partnersMacroContent,
                },
              })

              //Check if any podcasts related to this review
              if (podcasts) {
                createPage({
                  path: `/watch/${reviewUrlTemp}/`,
                  component: podcastsTemp,
                  context: {
                    podcasts: podcasts,
                    review: review,
                    partnersMacroContent: partnersMacroContent,
                    advertisements: advertisementsContent,
                    tempUrlPath: `/watch/${reviewUrlTemp}/`
                  },
                })

                await Promise.all(podcasts.map(async (podcast) => {
                  let podcastUrlTemp = podcast.title.toLowerCase();
                  podcastUrlTemp = podcastUrlTemp.split(' ').join('-');

                  createPage({
                    path: `/watch/${reviewUrlTemp}/${podcastUrlTemp}/`,
                    component: podcastDetailTemp,
                    context: {
                      podcast: podcast,
                      partnersMacroContent: partnersMacroContent,
                      review: review,
                      advertisements: advertisementsContent,
                    },
                  })
                }))
              }

              //Check if this review has any issues
              if (issues.length > 0) {
                await Promise.all(issues.map(async (issue) => {
                  // issues.forEach(async (issue) => {
                  let articles = [];
                  articles = await getArticles(issue.id);

                  createPage({
                    path: `/clinical-areas/${reviewUrlTemp}/${issue.name}/`,
                    component: issueTemp,
                    context: {
                      issue: issue,
                      articles: articles,
                      partnersMacroContent: partnersMacroContent,
                      advertisements: advertisementsContent,
                      tempUrlPath: `/clinical-areas/${reviewUrlTemp}/${issue.name}/`
                    },
                  })
                  if (articles.length > 0) {
                    await Promise.all(articles.map((article) => {
                      // articles.forEach((article) => {
                      if (article.id == featuredArticle.section_Id) {
                        featuredArticle.url = `/clinical-areas/${reviewUrlTemp}/${issue.name}/`;
                      }
                      try {
                        createPage({
                          path: `/clinical-areas/${reviewUrlTemp}/${issue.name}/${article.name}`,
                          component: articleTemp,
                          context: {
                            article: article,
                            otherArticles: articles,
                            writersByReview: writersByReview,
                            partnersMacroContent: partnersMacroContent,
                            advertisements: advertisementsContent,
                            tempUrlPath: `/clinical-areas/${reviewUrlTemp}/${issue.name}/`
                          },
                        })
                      } catch (ex) {
                        console.log(ex);
                      }
                    }))
                  }
                }))
              }

              createPage({
                path: `/links/${reviewUrlTemp}/`,
                component: linksTemp,
                context: {
                  review: review,
                  links: linksByReview,
                  partnersMacroContent: partnersMacroContent,
                  advertisements: advertisementsContent,
                },
              })

              createPage({
                path: `/expert-advisors/${reviewUrlTemp}/`,
                component: writerListTemp,
                context: {
                  review: review,
                  writers: writers,
                  partnersMacroContent: partnersMacroContent,
                  url: `/expert-advisors/${reviewUrlTemp}/`,
                  advertisements: advertisementsContent,
                },
              })

              const topTwoWriters = writers.slice(0, 2);
              await Promise.all(topTwoWriters.map((writer) => {
                // topTwoWriters.forEach((writer) => {
                let writerUrlTemp = writer.name.toLowerCase();
                writerUrlTemp = writerUrlTemp.split(' ').join('-');
                createPage({
                  path: `/expert-advisors/${reviewUrlTemp}/${writerUrlTemp}`,
                  component: writerTemp,
                  context: {
                    writer: writer,
                    partnersMacroContent: partnersMacroContent,
                    advertisements: advertisementsContent,
                  },
                })
              }));
              review['url'] = reviewUrlTemp;
            }))
            childClinicalArea['children'] = reviews;
            childClinicalArea['writersByReview'] = writersByReview;
          }
        }

      }))
      //Return updated clinical areas
      //Have add reviews under children nodes
      return childClinicalAreas;
    }
    else {
      return;
    }
  }
  // This is end of the getSubClinicalAreas function

  if (clinicalAreas.length > 0) {
    let clinicalAreaTree = filter(clinicalAreas, { parent_Id: null, inactive: false }, []);
    // console.log("clinicalAreaTree - ", clinicalAreaTree);
    await Promise.all(clinicalAreaTree.map(async (clinicalArea, index) => {
      // clinicalAreaTree.forEach((clinicalArea) => {
      if (clinicalArea.name && clinicalArea.alternative_id) {
        clinicalArea.name = clinicalArea.name.split(" (")[0];
        let url = clinicalArea.name.toLowerCase();
        url = url.split(' ').join('-');
        const children = await getSubClinicalAreas(clinicalAreas, clinicalArea.alternative_id, url);
        clinicalArea.children = children;
      }
    }))

    const clinicalAreasContent = find(umbracoContent, {"Node": "Clinical Areas"});
    createPage({
      path: `/clinical-areas/`,
      component: clinicalAreasTemp,
      context: {
        clinicalAreas: clinicalAreaTree,
        content: clinicalAreasContent,
        partnersMacroContent: partnersMacroContent,
        advertisements: advertisementsContent,
        pageName: "Clinical Areas",
        pageUrl: "/clinical-areas/"
      },
    })

    const expertWritersContent = find(umbracoContent, {"Node": "Expert Writers"});
    createPage({
      path: `/expert-advisors/`,
      component: expertWritersTemp,
      context: {
        clinicalAreas: clinicalAreaTree,
        content: expertWritersContent,
        partnersMacroContent: partnersMacroContent,
        advertisements: advertisementsContent,
        pageName: "Expert Advisors",
        pageUrl: "/expert-advisors/"
      },
    })

    const watchContent = find(umbracoContent, {"Node": "Watch"});
    createPage({
      path: `/watch/`,
      component: clinicalAreasTemp,
      context: {
        clinicalAreas: clinicalAreaTree,
        content: watchContent,
        partnersMacroContent: partnersMacroContent,
        advertisements: advertisementsContent,
        pageName: "Watch",
        pageUrl: "/watch/"
      },
    })

    const linkContent = find(umbracoContent, {"Node": "Links"});
    createPage({
      path: `/links/`,
      component: clinicalAreasTemp,
      context: {
        clinicalAreas: clinicalAreaTree,
        content: linkContent,
        partnersMacroContent: partnersMacroContent,
        advertisements: advertisementsContent,
        pageName: "Links",
        pageUrl: "/links/"
      },
    })


    createPage({
      path: `/subscriptions/`,
      component: subscriptionsTemp,
      context: {
        clinicalAreas: clinicalAreaTree,
        partnersMacroContent: partnersMacroContent,
        advertisements: advertisementsContent,
      },
    })
    // console.log("BUILT PAGES WITH CLINICAL AREA TREE");


    // clinicalAreas.forEach((clinicalArea) => {

    //     // if (clinicalArea.name) {
    //       //   clinicalArea.name = clinicalArea.name.split(" (")[0];
    //       //   // console.log("before getSubClinicalAreas", clinicalArea.name);
    //       const clinicalAreasTemp = filter(clinicalAreas, { parent_Id: clinicalArea.alternative_id }, []);
    //   clinicalArea['children'] = clinicalAreasTemp;
    // })
    // phil hack
    // let clinicalAreaTree = filter(clinicalAreas, { parent_Id: null, inactive: false }, []);    
    // console.log(clinicalAreaTree);

    // let clinicalAreaTreePhil = filter(clinicalAreas, { parent_Id: null, inactive: false }, []);
    // 






    // console.log("before creating home page")
    // let homeContent = {};
    // if(umbracoContent[0].node.content) {
    //   homeContent = filter(umbracoContent[0].node.content, { "Node": "Home" }, {})
    //   console.log("homeContent", homeContent)
    // }

    const homeContent = find(umbracoContent, {"Node": "Home"});
    createPage({
      path: `/`,
      component: indexTemp,
      context: {
        featuredArticle: featuredArticle,
        homeContent: homeContent,
        advertisements: advertisementsContent,
        partnersMacroContent: partnersMacroContent,
        umbracoContent: umbracoContent,
      },
    })

    const professionalDevelopmentContent = find(umbracoContent, {"Node": "Professional Development"});
    const partnersContent = find(professionalDevelopmentContent.Children, {"Node": "CPD"});
    createPage({
      path: `/partners`,
      component: partnersTemp,
      context: {
        partners: partners,
        partnersContent: partnersContent,
        partnersMacroContent: partnersMacroContent,
        advertisements: advertisementsContent,
      },
    })

    // console.log("before creating modules page")
    const modulesContent = find(professionalDevelopmentContent.Children, {"Node": "CME"});
    createPage({
      path: `/modules`,
      component: modulesTemp,
      context: {
        modules: modules,
        partnersMacroContent: partnersMacroContent,
        modulesContent: modulesContent,
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
    // console.log("before creating contactUs page")
    const contactUsTemp = path.resolve(`./src/templates/contact-us.js`)
    const contactUsContent = find(umbracoContent, {"Node": "Contact Us"});
    createPage({
      path: `/contact-us/`,
      component: contactUsTemp,
      context: {
        contactUsContent: contactUsContent,
        partnersMacroContent: partnersMacroContent,
        advertisements: advertisementsContent,
      },
    })

    // Create Join Research Review Page
    // console.log("before creating JoinRR page")
    const JoinRRTemp = path.resolve(`./src/templates/join-rr.js`)
    const joinRRContent = find(umbracoContent, {"Node": "Join Research Review"});
    createPage({
      path: `/join-research-review/`,
      component: JoinRRTemp,
      context: {
        content: joinContent,
        joinRRContent: joinRRContent,
        partnersMacroContent: partnersMacroContent,
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
