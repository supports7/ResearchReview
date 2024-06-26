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
import BreadcrumbComponent from "../components/breadcrumbComponent";
// import testAd from "../assets/img/Ads/AU-RR-Facebook-web-ad.jpg";

const IssueTemplate = ({
  location,
  pageContext
}) => {
  const [reviewPageURL, setReviewPageURL] = useState();

  useEffect(() => {
    console.log("pageContext", pageContext);

    // Need to adjust the tempURLPath to get the original review URL for the back button.
    let originalURL = pageContext.tempUrlPath;
    // Split the URL by "/"
    let urlParts = originalURL.split("/");
    // Remove the last two elements and join them back with "/"
    urlParts.splice(-2, 2);
    let adjustedReviewPageURL = urlParts.join("/");
    setReviewPageURL(adjustedReviewPageURL);
  }, [pageContext]);

  const bannerContent = {
    bannerImage: bannerImage,
    bannerText: pageContext.issue.issue1,
    buttonLink: pageContext.issue.pdfDownloadUrl,
    buttonText: "Download Latest Issue",
  };

  return (
    <Layout>
      <Banner bannerContent={bannerContent} />
      <Container>
        <section className="issue-page-top-section mb-5">
          <Row>
            <Col xs={12} className="pb-md-5">
              {pageContext.breadcrumbs &&
                <BreadcrumbComponent breadcrumbs={pageContext.breadcrumbs} />
              }
            </Col>
            <Col lg={8} xs={12}>
              <div className="issue-description">
                <SectionLine />
                {pageContext.issue.description &&  <p>{pageContext.issue.description}</p>}
              </div>
              <div className="articles-section">
                {pageContext.articles.length > 0 &&
                  <div>
                    <h3>In this issue</h3>
                    <SectionLine />
                    {pageContext.articles.map((article, index) => {
                      const maxTitleLength = 75; // Set your desired maximum title length

                      // Function to shorten the title if it's too long
                      // THIS IS FAILING if title is NULL
                      //  Update to check for a null value
                      const shortenTitle = (title, maxLength) => {
                        if (!title) {
                          return "";
                        }
                        if (title.length > maxLength) {
                          return title.substring(0, maxLength) + ' more...';
                        }
                        return title;
                      }

                      return (
                        <div className="article-main-div">
                          <a href={`${pageContext.tempUrlPath}${article.name}`}>
                            <div className="article-title">
                              <p>· {shortenTitle(article.title, maxTitleLength)}</p>
                            </div>
                          </a>
                        </div>
                      )
                    })}
                  </div>
                }
              </div>
              {/* <Row>
                {pageContext.articles.map((article, index) => {
                  const maxTitleLength = 75; // Set your desired maximum title length
                  
                  // Function to shorten the title if it's too long
                  // THIS IS FAILING if title is NULL
                  //  Update to check for a null value
                  const shortenTitle = (title, maxLength) => {
                    if(!title)
                    {
                      return "";
                    }
                    if (title.length > maxLength) {
                      return title.substring(0, maxLength) + ' more...';
                    }
                    return title;
                  }

                  return (
                    <Col md={4} sm={6} xs={12} key={index}>
                      <div className="promoted-content">
                        <a href={`${pageContext.tempUrlPath}${article.name}`}>
                          <div className="promoted-content-image">
                            <img
                              alt="medical practice"
                              src={randomImage(index)}
                              className="img-fluid"
                              width="400"
                              height="230"
                            />
                          </div>
                          <div className="promoted-content-content">
                            <h3>{shortenTitle(article.title, maxTitleLength)}</h3>
                            {article.authors &&
                              <p>
                                Authors: {article.authors}
                              </p>
                            }
                            <span href={`${pageContext.tempUrlPath}${article.name}`} className="btn btn-primary">Read More</span>
                          </div>
                        </a>
                      </div>
                    </Col>
                  )
                })}
              </Row> */}
            </Col>
            <Col md={4} xs={12}>
              <div className="download-section mb-5">
                <h3>Download</h3>
                <SectionLine />
                <p>Download a sample publication below</p>
                <a className="btn btn-primary" href='/sample-reviews/'>Download</a>
              </div>
              <div className="join-now-section mb-5">
                <h3>Join Now</h3>
                <SectionLine />
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque mi sem, posuere nec auctor quis, congue non diam. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae.</p>
                <a className="btn btn-primary" href='/sample-reviews/'>Join Now</a>
              </div>
              <div className="join-now-section">
                {/* <img src={testAd} className="img-fluid"/> */}
              </div>
            </Col>
          </Row>
        </section>
        {/* <DoubleAd advertisements={pageContext.advertisements} /> */}
      </Container>

      <Container fluid>
        <Row>
          {/* <FullScreenAd advertisements={pageContext.advertisements} /> */}

          <Supporters partnersMacroContent={pageContext.partnersMacroContent} />
        </Row>
      </Container>
      <Container>
        <JoinRR signUpFormContent={pageContext.signUpFormContent} />
      </Container>
    </Layout>
  )
}

export default IssueTemplate