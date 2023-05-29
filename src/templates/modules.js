import React, { useEffect, useState } from "react";
import Layout from "../components/layout";
import he from 'he';
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
// import randomImage from "../components/randomImages";

const ModulesTemplate = ({
  location,
  pageContext
}) => {

  useEffect(() => {
    console.log("pageContext", pageContext);
  }, [pageContext]);

  const bannerContent = {
    bannerImage: pageContext.modulesContent.bannerImage,
    bannerText: pageContext.modulesContent.bannerText,
    buttonLink: pageContext.modulesContent.buttonLink,
    buttonText: pageContext.modulesContent.buttonText,
  };

  const introTextLeft = he.decode(pageContext.modulesContent.introTextLeft);
  const introTextRight = he.decode(pageContext.modulesContent.introTextRight);

  return (
    <Layout>
      <Banner bannerContent={bannerContent} />
      <Container>
        <section className="home-page-about-section">
          <Row>
            <Col xs={12}>
              <h2>Modules</h2>
            </Col>
            <SectionLine />

            <Col md={8} sm={6} xs={12}>
              <div className="about-section-left">
                <div dangerouslySetInnerHTML={{ __html: introTextLeft }} />
              </div>
            </Col>
            <Col md={4} sm={6} xs={12}>
              <div className="about-section-right">
                <div dangerouslySetInnerHTML={{ __html: introTextRight }} />
              </div>
            </Col>
          </Row>
        </section>

        <section className="modules-page-modules-list pt-0">
          <Row>
            {pageContext.modulesContent.Children &&
              <div>
                <Col xs={12}>
                  <h2>All Modules</h2>
                </Col>
                <SectionLine />
              </div>
            }
            {pageContext.modulesContent.Children &&
              pageContext.modulesContent.Children.map((module, index) => {
                return (
                  <Col key={index} xs={12}>
                    <div class="module">
                      <a href={module.link} target="_blank">
                        <Row>
                          <Col md={12} xs={12}>
                            <h3>{module.moduleName}</h3>
                            <p>{module.text}</p>
                          </Col>
                        </Row>
                      </a>
                    </div>
                  </Col>
                )
              })
            }
          </Row>
        </section>
      </Container>

      <Container fluid>
        <Row>
          <Supporters partnersMacroContent={pageContext.partnersMacroContent} />
        </Row>
      </Container>
      <Container>
        <JoinRR />
      </Container>
    </Layout>
  )
}

export default ModulesTemplate