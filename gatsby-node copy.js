// Includes queries to get data from
//    - Umbraco CMS for Research REview
//    - API calls to S7 built APIs 
//

// 1. DEFINE TEMPLATE FILES & IMPORTS: Define a template for each page using content from Gatsby
// Imports
const path = require('path');
const { createFilePath } = require('gatsby-source-filesystem');
const { filter, find, head } = require('lodash');
const axios = require('axios');
const testClinicalAreas = require('./testData');

// Template paths
const templates = {
  index: path.resolve('./src/templates/index.js'),
  review: path.resolve('./src/templates/review.js'),
  writerList: path.resolve('./src/templates/writer-list.js'),
  clinicalAreas: path.resolve('./src/templates/clinical-areas.js'),
  expertWriters: path.resolve('./src/templates/expert-writers.js'),
  linksTree: path.resolve('./src/templates/links-tree.js'),
  modulesTree: path.resolve('./src/templates/modules-tree.js'),
  podcastsTree: path.resolve('./src/templates/podcasts-tree.js'),
  writer: path.resolve('./src/templates/writer.js'),
  issue: path.resolve('./src/templates/issue.js'),
  article: path.resolve('./src/templates/article.js'),
  links: path.resolve('./src/templates/links.js'),
  modules: path.resolve('./src/templates/modules.js'),
  partners: path.resolve('./src/templates/partners.js'),
  subscriptions: path.resolve('./src/templates/subscriptions.js'),
  podcasts: path.resolve('./src/templates/podcasts.js'),
  podcastDetail: path.resolve('./src/templates/podcastDetails.js'),
  sampleReviews: path.resolve('./src/templates/sample-reviews.js'),
  termsAndConditions: path.resolve('./src/templates/terms-and-conditions.js'),
  contactUs: path.resolve('./src/templates/contact-us.js'),
  joinRR: path.resolve('./src/templates/join-rr.js'),
  profile: path.resolve('./src/templates/profile.js')
};




// const indexTemplate = path.resolve(`./src/templates/index.js`)
// const reviewTemplate = path.resolve(`./src/templates/review.js`)
// const writerListTemplate = path.resolve(`./src/templates/writer-list.js`)
// const clinicalAreasTemp = path.resolve(`./src/templates/clinical-areas.js`)
// const expertWritersTemp = path.resolve(`./src/templates/expert-writers.js`)
// const linksTreeTemp = path.resolve(`./src/templates/links-tree.js`)
// const modulesTreeTemp = path.resolve(`./src/templates/modules-tree.js`)
// const podcastsTreeTemp = path.resolve(`./src/templates/podcasts-tree.js`)
// const writerTemp = path.resolve(`./src/templates/writer.js`)
// const issueTemp = path.resolve(`./src/templates/issue.js`)
// const articleTemp = path.resolve(`./src/templates/article.js`)
// const linksTemp = path.resolve(`./src/templates/links.js`)
// const modulesTemp = path.resolve(`./src/templates/modules.js`)
// const partnersTemplate = path.resolve(`./src/templates/partners.js`)
// const subscriptionsTemp = path.resolve(`./src/templates/subscriptions.js`)
// const podcastsTemp = path.resolve(`./src/templates/podcasts.js`)
// const podcastDetailTemp = path.resolve(`./src/templates/podcastDetails.js`)

//2. DEFINE FUNCTIONS TO GET DATA FROM S7 API

// API Call Functions
const fetchData = async (url) => {
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error(`Error fetching data from ${url}:`, error);
    return [];
  }
};

