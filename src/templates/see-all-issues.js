import React, { useEffect, useState } from "react";
import Layout from "../components/layout";
import { Container, Row, Col } from "react-bootstrap"
import Banner from "../components/banner";
import bannerImage from "../images/banner/national-cancer-institute-L8tWZT4CcVQ-unsplash.jpg"
import SectionLine from "../components/sectionLine"
import Supporters from "../components/supporters"
import JoinRR from "../components/joinRR"
import BreadcrumbComponent from "../components/breadcrumbComponent";
// import testAd from "../assets/img/Ads/AU-RR-Facebook-web-ad.jpg";

const SeeAllIssuesTemplate = ({
  location,
  pageContext
}) => {
  useEffect(() => {
    console.log("pageContext", pageContext);
  }, [pageContext]);

  const bannerContent = {
    bannerImage: bannerImage,
    bannerText: pageContext.title,
    buttonLink: "",
    buttonText: "",
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
              <div className="articles-section">
                {pageContext.issues.length > 0 &&
                  <div>
                    <h3>{pageContext.title}</h3>
                    <SectionLine />
                    {pageContext.issues.map((issue, index) => {
                      return (
                        <div key={index} className="article-main-div">
                          <a href={`${pageContext.issueUrl}${issue.name}`}>
                            <div className="article-title">
                              <p>· {issue.issue1}</p>
                            </div>
                          </a>
                        </div>
                      )
                    })}
                  </div>
                }
              </div>

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
      </Container>

      <Container fluid>
        <Row>
          <Supporters partnersMacroContent={pageContext.partnersMacroContent} />
        </Row>
      </Container>
      <Container>
        <JoinRR signUpFormContent={pageContext.signUpFormContent} />
      </Container>
    </Layout>
  )
}

export default SeeAllIssuesTemplate