import React, { useEffect, useState } from "react";
import Layout from "../components/layout";
// import { Link, graphql } from "gatsby"
import { Container, Row, Col } from "react-bootstrap"
// import Bio from "../components/bio"
// import Layout from "../components/layout"
// import Seo from "../components/seo"
import Banner from "../components/banner";
import bannerImage from "../images/banner/national-cancer-institute-L8tWZT4CcVQ-unsplash.jpg"
import SectionLine from "../components/sectionLine"
import Supporters from "../components/supporters"
import JoinRR from "../components/joinRR"
// import RandomImages from "../components/randomImages"
import randomImage from "../components/randomImages";
import FullScreenAd from "../components/fullScreenAd";
import DoubleAd from "../components/doubleAd";

const ReviewTemplate = ({
  location,
  pageContext
}) => {
  const [issuesShownOnScreen, setIssuesShownOnScreen] = useState([]);
  const [currentNumberOfIssuesShowing, setCurrentNumberOfIssuesShowing] = useState(0);
  const [hideShowMoreButton, setHideShowMoreButton] = useState(false);

  useEffect(() => {
    console.log("pageContext", pageContext);
    if (pageContext.issues) {
      showMoreIssues();
    }
  }, [pageContext]);

  const showMoreIssues = () => {
    console.log(currentNumberOfIssuesShowing, issuesShownOnScreen);
    let numberOfIssuesToShow = currentNumberOfIssuesShowing + 3;
    setCurrentNumberOfIssuesShowing(numberOfIssuesToShow);
    let tempIssuesArray = pageContext.issues.slice(0, numberOfIssuesToShow);
    setIssuesShownOnScreen(tempIssuesArray);
    if (pageContext.issues.length <= numberOfIssuesToShow) {
      setHideShowMoreButton(true);
    }
  }

  return (
    <Layout>
      <Banner name={pageContext.review.name} bannerImage={bannerImage} />
      <Container>
        <section className="home-page-connect-section">
          <Row>
            <Col xs={12}>
              <h2>Issues</h2>
            </Col>
            <SectionLine />

            <Col xs={12}>
              <Row>
                {issuesShownOnScreen.map((issue, index) => {
                  let reviewUrlTemp = pageContext.review.url
                  return (
                    <Col md={4} sm={6} xs={12} key={index}>
                      <div className="promoted-content">
                        <a href={`/clinical-areas/${reviewUrlTemp}/${issue.name}`}>
                          <div className="promoted-content-image">
                            <img
                              alt="research review image showing a medical practice"
                              src={randomImage(index)}
                              className="img-fluid"
                              width="400"
                              height="250"
                            />
                          </div>
                          <div className="promoted-content-content">
                            <h3>{issue.name}</h3>
                            {issue.issue_No &&
                              <p>
                                Issue No: {issue.issue_No}
                              </p>
                            }
                            <span className="btn btn-primary" href={`/clinical-areas/${reviewUrlTemp}/${issue.name}`}>Read More</span>
                          </div>
                        </a>
                      </div>
                    </Col>
                  )
                })}
                {!hideShowMoreButton &&
                  <Col xs={12}>
                    <div className="full-width-button">
                      <a onClick={showMoreIssues} className="btn btn-secondary load-more-button">LOAD MORE</a>
                    </div>
                  </Col>
                }
              </Row>
            </Col>
          </Row>
        </section>

        <DoubleAd advertisements={pageContext.advertisements} />
      </Container>

      <Container fluid>
        <Row>
          <FullScreenAd advertisements={pageContext.advertisements} />

          {pageContext.podcasts &&
            <section className="home-page-connect-section">
              <Container>
                <Row>
                  <Col xs={12}>
                    <h2>Podcasts</h2>
                  </Col>
                  <SectionLine />
                  <Col xs={12}>
                    <Row>
                      {pageContext.podcasts.map((podcast, index) => {
                        let reviewUrlTemp = pageContext.review.url

                        let podcastUrlTemp = podcast.title.toLowerCase();
                        podcastUrlTemp = podcastUrlTemp.split(' ').join('-');

                        return (

                          <Col md={4} sm={6} xs={12} key={index}>
                            <div className="promoted-content">
                              <a href={`/podcasts/${reviewUrlTemp}/${podcastUrlTemp}`}>
                                <div className="promoted-content-image">
                                  <img
                                    alt="research review image showing a medical practice"
                                    src={randomImage(index)}
                                    className="img-fluid"
                                    width="400"
                                    height="230"
                                  />
                                </div>
                                <div className="promoted-content-content">
                                  <h3>{podcast.title}</h3>
                                  <p>
                                    {podcast.introText}
                                  </p>
                                  <span className="btn btn-primary" href={`/podcasts/${reviewUrlTemp}/${podcastUrlTemp}`}>Watch</span>
                                </div>
                              </a>
                            </div>
                          </Col>
                        )
                      })}

                    </Row>
                  </Col>
                </Row>
              </Container>
            </section>
          }

          <Supporters />
        </Row>
      </Container>
      <Container>
        <JoinRR />
      </Container>
    </Layout>
  )
}

// export const Head = ({ data: { markdownRemark: post } }) => {
//   return (
//     <Seo
//       title={post.frontmatter.title}
//       description={post.frontmatter.description || post.excerpt}
//     />
//   )
// }

export default ReviewTemplate

// export const pageQuery = graphql`
//   query allRestApiApiReviews($filter: {clinical_Area_Id: {eq: "$endpointId"}}) {
//     nodes {
//       endpointId
//       name
//       clinical_Area_Id
//       modified_Time
//     }
//   }
// `
