// Includes queries to get data from
//    - Umbraco CMS for Research REview
//    - API calls to S7 built APIs 
//

const path = require(`path`)
const { createFilePath } = require(`gatsby-source-filesystem`)
const { filter, first, head, find } = require('lodash');
const axios = require('axios');
const { isGeneratorFunction } = require('util/types');

exports.createPages = async ({ graphql, actions, reporter }) => {
  const { createPage } = actions

  // Define a template for each page using content from Gatsby
  const indexTemplate = path.resolve(`./src/templates/index.js`)
  const reviewTemplate = path.resolve(`./src/templates/review.js`)
  const writerListTemplate = path.resolve(`./src/templates/writer-list.js`)
  const clinicalAreasTemp = path.resolve(`./src/templates/clinical-areas.js`)
  const expertWritersTemp = path.resolve(`./src/templates/expert-writers.js`)
  const writerTemp = path.resolve(`./src/templates/writer.js`)
  const issueTemp = path.resolve(`./src/templates/issue.js`)
  const articleTemp = path.resolve(`./src/templates/article.js`)
  const linksTemp = path.resolve(`./src/templates/links.js`)
  const modulesTemp = path.resolve(`./src/templates/modules.js`)
  const partnersTemplate = path.resolve(`./src/templates/partners.js`)
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

  const UmbracoContentResult = await graphql(
    `
    {
      allZohoUmbracoContent {
        edges {
          node {
            content {
              Node
              DocType
              LastModified
              bannerText
              bannerImage
              buttonText
              buttonLink
              clinicalAreasText
              expertWebinarsTitle
              signUpText
              aboutTextLeftSide
              aboutTextRightSide
              introTextLeft
              introTextRight
              introImage
              introText
              headerLogo
              partnersTitle
              footerLogo
              footerText
              facebookLink
              twitterLink
              linkedInLink
              section_Id
              title
              subtitle
              text
              link
              featuredArticleImage
              Children {
                Node
                DocType
                LastModified
                title
                link
                text
                icon
                bannerText
                bannerImage
                buttonText
                buttonLink
                introTextLeft
                introTextRight
                siteName
                siteImage
                serviceImage
                partnerName
                partnerLogo
                partnerLink
                partnerText
                zohoId
                small
                medium
                fullWidth
                file
                Children {
                  Node
                  DocType
                  LastModified
                  partnerName
                  partnerLogo
                  partnerLink
                  partnerText
                  moduleName
                  text
                  link
                  first_Name
                  last_Name
                  initials
                  email
                  writerImage
                  bio
                  bannerText
                  bannerImage
                  buttonText
                  buttonLink
                  title
                  introText
                  url
                  Children {
                    Node
                    DocType
                    LastModified
                    link
                    image
                  }
                }
              }
            }
          }
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
  
  if (UmbracoContentResult.errors) {
    reporter.panicOnBuild(
      `There was an error loading the Umbraco Content`,
      UmbracoContentResult.errors
    )
    return
  }

  const clinicalAreas = clinicalAreasResult.data.allZohoClinicalAreas.nodes
  const writers = writerResult.data.allZohoWriters.nodes

  const umbracoContentObjectFromGatsby = UmbracoContentResult.data.allZohoUmbracoContent.edges
  let umbracoContent = head(umbracoContentObjectFromGatsby);
  umbracoContent = umbracoContent.node.content;
  const partnersLogoListContent = find(umbracoContent, { "Node": "Partners" });
  const reviewsContentParent = find(umbracoContent, { "Node": "Reviews" });
  const reviewsContent = reviewsContentParent.Children;
  const samplePublication = reviewsContentParent.sampleFile;
  // get all advertising nodes
  const advertisementsContentParent = find(umbracoContent, { "Node": "Advertisements" });
  const allAdvertisements = advertisementsContentParent.Children;
  //console.log("allAdvertisements:" , allAdvertisements)
  // get all site wide ads
  let siteWideAdvertisements = filter(allAdvertisements, { "zohoId": "" }, []);
  //console.log("siteWideAdvertisements:" , siteWideAdvertisements)


  //DEBUGGING WRITERS
  const allWritersByReview = [];

  // - - - - - - - - - - - - - - - - - - - - - - - - MAIN SUB CLINICAL AREA LOOP - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
  async function getSubClinicalAreas(clinicalAreas, parentClinicalArea, url) {
    // function code
    // Gatsby creates own Id. Save Id value from API into new field called alternative_id.

    const childClinicalAreas = clinicalAreas.filter(clinicalArea => {
      if (!clinicalArea.parent_Id) {
        return false;
      }
      return clinicalArea.parent_Id === parentClinicalArea.alternative_id;
    });

    if (childClinicalAreas.length > 0) {
      await Promise.all(childClinicalAreas.map(async (childClinicalArea) => {
        // childClinicalAreas.forEach(async (clinicalArea) => {
        childClinicalArea.name = childClinicalArea.name.split(" (")[0];
        let clinicalAreaHandle = childClinicalArea.name.toLowerCase();
        clinicalAreaHandle = clinicalAreaHandle.split(' ').join('-');
        let clinicalAreaUrl = url + "/" + clinicalAreaHandle;

        // create an array of ads for this cilnicial area
        let ads = [];
        let currentClinicalAreaAdvertisements = filter(allAdvertisements, { "zohoId": childClinicalArea.alternative_id }, []);
        if (currentClinicalAreaAdvertisements) {
          ads = currentClinicalAreaAdvertisements;

          childClinicalArea.ads = currentClinicalAreaAdvertisements;
        }
        else {
          ads = parentClinicalArea.ads;
          childClinicalArea.ads = parentClinicalArea.ads;
        }
        //Checks to see if there are children of this child clinical area
        const children = await getSubClinicalAreas(clinicalAreas, childClinicalArea, clinicalAreaUrl);
        let reviewUrlTemp = "";
        if (children) {
          childClinicalArea['children'] = children;
        } else {
          // if not check for reviews under this clinicial area
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
              `There was an error loading your reviews for ${childClinicalArea.name} `,
              reviewResult.errors
            )
            return
          }
          // start build review section - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
          if (reviewResult.data.allZohoReviews.nodes) {
            let reviews = [...reviewResult.data.allZohoReviews.nodes];
            await Promise.all(reviews.map(async (review) => {
              // reviews.forEach(async (review) => {
              // Create URL
              review.name = review.name.split(" (")[0];
              reviewUrlTemp = review.name.toLowerCase();
              reviewUrlTemp = reviewUrlTemp.split(' ').join('-');
              reviewUrlTemp = clinicalAreaUrl + "/" + reviewUrlTemp;
              let podcasts = [];

              let linksByReview = [];

              reviewContentSortedById = find(reviewsContent, { "zohoId": review.alternative_id });
              if (reviewContentSortedById) {
                podcasts = filter(reviewContentSortedById.Children, { "DocType": "podcast" });
                // writersByReview = filter(reviewContentSortedById.Children, {"DocType": "writer"});
                linksByReview = filter(reviewContentSortedById.Children, { "DocType": "link" });
              }

              //PHIL - Add
              let currentReviewAdvertisements = filter(allAdvertisements, { "zohoId": review.alternative_id }, []);
              if (currentReviewAdvertisements) {
                ads = currentReviewAdvertisements;
              }
              else if (ads.length < 1) {
                ads = siteWideAdvertisements;
              }
              //PHIL - After adding thins change advertisements: advertisementsContent ---> advertisements: ads,
              //Make sure to only do this to CreatePage functions inside the getSubClinicalAreas function
              //Change all the other create pages to siteWideAdvertisements.


              let issues = [];
              issues = await getIssues(review.alternative_id);
              review['writersByReview'] = await getWritersByReview(review.alternative_id);
              let writersByReview = [];
              writersByReview = await getWritersByReview(review.alternative_id);
              if (review.name != "Dermatitis") {
                podcasts = await getPodcasts(review.alternative_id);
                linksByReview = await getLinksByReview(review.alternative_id);
              }

              //create the review page
              createPage({
                path: `/clinical-areas/${reviewUrlTemp}/`,
                component: reviewTemplate,
                context: {
                  review: review,
                  issues: issues,
                  podcasts: podcasts,
                  writersByReview: writersByReview,
                  advertisements: ads,
                  partnersMacroContent: partnersLogoListContent,
                  samplePublication: samplePublication,
                  linksByReview: linksByReview,
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
                    partnersMacroContent: partnersLogoListContent,
                    advertisements: ads,
                    tempUrlPath: `/watch/${reviewUrlTemp}/`
                  },
                })
                // BUILD podcast pages
                await Promise.all(podcasts.map(async (podcast) => {
                  let podcastUrlTemp = podcast.title.toLowerCase();
                  podcastUrlTemp = podcastUrlTemp.split(' ').join('-');
                  //Filter podcast ads from podcast children
                  //Swap advertisements: advertisementsContent ---> advertisements: podcastAds,
                  let podcastAds = filter(podcast.Children, { "DocType": "podcastAdvertisement" }, []);

                  createPage({
                    path: `/watch/${reviewUrlTemp}/${podcastUrlTemp}/`,
                    component: podcastDetailTemp,
                    context: {
                      podcast: podcast,
                      partnersMacroContent: partnersLogoListContent,
                      review: review,
                      advertisements: podcastAds,
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
                      partnersMacroContent: partnersLogoListContent,
                      advertisements: ads,
                      tempUrlPath: `/clinical-areas/${reviewUrlTemp}/${issue.name}/`
                    },
                  })
                  if (articles.length > 0) {
                    await Promise.all(articles.map((article) => {
                      // articles.forEach((article) => {
                      
                      try {
                        createPage({
                          path: `/clinical-areas/${reviewUrlTemp}/${issue.name}/${article.name}`,
                          component: articleTemp,
                          context: {
                            article: article,
                            otherArticles: articles,
                            writersByReview: writersByReview,
                            partnersMacroContent: partnersLogoListContent,
                            advertisements: ads,
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
                  partnersMacroContent: partnersLogoListContent,
                  advertisements: ads,
                },
              })

              await Promise.all(review.writersByReview.map((writer) => {
                // topTwoWriters.forEach((writer) => {
                let writerUrlTemp = writer.name.toLowerCase();
                writerUrlTemp = writerUrlTemp.split(' ').join('-');
                createPage({
                  path: `/expert-advisors/${reviewUrlTemp}/${writerUrlTemp}`,
                  component: writerTemp,
                  context: {
                    writer: writer,
                    partnersMacroContent: partnersLogoListContent,
                    advertisements: ads,
                  },
                })
              }));
              review['url'] = reviewUrlTemp;
            }))
            childClinicalArea['children'] = reviews;
            childClinicalArea['writerUrl'] = reviewUrlTemp;
          }
          // end build review section - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
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
  // clincialAreas includes MEDICAL SPECIALTY etc and all their children, excluding the review areas.

  if (clinicalAreas.length > 0) {
    const testClinicalAreas = clinicalAreas;
    let clinicalAreaTree = filter(clinicalAreas, { parent_Id: null, inactive: false }, []);
    // console.log("clinicalAreaTree - ", clinicalAreaTree);
    await Promise.all(clinicalAreaTree.map(async (topLevelClinicalArea, index) => {
      // clinicalAreaTree.forEach((topLevelClinicalArea) => {
      if (topLevelClinicalArea.name && topLevelClinicalArea.alternative_id) {
        topLevelClinicalArea.name = topLevelClinicalArea.name.split(" (")[0];
        let url = topLevelClinicalArea.name.toLowerCase();
        url = url.split(' ').join('-');
        topLevelClinicalArea.ads = siteWideAdvertisements;
        const children = await getSubClinicalAreas(clinicalAreas, topLevelClinicalArea, url);
        topLevelClinicalArea.children = children;
      }
    }))

    const clinicalAreasContent = find(umbracoContent, { "Node": "Clinical Areas" });
    createPage({
      path: `/clinical-areas/`,
      component: clinicalAreasTemp,
      context: {
        clinicalAreas: clinicalAreaTree,
        content: clinicalAreasContent,
        partnersMacroContent: partnersLogoListContent,
        advertisements: siteWideAdvertisements,
        pageName: "Clinical Areas",
        pageUrl: "/clinical-areas/"
      },
    })

    const expertWritersContent = find(umbracoContent, { "Node": "Expert Writers" });
    createPage({
      path: `/expert-advisors/`,
      component: expertWritersTemp,
      context: {
        clinicalAreas: clinicalAreaTree,
        content: expertWritersContent,
        allWritersByReview: allWritersByReview,
        partnersMacroContent: partnersLogoListContent,
        advertisements: siteWideAdvertisements,
        testClinicalAreas: testClinicalAreas,
        pageName: "Expert Advisors",
        pageUrl: "/expert-advisors/"
      },
    })

    const watchContent = find(umbracoContent, { "Node": "Watch" });
    createPage({
      path: `/watch/`,
      component: clinicalAreasTemp,
      context: {
        clinicalAreas: clinicalAreaTree,
        content: watchContent,
        partnersMacroContent: partnersLogoListContent,
        advertisements: siteWideAdvertisements,
        pageName: "Watch",
        pageUrl: "/watch/"
      },
    })

    const linkContent = find(umbracoContent, { "Node": "Links" });
    createPage({
      path: `/links/`,
      component: clinicalAreasTemp,
      context: {
        clinicalAreas: clinicalAreaTree,
        content: linkContent,
        partnersMacroContent: partnersLogoListContent,
        advertisements: siteWideAdvertisements,
        pageName: "Links",
        pageUrl: "/links/"
      },
    })


    createPage({
      path: `/subscriptions/`,
      component: subscriptionsTemp,
      context: {
        clinicalAreas: clinicalAreaTree,
        partnersMacroContent: partnersLogoListContent,
        advertisements: siteWideAdvertisements,
      },
    })

    const homeContent = find(umbracoContent, { "Node": "Home" });
    const featuredArticleContent = find(umbracoContent, { "Node": "Featured Article" });
    createPage({
      path: `/`,
      component: indexTemplate,
      context: {
        featuredArticle: featuredArticleContent,
        homeContent: homeContent,
        advertisements: siteWideAdvertisements,
        partnersMacroContent: partnersLogoListContent,
        umbracoContent: umbracoContent,
      },
    })

    const professionalDevelopmentContent = find(umbracoContent, { "Node": "Professional Development" });
    const partnersContent = find(professionalDevelopmentContent.Children, { "Node": "CPD" });
    createPage({
      path: `/partners`,
      component: partnersTemplate,
      context: {
        partnersContent: partnersContent,
        partnersMacroContent: partnersLogoListContent,
        advertisements: siteWideAdvertisements,
      },
    })

    // console.log("before creating modules page")
    const modulesContent = find(professionalDevelopmentContent.Children, { "Node": "CME" });
    createPage({
      path: `/modules`,
      component: modulesTemp,
      context: {
        partnersMacroContent: partnersLogoListContent,
        modulesContent: modulesContent,
        advertisements: siteWideAdvertisements,
      },
    })

    const sampleReviewsContent = find(umbracoContent, { "Node": "Sample Reviews" });
    const sampleReviewsTemp = path.resolve(`./src/templates/sample-reviews.js`)
    createPage({
      path: `/sample-reviews`,
      component: sampleReviewsTemp,
      context: {
        partnersMacroContent: partnersLogoListContent,
        sampleReviews: sampleReviewsContent,
        advertisements: siteWideAdvertisements,
      },
    })

    // Create Contact Us Page
    // console.log("before creating contactUs page")
    const contactUsTemp = path.resolve(`./src/templates/contact-us.js`)
    const contactUsContent = find(umbracoContent, { "Node": "Contact Us" });
    createPage({
      path: `/contact-us/`,
      component: contactUsTemp,
      context: {
        contactUsContent: contactUsContent,
        partnersMacroContent: partnersLogoListContent,
        advertisements: siteWideAdvertisements,
      },
    })

    // Create Join Research Review Page
    // console.log("before creating JoinRR page")
    const JoinRRTemp = path.resolve(`./src/templates/join-rr.js`)
    const joinRRContent = find(umbracoContent, { "Node": "Join Research Review" });
    createPage({
      path: `/join-research-review/`,
      component: JoinRRTemp,
      context: {
        joinRRContent: joinRRContent,
        partnersMacroContent: partnersLogoListContent,
        advertisements: siteWideAdvertisements,
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