const getIssues = (clinicalAreaId) => fetchData(`https://researchreview.dev.s05.system7.co.nz/api/clinicalareas/${clinicalAreaId}/issues`);
const getArticles = (issueId) => fetchData(`https://researchreview.dev.s05.system7.co.nz/api/issues/${issueId}/sections`);
const getPodcasts = (clinicalAreaId) => fetchData(`https://researchreview.dev.s05.system7.co.nz/api/clinicalareas/${clinicalAreaId}/podcasts`);
const getWritersByReview = (clinicalAreaId) => fetchData(`https://researchreview.dev.s05.system7.co.nz/api/clinicalareas/${clinicalAreaId}/writers`);
const getLinksByReview = (clinicalAreaId) => fetchData(`https://researchreview.dev.s05.system7.co.nz/api/clinicalareas/${clinicalAreaId}/links`);

//3 . DEFINE FUNCTIONS TO GET INFORMATION FROM GATSBY
// This data is loaded by the gatsby-config.js file
// Get all the content from Clinical Areas endpoint
// GraphQL Queries
const fetchGraphQLData = async (graphql, query) => {
  try {
    const result = await graphql(query);
    if (result.errors) {
      throw new Error(result.errors);
    }
    return result.data;
  } catch (error) {
    throw new Error(`Error in GraphQL query: ${error.message}`);
  }
};

const queries = {
  clinicalAreaGroups: `
    {
      allZohoClinicalAreaGroups {
        nodes {
          id
          name
          inactive
          clinical_Area_Group_ID
          alternative_id
          country
          modified_Time
          parent_Id
        }
      }
    }
  `,
  professions: `
    {
      allZohoProfessions {
        nodes {
          name
          sub_Specialties
        }
      }
    }
  `,
  locations: `
    {
      zohoLocations {
        name
        locations
      }
    }
  `,
  writers: `
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
  `,
  umbracoContent: `
    {
      allZohoUmbracoContent {
        edges {
          node {
            content {
              Node
              twitterLink
              text
              signUpText
              bannerImage
              aboutTextLeftSide
              aboutTextRightSide
              bannerText
              buttonLink
              buttonText
              clinicalAreasText
              expertWebinarsTitle
              facebookLink
              footerLogo
              footerText
              headerLogo
              information
              introImage
              introText
              introTextLeft
              introTextRight
              linkedInLink
              partnersTitle
              Children {
                Node
                bannerImage
                buttonLink
                bannerText
                buttonText
                featuredArticleImage
                file
                icon
                image
                information
                introTextLeft
                introTextRight
                link
                medium
                partnerLink
                partnerLogo
                partnerName
                partnerText
                reviewIds
                section_Id
                serviceImage
                siteImage
                siteName
                small
                subtitle
                text
                title
                url
                zohoId
                Children {
                  Node
                  information
                  partnerLink
                  partnerLogo
                  partnerName
                  partnerText
                  DocType
                }
                DocType
              }
              DocType
            }
          }
        }
      }
    }
  `
};


// A: MAIN LARGE FUNCTION TO CREATE PAGES

