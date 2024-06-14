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
  const signUpFormContent = {
    locations: locations,
    professions: professions
  };

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

  // const locationsContent = find(umbracoContent, { Node: "Locations" });
  // const professionsContent = find(umbracoContent, { Node: "Professions" });

  // 7.  - - - - - - - - - - - - - - - - - - - - - - - - MAIN SUB CLINICAL NESTED FUNCTION  - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
  async function buildSubClinicalAreas(clinicalAreas, parentClinicalArea, url) {

    const childClinicalAreas = clinicalAreas.filter(clinicalArea => {
      // Gatsby creates own Id. Save Id value from API into new field called alternative_id.
      return clinicalArea.parent_Id === parentClinicalArea.alternative_id;
    });

    if (childClinicalAreas.length === 0) return;

    await Promise.all(childClinicalAreas.map(async (childClinicalArea) => {
      childClinicalArea.name = childClinicalArea.name.split(" (")[0];
      const clinicalAreaHandle = childClinicalArea.name.toLowerCase().split(' ').join('-');
      const clinicalAreaUrl = `${url}/${clinicalAreaHandle}`;

      const currentClinicalAreaAdvertisements = filter(allAdvertisements, { zohoId: childClinicalArea.alternative_id }, []);
      const ads = currentClinicalAreaAdvertisements.length > 0 ? currentClinicalAreaAdvertisements : parentClinicalArea.ads;

      const children = await buildSubClinicalAreas(clinicalAreas, childClinicalArea, clinicalAreaUrl);


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

        childClinicalArea.children = children;
      } else {
        // if no child clinicial area group, check for clinical area and build
        const clinicalAreaResult = await fetchGraphQLData(graphql, `
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
        }`);

        // Setup clinical area
        if (clinicalAreaResult.allZohoClinicalAreas.nodes.length > 0) {
          const clinicalAreas = clinicalAreaResult.allZohoClinicalAreas.nodes;
          childClinicalArea.PodCasts = [];
          childClinicalArea.PodCastCount = 0;
          childClinicalArea.Links = [];
          childClinicalArea.LinksCount = 0;
          childClinicalArea.Writers = [];
          childClinicalArea.WritersCount = 0;
          childClinicalArea.Module = [];
          childClinicalArea.ModuleCount = 0;

          await Promise.all(clinicalAreas.map(async (clinicalArea) => {
            clinicalArea.name = clinicalArea.name.split(" (")[0];
            let reviewUrlTemp = clinicalArea.name.toLowerCase().split(' ').join('-');
            reviewUrlTemp = `${clinicalAreaUrl}/${reviewUrlTemp}`;

            const currentReviewUmbracoContent = find(reviewsContent, { zohoId: clinicalArea.alternative_id });
            const podcasts = currentReviewUmbracoContent ? filter(currentReviewUmbracoContent.Children, { DocType: "podcast" }) : [];
            const modulesByReview = currentReviewUmbracoContent ? filter(currentReviewUmbracoContent.Children, { DocType: "modules" }) : [];
            const linksByReview = currentReviewUmbracoContent ? filter(currentReviewUmbracoContent.Children, { DocType: "link" }) : [];
            const currentReviewAdvertisements = filter(allAdvertisements, { zohoId: clinicalArea.alternative_id }, []);
            const ads = currentReviewAdvertisements.length > 0 ? currentReviewAdvertisements : siteWideAdvertisements;

            const issues = await getIssues(clinicalArea.alternative_id);
            const writersByReview = await getWritersByReview(clinicalArea.alternative_id);

            createPage({
              path: `/clinical-areas/${reviewUrlTemp}/`,
              component: templates.review,
              context: {
                clinicalArea,
                issues,
                podcasts,
                writersByReview,
                advertisements: ads,
                partnersMacroContent: partnersLogoListContent,
                samplePublication,
                linksByReview,
                signUpFormContent,
              },
            });

            if (podcasts.length > 0) {
              childClinicalArea.PodCasts.push(...podcasts);
              childClinicalArea.PodCastCount += podcasts.length;

              createPage({
                path: `/watch/${reviewUrlTemp}/`,
                component: templates.podcasts,
                context: {
                  podcasts,
                  clinicalArea,
                  partnersMacroContent: partnersLogoListContent,
                  signUpFormContent,
                  advertisements: ads,
                  tempUrlPath: `/watch/${reviewUrlTemp}/`
                },
              });

              await Promise.all(podcasts.map(async (podcast) => {
                const podcastUrlTemp = podcast.title.toLowerCase().split(' ').join('-');
                const podcastAds = filter(podcast.Children, { DocType: "podcastAdvertisement" }, []);

                createPage({
                  path: `/watch/${reviewUrlTemp}/${podcastUrlTemp}/`,
                  component: templates.podcastDetail,
                  context: {
                    podcast,
                    partnersMacroContent: partnersLogoListContent,
                    signUpFormContent,
                    clinicalArea,
                    advertisements: podcastAds,
                  },
                });
              }));
            }

            if (issues.length > 0) {
              // console.log("clinicalArea with issues", clinicalArea)
              await Promise.all(issues.map(async (issue) => {
                const articles = await getArticles(issue.id);

                createPage({
                  path: `/clinical-areas/${reviewUrlTemp}/${issue.name}/`,
                  component: templates.issue,
                  context: {
                    issue,
                    articles,
                    partnersMacroContent: partnersLogoListContent,
                    advertisements: ads,
                    breadcrumbs: [
                      { name: clinicalArea.name, url: `/clinical-areas/${reviewUrlTemp}` },
                    ],
                    tempUrlPath: `/clinical-areas/${reviewUrlTemp}/${issue.name}/`
                  },
                });

                if (articles.length > 0) {
                console.log("clinicalArea with issues", clinicalArea)
                console.log("issue with article", issue)

                  await Promise.all(articles.map((article) => {
                    createPage({
                      path: `/clinical-areas/${reviewUrlTemp}/${issue.name}/${article.name}`,
                      component: templates.article,
                      context: {
                        article,
                        otherArticles: articles,
                        writersByReview,
                        partnersMacroContent: partnersLogoListContent,
                        signUpFormContent,
                        advertisements: ads,
                        breadcrumbs: [
                          { name: clinicalArea.name, url: `/clinical-areas/${reviewUrlTemp}` },
                          { name: issue.issue1, url: `/clinical-areas/${reviewUrlTemp}/${issue.name}` },
                        ],
                        tempUrlPath: `/clinical-areas/${reviewUrlTemp}/${issue.name}/`
                      },
                    });
                  }));
                }
              }));
            }

            if (linksByReview.length > 0) {
              childClinicalArea.Links = childClinicalArea.Links || [];
              childClinicalArea.Links.push(...linksByReview);
              childClinicalArea.LinksCount = (childClinicalArea.LinksCount || 0) + linksByReview.length;

              createPage({
                path: `/links/${reviewUrlTemp}/`,
                component: templates.links,
                context: {
                  clinicalArea,
                  links: linksByReview,
                  partnersMacroContent: partnersLogoListContent,
                  signUpFormContent,
                  advertisements: ads,
                },
              });
            }

            if (modulesByReview.length > 0) {
              childClinicalArea.Modules = childClinicalArea.Modules || [];
              childClinicalArea.Modules.push(...modulesByReview);
              childClinicalArea.ModulesCount = (childClinicalArea.ModulesCount || 0) + modulesByReview.length;

              createPage({
                path: `/modules/${reviewUrlTemp}/`,
                component: templates.modules,
                context: {
                  clinicalArea,
                  modules: modulesByReview,
                  partnersMacroContent: partnersLogoListContent,
                  signUpFormContent,
                  advertisements: ads,
                },
              });
            }

            if (writersByReview.length > 0) {
              childClinicalArea.Writers = childClinicalArea.Writers || [];
              childClinicalArea.Writers.push(...writersByReview);
              childClinicalArea.WritersCount = (childClinicalArea.WritersCount || 0) + writersByReview.length;

              await Promise.all(writersByReview.map((writer) => {
                const writerUrlTemp = writer.name.toLowerCase().split(' ').join('-');

                createPage({
                  path: `/expert-advisors/${reviewUrlTemp}/${writerUrlTemp}`,
                  component: templates.writer,
                  context: {
                    writer,
                    partnersMacroContent: partnersLogoListContent,
                    signUpFormContent,
                    advertisements: ads,
                  },
                });
              }));
            }

            clinicalArea.url = reviewUrlTemp;
          }));
          
          childClinicalArea.children = clinicalAreas;
        }
      }
    }));

    return childClinicalAreas;
  };

  // ------------------------------- END  buildSubClinicalAreas function--------------------------------- 
  // clincialAreas includes MEDICAL SPECIALTY etc and all their children, excluding the clinical areas.

  const clinicalAreaTree = filter(clinicalAreas, { parent_Id: null, inactive: false });

  await Promise.all(clinicalAreaTree.map(async (topLevelClinicalArea) => {
    if (topLevelClinicalArea.name && topLevelClinicalArea.alternative_id) {
      topLevelClinicalArea.name = topLevelClinicalArea.name.split(" (")[0];
      const url = topLevelClinicalArea.name.toLowerCase().split(' ').join('-');
      topLevelClinicalArea.ads = siteWideAdvertisements;
      topLevelClinicalArea.children = await buildSubClinicalAreas(clinicalAreas, topLevelClinicalArea, url);
    }
  }));

  const clinicalAreasContent = find(umbracoContent, { Node: "Clinical Areas" });
  createPage({
    path: `/clinical-areas/`,
    component: templates.clinicalAreas,
    context: {
      clinicalAreas: clinicalAreaTree,
      testClinicalAreas: clinicalAreas,
      content: clinicalAreasContent,
      partnersMacroContent: partnersLogoListContent,
      advertisements: siteWideAdvertisements,
      signUpFormContent,
      pageName: "Clinical Areas",
      pageUrl: "/clinical-areas/"
    },
  });

  // Creating additional pages
  const createTopLevelPage = (node, path, component) => {
    const content = find(umbracoContent, { Node: node });
    createPage({
      path,
      component,
      context: {
        clinicalAreas: clinicalAreaTree,
        content,
        partnersMacroContent: partnersLogoListContent,
        advertisements: siteWideAdvertisements,
        signUpFormContent,
        pageName: node,
        pageUrl: path
      },
    });
  };

  createTopLevelPage("Expert Writers", "/expert-advisors/", templates.expertWriters);
  createTopLevelPage("Watch", "/watch/", templates.podcastsTree);
  createTopLevelPage("Links", "/links/", templates.linksTree);
  // createTopLevelPage("Professional Development", "/modules", templates.modulesTree);
  createTopLevelPage("Subscriptions", "/subscriptions/", templates.subscriptions);
  createTopLevelPage("Home", "/", templates.index);
  createTopLevelPage("Sample Reviews", "/sample-reviews", templates.sampleReviews);
  createTopLevelPage("Terms And Conditions", "/terms-and-conditions", templates.termsAndConditions);
  createTopLevelPage("Contact Us", "/contact-us/", templates.contactUs);
  createTopLevelPage("Join Research Review", "/join-research-review/", templates.joinRR);
  createTopLevelPage("Profile", "/profile", templates.profile);

  // Build Top Level Professional Development Page
  const professionalDevelopmentContent = find(umbracoContent, { Node: "Professional Development" }) || {};
  const partnersContent = find(professionalDevelopmentContent.Children, { Node: "CPD" }) || {};
  createPage({
    path: `/partners`,
    component: templates.partners,
    context: {
      partnersContent,
      partnersMacroContent: partnersLogoListContent,
      signUpFormContent,
      advertisements: siteWideAdvertisements,
    },
  });
  // Modules page
  const modulesContent = find(professionalDevelopmentContent.Children, { Node: "CME" }) || {};
  createPage({
    path: `/modules`,
    component: templates.modulesTree,
    context: {
      clinicalAreas: clinicalAreaTree,
      partnersMacroContent: partnersLogoListContent,
      modulesContent,
      signUpFormContent,
      advertisements: siteWideAdvertisements,
    },
  });
};

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions;

  if (node.internal.type === `MarkdownRemark`) {
    const value = createFilePath({ node, getNode });

    createNodeField({
      name: `slug`,
      node,
      value,
    });
  }
};

exports.createSchemaCustomization = ({ actions }) => {
  const { createTypes } = actions;

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
  `);
};