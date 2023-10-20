// Includes queries to get data from
//    - Umbraco CMS for Research REview
//    - API calls to S7 built APIs 
//

const path = require(`path`)
const { createFilePath } = require(`gatsby-source-filesystem`)
const { filter, first, head, find } = require('lodash');
const axios = require('axios');
const { isGeneratorFunction } = require('util/types');

// A: MAIN LARGE FUNCTION TO CREATE PAGES

exports.createPages = async ({ graphql, actions, reporter }) => {
  const { createPage } = actions

  // 1. DEFINE TEMPLATE FILES: Define a template for each page using content from Gatsby

  const indexTemplate = path.resolve(`./src/templates/index.js`)
  const reviewTemplate = path.resolve(`./src/templates/review.js`)
  const writerListTemplate = path.resolve(`./src/templates/writer-list.js`)
  const clinicalAreasTemp = path.resolve(`./src/templates/clinical-areas.js`)
  const expertWritersTemp = path.resolve(`./src/templates/expert-writers.js`)
  const linksTreeTemp = path.resolve(`./src/templates/links-tree.js`)
  const modulesTreeTemp = path.resolve(`./src/templates/modules-tree.js`)
  const podcastsTreeTemp = path.resolve(`./src/templates/podcasts-tree.js`)
  const writerTemp = path.resolve(`./src/templates/writer.js`)
  const issueTemp = path.resolve(`./src/templates/issue.js`)
  const articleTemp = path.resolve(`./src/templates/article.js`)
  const linksTemp = path.resolve(`./src/templates/links.js`)
  const modulesTemp = path.resolve(`./src/templates/modules.js`)
  const partnersTemplate = path.resolve(`./src/templates/partners.js`)
  const subscriptionsTemp = path.resolve(`./src/templates/subscriptions.js`)
  const podcastsTemp = path.resolve(`./src/templates/podcasts.js`)
  const podcastDetailTemp = path.resolve(`./src/templates/podcastDetails.js`)

  //2. DEFINE FUNCTIONS TO GET DATA FROM S7 API
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

  //3 . DEFINE FUNCTIONS TO GET INFORMATION FROM GATSBY
  // This data is loaded by the gatsby-config.js file
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
  //4 . CHECK FOR ERRORS FROM STEP 3
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

  //5. PUT ZOHO DATA INTO VARIABLES
  const clinicalAreas = clinicalAreasResult.data.allZohoClinicalAreas.nodes
  const writers = writerResult.data.allZohoWriters.nodes


  // 6. PUT UMBRACO CONTENT INTO VARIABLES
  // UMBRACO CONTENT GETS LOADED FROM gatsby-config.js
  const umbracoContentObjectFromGatsby = UmbracoContentResult.data.allZohoUmbracoContent.edges
  let umbracoContent = head(umbracoContentObjectFromGatsby);
  umbracoContent = umbracoContent.node.content;
  const partnersLogoListContent = find(umbracoContent, { "Node": "Partners" });
  const reviewsContentParent = find(umbracoContent, { "Node": "Reviews" });
  const reviewsContent = reviewsContentParent.Children;
  const samplePublication = reviewsContentParent.sampleFile;
  const advertisementsContentParent = find(umbracoContent, { "Node": "Advertisements" });
  const allAdvertisements = advertisementsContentParent.Children;
  let siteWideAdvertisements = filter(allAdvertisements, { "zohoId": "" }, []);

  // Sign up form content
  const locationsContent = find(umbracoContent, { "Node": "Locations" });
  const professionsContent = find(umbracoContent, { "Node": "Professions" });
  const signUpFormContent = {
    locations: locationsContent,
    professions: professionsContent
  }

  // 7.  - - - - - - - - - - - - - - - - - - - - - - - - MAIN SUB CLINICAL NESTED FUNCTION  - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
  async function buildSubClinicalAreas(clinicalAreas, parentClinicalArea, url) {
    // function code
    // Gatsby creates own Id. Save Id value from API into new field called alternative_id.

    const childClinicalAreas = clinicalAreas.filter(clinicalArea => {
      if (!clinicalArea.parent_Id) {
        return false;
      }
      return clinicalArea.parent_Id === parentClinicalArea.alternative_id;
    });

    if (childClinicalAreas.length == 0) {
      return;
    }
    else {
      await Promise.all(childClinicalAreas.map(async (childClinicalArea) => {
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
        const children = await buildSubClinicalAreas(clinicalAreas, childClinicalArea, clinicalAreaUrl);

        let reviewUrlTemp = "";
        // If this has children clinicial areas, then return
        if (children) {
          let totalPodcastCount = 0;
          let totalLinksCount = 0;
          let totalWritersCount = 0;
          let totalModuleCount = 0;

          children.forEach(element => {
            totalPodcastCount += element.PodCastCount;
            totalLinksCount += element.LinksCount;
            totalWritersCount += element.WritersCount;
            totalModuleCount += element.ModulesCount;
          });
          childClinicalArea.PodCastCount = totalPodcastCount;
          childClinicalArea.LinksCount = totalLinksCount;
          childClinicalArea.WritersCount = totalWritersCount;
          childClinicalArea.ModulesCount = totalModuleCount;

          childClinicalArea['children'] = children;
        } else {
          // if no child clinicial areas, check for reviews and build
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
          // Setup clinical area
          childClinicalArea.PodCasts = [];
          childClinicalArea.PodCastCount = 0;
          // start build review section - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
          if (reviewResult.data.allZohoReviews.nodes) {
            let reviews = [...reviewResult.data.allZohoReviews.nodes];
            await Promise.all(reviews.map(async (review) => {
              // Create URL
              review.name = review.name.split(" (")[0];
              reviewUrlTemp = review.name.toLowerCase();
              reviewUrlTemp = reviewUrlTemp.split(' ').join('-');
              reviewUrlTemp = clinicalAreaUrl + "/" + reviewUrlTemp;
              let podcasts = [];

              let linksByReview = [];
              let modulesByReview = [];

              // PULL CONTENT FROM UMBRACO
              const currentReviewUmbracoContent = find(reviewsContent, { "zohoId": review.alternative_id });
              if (currentReviewUmbracoContent) {
                podcasts = filter(currentReviewUmbracoContent.Children, { "DocType": "podcast" });
                modulesByReview = filter(currentReviewUmbracoContent.Children, { "DocType": "modules" });
                linksByReview = filter(currentReviewUmbracoContent.Children, { "DocType": "link" });
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
              //Make sure to only do this to CreatePage functions inside the buildSubClinicalAreas function
              //Change all the other create pages to siteWideAdvertisements.


              let issues = [];
              issues = await getIssues(review.alternative_id);

              review['writersByReview'] = await getWritersByReview(review.alternative_id);
              // double call is because this re-using the same data was causing gatsby issues
              let writersByReview = [];
              writersByReview = await getWritersByReview(review.alternative_id);

              // OLD Code below for Zoho
              // if (review.name != "Dermatitis") {
              //   podcasts = await getPodcasts(review.alternative_id);
              //   linksByReview = await getLinksByReview(review.alternative_id);
              // }

              //BUILD THE REVIEW PAGE
              //  NEED TO PULL THROUGH THE LINKS HERE - SHOULD I DO A QUERY?
              // check that reviewUrlTemp is added to each loop
              try {
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
                    signUpFormContent: signUpFormContent,
                  },
                })
              } catch (ex) {
                console.log(ex);
              }
              //Check if any podcasts related to this review
              if (podcasts) {
                if (childClinicalArea.PodCasts && childClinicalArea.PodCastCount) {
                  childClinicalArea.PodCasts.push(...podcasts);
                  childClinicalArea.PodCastCount += podcasts.length;
                }
                else {
                  childClinicalArea.PodCasts = [...podcasts];
                  childClinicalArea.PodCastCount = podcasts.length;
                }
                try {
                  createPage({
                    path: `/watch/${reviewUrlTemp}/`,
                    component: podcastsTemp,
                    context: {
                      podcasts: podcasts,
                      review: review,
                      partnersMacroContent: partnersLogoListContent,
                      signUpFormContent: signUpFormContent,
                      advertisements: ads,
                      tempUrlPath: `/watch/${reviewUrlTemp}/`
                    },
                  })
                } catch (ex) {
                  console.log(ex);
                }
                // BUILD podcast pages
                await Promise.all(podcasts.map(async (podcast) => {
                  let podcastUrlTemp = podcast.title.toLowerCase();
                  podcastUrlTemp = podcastUrlTemp.split(' ').join('-');
                  //Filter podcast ads from podcast children
                  //Swap advertisements: advertisementsContent ---> advertisements: podcastAds,
                  let podcastAds = filter(podcast.Children, { "DocType": "podcastAdvertisement" }, []);
                  try {
                    createPage({
                      path: `/watch/${reviewUrlTemp}/${podcastUrlTemp}/`,
                      component: podcastDetailTemp,
                      context: {
                        podcast: podcast,
                        partnersMacroContent: partnersLogoListContent,
                        signUpFormContent: signUpFormContent,
                        review: review,
                        advertisements: podcastAds,
                      },
                    })
                  } catch (ex) {
                    console.log(ex);
                  }
                }))

              }

              // BUILD ISSUE PAGES (IF THEY EXIST)
              if (issues.length > 0) {
                await Promise.all(issues.map(async (issue) => {
                  // issues.forEach(async (issue) => {
                  let articles = [];
                  articles = await getArticles(issue.id);
                  console.log("createPage:Issue:", reviewUrlTemp, issue.name)
                  try {
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
                  } catch (ex) {
                    console.log(ex);
                  }
                  // BUILD ARTICLE PAGES (IF THEY EXIST)
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
                            signUpFormContent: signUpFormContent,
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

              // BUILD REVIEW LINKS PAGE
              if (linksByReview) {
                if (childClinicalArea.Links && childClinicalArea.LinksCount) {
                  childClinicalArea.Links.push(...linksByReview);
                  childClinicalArea.LinksCount += linksByReview.length;
                }
                else {
                  childClinicalArea.Links = [...linksByReview];
                  childClinicalArea.LinksCount = linksByReview.length;
                }
                try {
                  createPage({
                    path: `/links/${reviewUrlTemp}/`,
                    component: linksTemp,
                    context: {
                      review: review,
                      links: linksByReview,
                      partnersMacroContent: partnersLogoListContent,
                      signUpFormContent: signUpFormContent,
                      advertisements: ads,
                    },
                  })
                } catch (ex) {
                  console.log(ex);
                }
              }

              if (modulesByReview) {
                if (childClinicalArea.Modules && childClinicalArea.ModulesCount) {
                  childClinicalArea.Modules.push(...modulesByReview);
                  childClinicalArea.ModulesCount += modulesByReview.length;
                }
                else {
                  childClinicalArea.Modules = [...modulesByReview];
                  childClinicalArea.ModulesCount = modulesByReview.length;
                }
                try {
                  createPage({
                    path: `/modules/${reviewUrlTemp}/`,
                    component: modulesTemp,
                    context: {
                      review: review,
                      modules: modulesByReview,
                      partnersMacroContent: partnersLogoListContent,
                      signUpFormContent: signUpFormContent,
                      advertisements: ads,
                    },
                  })
                } catch (ex) {
                  console.log(ex);
                }
              }

              // BUILD REVIEW EXPERT ADVISORS LIST PAGE
              if (review.writersByReview) {
                if (childClinicalArea.Writers && childClinicalArea.WritersCount) {
                  childClinicalArea.Writers.push(...review.writersByReview);
                  childClinicalArea.WritersCount += review.writersByReview.length;
                }
                else {
                  childClinicalArea.Writers = [...review.writersByReview];
                  childClinicalArea.WritersCount = review.writersByReview.length;
                }
                await Promise.all(review.writersByReview.map((writer) => {
                  // topTwoWriters.forEach((writer) => {
                  let writerUrlTemp = writer.name.toLowerCase();
                  writerUrlTemp = writerUrlTemp.split(' ').join('-');
                  try {
                    createPage({
                      path: `/expert-advisors/${reviewUrlTemp}/${writerUrlTemp}`,
                      component: writerTemp,
                      context: {
                        writer: writer,
                        partnersMacroContent: partnersLogoListContent,
                        signUpFormContent: signUpFormContent,
                        advertisements: ads,
                      },
                    })
                  } catch (ex) {
                    console.log(ex);
                  }
                }));
              }
              review['url'] = reviewUrlTemp;
            }))
            // ADD DISCOVERED DATA TO THIS VARIABLE: STEPHEN - WHY? WHERE IS THIS USED?
            // STEPHEN - THIS DATA IS USED WHEN BUILDING THE CLINICAL AREA PAGE OR ELSE THE REVIEWS AREN'T ATTACHED TO A CLINICAL AREA
            childClinicalArea['children'] = reviews;
            childClinicalArea['writerUrl'] = reviewUrlTemp;
          }
          // end build review section - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
        }

      }))
      //Return updated child clinical areas
      //  NOTE: Have add reviews, and writers under the child nodes
      return childClinicalAreas;
    }
  }

  // ------------------------------- END  buildSubClinicalAreas function--------------------------------- 
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
        const children = await buildSubClinicalAreas(clinicalAreas, topLevelClinicalArea, url);
        topLevelClinicalArea.children = children;
      }
    }))

    // BUILDS THE VERY TOP LEVEL CLINICIAL AREAS PAGES (WITH THE CLINICAL AREA MENU)
    const clinicalAreasContent = find(umbracoContent, { "Node": "Clinical Areas" });
    try {
      createPage({
        path: `/clinical-areas/`,
        component: clinicalAreasTemp,
        context: {
          clinicalAreas: clinicalAreaTree,
          content: clinicalAreasContent,
          partnersMacroContent: partnersLogoListContent,
          advertisements: siteWideAdvertisements,
          signUpFormContent: signUpFormContent,
          pageName: "Clinical Areas",
          pageUrl: "/clinical-areas/"
        },
      })
    } catch (ex) {
      console.log(ex);
    }

    // BUILDS THE VERY TOP LEVEL EXPERT WRITERS PAGE (WITH THE CLINICAL AREA MENU)
    const expertWritersContent = find(umbracoContent, { "Node": "Expert Writers" });
    try {
      createPage({
        path: `/expert-advisors/`,
        component: expertWritersTemp,
        context: {
          clinicalAreas: clinicalAreaTree,
          content: expertWritersContent,
          partnersMacroContent: partnersLogoListContent,
          advertisements: siteWideAdvertisements,
          testClinicalAreas: testClinicalAreas,
          signUpFormContent: signUpFormContent,
          pageName: "Expert Advisors",
          pageUrl: "/expert-advisors/"
        },
      })
    } catch (ex) {
      console.log(ex);
    }

    // BUILD MAIN PODCASTS PAGE
    const watchContent = find(umbracoContent, { "Node": "Watch" });
    try {
      createPage({
        path: `/watch/`,
        component: podcastsTreeTemp,
        context: {
          clinicalAreas: clinicalAreaTree,
          content: watchContent,
          partnersMacroContent: partnersLogoListContent,
          advertisements: siteWideAdvertisements,
          signUpFormContent: signUpFormContent,
          pageName: "Watch",
          pageUrl: "/watch/"
        },
      })
    } catch (ex) {
      console.log(ex);
    }
    const linkContent = find(umbracoContent, { "Node": "Links" });
    try {
      createPage({
        path: `/links/`,
        component: linksTreeTemp,
        context: {
          clinicalAreas: clinicalAreaTree,
          content: linkContent,
          partnersMacroContent: partnersLogoListContent,
          advertisements: siteWideAdvertisements,
          signUpFormContent: signUpFormContent,
          pageName: "Links",
          pageUrl: "/links/"
        },
      })
    } catch (ex) {
      console.log(ex);
    }
    // NEEDS TO CHANGE TO MATCH CLINICAL AREA TREE
    const professionalDevelopmentContent = find(umbracoContent, { "Node": "Professional Development" });
    const modulesContent = find(professionalDevelopmentContent.Children, { "Node": "CME" });
    try {
      createPage({
        path: `/modules`,
        component: modulesTreeTemp,
        context: {
          clinicalAreas: clinicalAreaTree,
          partnersMacroContent: partnersLogoListContent,
          modulesContent: modulesContent,
          signUpFormContent: signUpFormContent,
          advertisements: siteWideAdvertisements,
        },
      })
    } catch (ex) {
      console.log(ex);
    }
    // const modulesContent = find(professionalDevelopmentContent.Children, { "Node": "CME" });
    // createPage({
    //   path: `/modules`,
    //   component: modulesTreeTemp,
    //   context: {
    //     clinicalAreas: clinicalAreaTree,
    //     partnersMacroContent: partnersLogoListContent,
    //     modulesContent: modulesContent,
    //     advertisements: siteWideAdvertisements,
    //   },
    // })

    try {
      createPage({
        path: `/subscriptions/`,
        component: subscriptionsTemp,
        context: {
          clinicalAreas: clinicalAreaTree,
          partnersMacroContent: partnersLogoListContent,
          advertisements: siteWideAdvertisements,
        },
      })
    } catch (ex) {
      console.log(ex);
    }
    // BUILDS HOME PAGE
    const homeContent = find(umbracoContent, { "Node": "Home" });
    const featuredArticleContent = find(umbracoContent, { "Node": "Featured Article" });
    try {
      createPage({
        path: `/`,
        component: indexTemplate,
        context: {
          featuredArticle: featuredArticleContent,
          homeContent: homeContent,
          advertisements: siteWideAdvertisements,
          partnersMacroContent: partnersLogoListContent,
          umbracoContent: umbracoContent,
          signUpFormContent: signUpFormContent,
        },
      })
    } catch (ex) {
      console.log(ex);
    }
    // BUILDS TOP LEVEL PROFESSIONAL DEVLOPMENT PAGE
    const partnersContent = find(professionalDevelopmentContent.Children, { "Node": "CPD" });
    try {
      createPage({
        path: `/partners`,
        component: partnersTemplate,
        context: {
          partnersContent: partnersContent,
          partnersMacroContent: partnersLogoListContent,
          signUpFormContent: signUpFormContent,
          advertisements: siteWideAdvertisements,
        },
      })
    } catch (ex) {
      console.log(ex);
    }
    const sampleReviewsContent = find(umbracoContent, { "Node": "Sample Reviews" });
    const sampleReviewsTemp = path.resolve(`./src/templates/sample-reviews.js`)
    try {
      createPage({
        path: `/sample-reviews`,
        component: sampleReviewsTemp,
        context: {
          partnersMacroContent: partnersLogoListContent,
          sampleReviews: sampleReviewsContent,
          advertisements: siteWideAdvertisements,
          signUpFormContent: signUpFormContent,
        },
      })
    } catch (ex) {
      console.log(ex);
    }
    const termsAndConditionsContent = find(umbracoContent, { "Node": "Terms And Conditions" });
    const termsAndConditionsTemp = path.resolve(`./src/templates/terms-and-conditions.js`)
    try {
      createPage({
        path: `/terms-and-conditions`,
        component: termsAndConditionsTemp,
        context: {
          partnersMacroContent: partnersLogoListContent,
          content: termsAndConditionsContent,
          advertisements: siteWideAdvertisements,
        },
      })
    } catch (ex) {
      console.log(ex);
    }
    // BUILDS CONTACT US PAGE
    const contactUsTemp = path.resolve(`./src/templates/contact-us.js`)
    const contactUsContent = find(umbracoContent, { "Node": "Contact Us" });
    try {
      createPage({
        path: `/contact-us/`,
        component: contactUsTemp,
        context: {
          contactUsContent: contactUsContent,
          partnersMacroContent: partnersLogoListContent,
          advertisements: siteWideAdvertisements,
        },
      })
    } catch (ex) {
      console.log(ex);
    }
    // Create Join Research Review Page
    const JoinRRTemp = path.resolve(`./src/templates/join-rr.js`)
    const joinRRContent = find(umbracoContent, { "Node": "Join Research Review" });
    try {
      createPage({
        path: `/join-research-review/`,
        component: JoinRRTemp,
        context: {
          joinRRContent: joinRRContent,
          partnersMacroContent: partnersLogoListContent,
          advertisements: siteWideAdvertisements,
          locationsContent: locationsContent,
          professionsContent: professionsContent,
          signUpFormContent: signUpFormContent,
        },
      })
    } catch (ex) {
      console.log(ex);
    }
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