exports.createPages = async ({ graphql, actions, reporter }) => {
  const { createPage } = actions

  // Fetch data from GraphQL
  let clinicalAreaGroupsResult, professionsResult, locationsResult, writerResult, UmbracoContentResult;

  try {
    clinicalAreaGroupsResult = await fetchGraphQLData(graphql, queries.clinicalAreaGroups);
    professionsResult = await fetchGraphQLData(graphql, queries.professions);
    locationsResult = await fetchGraphQLData(graphql, queries.locations);
    writerResult = await fetchGraphQLData(graphql, queries.writers);
    UmbracoContentResult = await fetchGraphQLData(graphql, queries.umbracoContent);
  } catch (error) {
    reporter.panicOnBuild(error.message);
    return;
  }

  // Put Zoho data into variables
  const clinicalAreas = clinicalAreaGroupsResult.allZohoClinicalAreaGroups.nodes;
  const writers = writerResult.allZohoWriters.nodes;
  const professions = professionsResult.allZohoProfessions.nodes;
  const locations = locationsResult.zohoLocations;

  // Put Umbraco content into variables
  const umbracoContentObjectFromGatsby = UmbracoContentResult.allZohoUmbracoContent.edges;
  let umbracoContent = head(umbracoContentObjectFromGatsby).node.content;

  const partnersLogoListContent = find(umbracoContent, { Node: "Partners" });
  const reviewsContentParent = find(umbracoContent, { Node: "Reviews" });
  const reviewsContent = reviewsContentParent?.Children || [];
  const samplePublication = reviewsContentParent?.sampleFile || null;

  const advertisementsContentParent = find(umbracoContent, { Node: "Advertisements" });
  const allAdvertisements = advertisementsContentParent?.Children || [];
  const siteWideAdvertisements = filter(allAdvertisements, { zohoId: "" }, []);

  const locationsContent = find(umbracoContent, { Node: "Locations" });
  const professionsContent = find(umbracoContent, { Node: "Professions" });
  const signUpFormContent = {
    locations: locations,
    professions: professions
  };

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
          // if no child clinicial area group, check for clinical area and build
          const clinicalAreaResult = await graphql(
            `
            {
              allZohoClinicalAreas(filter: {clinical_Area_Group_Id: {eq: "${childClinicalArea.alternative_id}"}}) {
                  nodes {
                    alternative_id
                    clinical_Area_Group_Id
                    country
                    description
                    id
                    isActive
                    modified_Time
                    name
                  }
                }
              }
              `
          )
          if (clinicalAreaResult.errors) {
            reporter.panicOnBuild(
              `There was an error loading your reviews for ${childClinicalArea.name} `,
              clinicalAreaResult.errors
            )
            return
          }
          // Setup clinical area
          childClinicalArea.PodCasts = [];
          childClinicalArea.PodCastCount = 0;
          // start build clinical area section - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
          if (clinicalAreaResult.data.allZohoClinicalAreas.nodes) {
            let clinicalAreas = [...clinicalAreaResult.data.allZohoClinicalAreas.nodes];
            await Promise.all(clinicalAreas.map(async (clinicalArea) => {
              // Create URL
              clinicalArea.name = clinicalArea.name.split(" (")[0];
              reviewUrlTemp = clinicalArea.name.toLowerCase();
              reviewUrlTemp = reviewUrlTemp.split(' ').join('-');
              reviewUrlTemp = clinicalAreaUrl + "/" + reviewUrlTemp;
              let podcasts = [];

              let linksByReview = [];
              let modulesByReview = [];

              // PULL CONTENT FROM UMBRACO
              const currentReviewUmbracoContent = find(reviewsContent, { "zohoId": clinicalArea.alternative_id });
              if (currentReviewUmbracoContent) {
                podcasts = filter(currentReviewUmbracoContent.Children, { "DocType": "podcast" });
                modulesByReview = filter(currentReviewUmbracoContent.Children, { "DocType": "modules" });
                linksByReview = filter(currentReviewUmbracoContent.Children, { "DocType": "link" });
              }

              //PHIL - Add
              let currentReviewAdvertisements = filter(allAdvertisements, { "zohoId": clinicalArea.alternative_id }, []);
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
              issues = await getIssues(clinicalArea.alternative_id);

              clinicalArea['writersByReview'] = await getWritersByReview(clinicalArea.alternative_id);
              // double call is because this re-using the same data was causing gatsby issues
              let writersByReview = [];
              writersByReview = await getWritersByReview(clinicalArea.alternative_id);

              // OLD Code below for Zoho
              // if (clinicalArea.name != "Dermatitis") {
              //   podcasts = await getPodcasts(clinicalArea.alternative_id);
              //   linksByReview = await getLinksByReview(clinicalArea.alternative_id);
              // }

              //BUILD THE REVIEW PAGE
              //  NEED TO PULL THROUGH THE LINKS HERE - SHOULD I DO A QUERY?
              // check that reviewUrlTemp is added to each loop
              try {
                console.log("createPage:clinicalArea:", reviewUrlTemp)
                createPage({
                  path: `/clinical-areas/${reviewUrlTemp}/`,
                  component: reviewTemplate,
                  context: {
                    clinicalArea: clinicalArea,
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
                console.log("Error bulding clinicalArea page: ", reviewUrlTemp, ex);
              }
              //Check if any podcasts related to this clinicalArea
              if (podcasts) {
                if (childClinicalArea.PodCasts && childClinicalArea.PodCastCount) {
                  childClinicalArea.PodCasts.push(...podcasts);
                  childClinicalArea.PodCastCount += podcasts.length;
                }
                else {
                  childClinicalArea.PodCasts = [...podcasts];
                  childClinicalArea.PodCastCount = podcasts.length;
                }
                console.log("createPage:watch:", reviewUrlTemp)
                try {
                  createPage({
                    path: `/watch/${reviewUrlTemp}/`,
                    component: podcastsTemp,
                    context: {
                      podcasts: podcasts,
                      clinicalArea: clinicalArea,
                      partnersMacroContent: partnersLogoListContent,
                      signUpFormContent: signUpFormContent,
                      advertisements: ads,
                      tempUrlPath: `/watch/${reviewUrlTemp}/`
                    },
                  })
                } catch (ex) {
                  console.log("Error bulding watch page: ", reviewUrlTemp, ex);

                }
                // BUILD podcast pages
                await Promise.all(podcasts.map(async (podcast) => {
                  let podcastUrlTemp = podcast.title.toLowerCase();
                  podcastUrlTemp = podcastUrlTemp.split(' ').join('-');
                  //Filter podcast ads from podcast children
                  //Swap advertisements: advertisementsContent ---> advertisements: podcastAds,
                  let podcastAds = filter(podcast.Children, { "DocType": "podcastAdvertisement" }, []);
                  try {
                    console.log("createPage:watch:", reviewUrlTemp, podcastUrlTemp)
                    createPage({
                      path: `/watch/${reviewUrlTemp}/${podcastUrlTemp}/`,
                      component: podcastDetailTemp,
                      context: {
                        podcast: podcast,
                        partnersMacroContent: partnersLogoListContent,
                        signUpFormContent: signUpFormContent,
                        clinicalArea: clinicalArea,
                        advertisements: podcastAds,
                      },
                    })
                  } catch (ex) {
                    console.log("Error bulding watch page: ", podcastUrlTemp, ex);

                  }
                }))

              }

              // BUILD ISSUE PAGES (IF THEY EXIST)
              if (issues.length > 0) {
                await Promise.all(issues.map(async (issue) => {
                  // issues.forEach(async (issue) => {
                  try {
                    let articles = [];
                    articles = await getArticles(issue.id);

                    try {
                      console.log("createPage:Issue:", reviewUrlTemp, issue.name)
                      createPage({
                        path: `/clinical-areas/${reviewUrlTemp}/${issue.name}/`,
                        component: issueTemp,
                        context: {
                          issue: issue,
                          articles: articles,
                          partnersMacroContent: partnersLogoListContent,
                          advertisements: ads,
                          breadcrumbs: [
                            { name: clinicalArea.name, url: `/clinical-areas/${reviewUrlTemp}` },
                            // { name: issue.issue1, url: `/clinical-areas/${reviewUrlTemp}/${issue.name}` },
                          ],
                          tempUrlPath: `/clinical-areas/${reviewUrlTemp}/${issue.name}/`
                        },
                      })
                    } catch (ex) {
                      console.log("Error bulding Issue page: ", issue.id, ex);
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
                              breadcrumbs: [
                                { name: clinicalArea.name, url: `/clinical-areas/${reviewUrlTemp}` },
                                { name: issue.issue1, url: `/clinical-areas/${reviewUrlTemp}/${issue.name}` },
                                // { name: article.title, url: `/clinical-areas/${reviewUrlTemp}/${issue.name}/${article.name}` },
                              ],
                              tempUrlPath: `/clinical-areas/${reviewUrlTemp}/${issue.name}/`
                            },
                          })
                        } catch (ex) {
                          console.log("Error bulding article page: ", issue.name, article.name, ex);
                        }
                      }))
                    }

                  }
                  catch (ex) {
                    console.log("Error bulding issue page: ", issue.id, ex);
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
                  console.log("createPage:links:", reviewUrlTemp)
                  createPage({
                    path: `/links/${reviewUrlTemp}/`,
                    component: linksTemp,
                    context: {
                      clinicalArea: clinicalArea,
                      links: linksByReview,
                      partnersMacroContent: partnersLogoListContent,
                      signUpFormContent: signUpFormContent,
                      advertisements: ads,
                    },
                  })
                } catch (ex) {
                  console.log("Error bulding links page: ", reviewUrlTemp, ex);

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
                      clinicalArea: clinicalArea,
                      modules: modulesByReview,
                      partnersMacroContent: partnersLogoListContent,
                      signUpFormContent: signUpFormContent,
                      advertisements: ads,
                    },
                  })
                } catch (ex) {
                  console.log("Error bulding modules page: ", reviewUrlTemp, ex);
                }
              }

              // BUILD REVIEW EXPERT ADVISORS LIST PAGE
              if (clinicalArea.writersByReview) {
                if (childClinicalArea.Writers && childClinicalArea.WritersCount) {
                  childClinicalArea.Writers.push(...clinicalArea.writersByReview);
                  childClinicalArea.WritersCount += clinicalArea.writersByReview.length;
                }
                else {
                  childClinicalArea.Writers = [...clinicalArea.writersByReview];
                  childClinicalArea.WritersCount = clinicalArea.writersByReview.length;
                }
                await Promise.all(clinicalArea.writersByReview.map((writer) => {
                  // topTwoWriters.forEach((writer) => {
                  let writerUrlTemp = writer.name.toLowerCase();
                  writerUrlTemp = writerUrlTemp.split(' ').join('-');
                  console.log("createPage:Writer:", reviewUrlTemp, writerUrlTemp)
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
                    console.log("Error bulding writer page: ", reviewUrlTemp, writerUrlTemp, ex);
                  }
                }));
              }
              clinicalArea['url'] = reviewUrlTemp;
            }))
            // ADD DISCOVERED DATA TO THIS VARIABLE: STEPHEN - WHY? WHERE IS THIS USED?
            // STEPHEN - THIS DATA IS USED WHEN BUILDING THE CLINICAL AREA PAGE OR ELSE THE REVIEWS AREN'T ATTACHED TO A CLINICAL AREA
            childClinicalArea['children'] = clinicalAreas;
            childClinicalArea['writerUrl'] = reviewUrlTemp;
          }
          // end build clinicalArea section - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
        }

      }))
      //Return updated child clinical areas
      //  NOTE: Have add clinicalAreas, and writers under the child nodes
      return childClinicalAreas;
    }
  }

  // ------------------------------- END  buildSubClinicalAreas function--------------------------------- 
  // clincialAreas includes MEDICAL SPECIALTY etc and all their children, excluding the clinical areas.

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
      console.log("createPage:cinical-areas top-page:")
      createPage({
        path: `/clinical-areas/`,
        component: clinicalAreasTemp,
        context: {
          clinicalAreas: clinicalAreaTree,
          testClinicalAreas: testClinicalAreas,
          content: clinicalAreasContent,
          partnersMacroContent: partnersLogoListContent,
          advertisements: siteWideAdvertisements,
          signUpFormContent: signUpFormContent,
          pageName: "Clinical Areas",
          pageUrl: "/clinical-areas/"
        },
      })
    } catch (ex) {
      console.log("Error bulding top clinicial-area page: ", ex);

    }

    // BUILDS THE VERY TOP LEVEL EXPERT WRITERS PAGE (WITH THE CLINICAL AREA MENU)
    const expertWritersContent = find(umbracoContent, { "Node": "Expert Writers" });
    try {
      console.log("createPage:Expert-Advisors  top-page:")
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
      console.log("Error bulding top expert-advisers page: ", ex);
    }

    // BUILD MAIN PODCASTS PAGE
    const watchContent = find(umbracoContent, { "Node": "Watch" });
    try {
      console.log("Create Page:watch  top-page")
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
      console.log("Error bulding top watch page: ", ex);
    }
    const linkContent = find(umbracoContent, { "Node": "Links" });
    try {
      console.log("Create Page:links  top-page")
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
      console.log("Error bulding top links  page: ", ex);
    }
    // NEEDS TO CHANGE TO MATCH CLINICAL AREA TREE
    const professionalDevelopmentContent = find(umbracoContent, { "Node": "Professional Development" });
    const modulesContent = find(professionalDevelopmentContent.Children, { "Node": "CME" });
    try {
      console.log("Create Page:modules  top-page")
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
      console.log("Error bulding top modules page: ", ex);
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
      console.log("Create Page:subscriptions  top-page")
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
      console.log("Error bulding top subsriptions page: ", ex);
    }
    // BUILDS HOME PAGE
    const homeContent = find(umbracoContent, { "Node": "Home" });
    const featuredArticleContent = find(umbracoContent, { "Node": "Featured Article" });
    try {
      console.log("Create Page:root  top-page")
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
      console.log("Error bulding root page: ", ex);

    }
    // BUILDS TOP LEVEL PROFESSIONAL DEVLOPMENT PAGE
    const partnersContent = find(professionalDevelopmentContent.Children, { "Node": "CPD" });
    try {
      console.log("Create Page:partners  top-page")
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
      console.log("Error bulding top partners page: ", ex);

    }
    const sampleReviewsContent = find(umbracoContent, { "Node": "Sample Reviews" });
    const sampleReviewsTemp = path.resolve(`./src/templates/sample-reviews.js`)
    try {
      console.log("Create Page:sample-reviews  top-page")
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
      console.log("Error bulding top sample-reviews page: ", ex);

    }
    const termsAndConditionsContent = find(umbracoContent, { "Node": "Terms And Conditions" });
    const termsAndConditionsTemp = path.resolve(`./src/templates/terms-and-conditions.js`)
    try {
      console.log("Create Page:terms-and-conditions  top-page")
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
      console.log("Error bulding top terms and conditions page: ", ex);

    }
    // BUILDS CONTACT US PAGE
    const contactUsTemp = path.resolve(`./src/templates/contact-us.js`)
    const contactUsContent = find(umbracoContent, { "Node": "Contact Us" });
    try {
      console.log("Create Page:contact-us  top-page")
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
      console.log("Error bulding top contact page: ", ex);

    }
    // Create Join Research Review Page
    const JoinRRTemp = path.resolve(`./src/templates/join-rr.js`)
    const joinRRContent = find(umbracoContent, { "Node": "Join Research Review" });
    try {
      console.log("Create Page:join-research-review  top-page")
      createPage({
        path: `/join-research-review/`,
        component: JoinRRTemp,
        context: {
          joinRRContent: joinRRContent,
          partnersMacroContent: partnersLogoListContent,
          advertisements: siteWideAdvertisements,
          locationsContent: locations,
          professionsContent: professions,
          signUpFormContent: signUpFormContent,
          // professions: professions,
          // locations: locations,
        },
      })
    } catch (ex) {
      console.log("Error bulding top join page: ", ex);

    }
    //Profile Page
    const profileTemp = path.resolve(`./src/templates/profile.js`)
    try {
      console.log("Create Page:profile  top-page")
      createPage({
        path: `/profile`,
        component: profileTemp,
        context: {
          joinRRContent: joinRRContent,
          locationsContent: locations,
          professionsContent: professions,
          signUpFormContent: signUpFormContent,
        },
      })
    } catch (ex) {
      console.log("Error bulding top profile page: ", ex);

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