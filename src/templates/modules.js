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
// import randomImage from "../components/randomImages";

const ModulesTemplate = ({
  location,
  pageContext
}) => {

  useEffect(() => {
    console.log("pageContext", pageContext);
  }, [pageContext]);

  return (
    <Layout>
      <Banner name="Modules" bannerImage={bannerImage} />
      <Container>
        <section className="home-page-about-section">
          <Row>
            <Col xs={12}>
              <h2>Modules</h2>
            </Col>
            <SectionLine />

            <Col md={8} sm={6} xs={12}>
              <div className="about-section-left">
                <p className="featured-paragraph-text">
                  Research Review publications bring the best of 10,000 global
                  medical journals to your inbox every issue with commentary
                  from New Zealand experts. Over 50 areas including Cardiology,
                  Diabetes, Oncology, General Practice and Psychiatry.
                  Specialist opinions on guidlines, medicines and conferences.
                  All Research Review publications are free to receive.
                </p>
                <a href="/" className="btn btn-secondary">
                  READ MORE
                </a>
              </div>
            </Col>
            <Col md={4} sm={6} xs={12}>
              <div className="about-section-right">
                <p className="featured-paragraph-text">
                  Research Review publications bring the best of 10,000 global
                  medical journals to your inbox every issue with commentary
                  from New Zealand experts.
                </p>
                <p>
                  Phone number
                  <br />
                  Email address
                  <br />
                  Website link
                </p>
                <p>
                  Full physical address
                  <br />
                  for Research Review
                  <br />
                  AKL 2022
                </p>
              </div>
            </Col>
          </Row>
        </section>

        <section className="modules-page-modules-list pt-0">
          <Row>
            {pageContext.modules &&
              <div>
                <Col xs={12}>
                  <h2>All Modules</h2>
                </Col>
                <SectionLine />
              </div>
            }
            {pageContext.modules &&
              pageContext.modules.map((module, index) => {
                return (
                  <Col key={index} xs={12}>
                    <div class="module">
                      <a href={module.link}>
                        <Row>
                          <Col md={12} xs={12}>
                            <h3>{module.name}</h3>
                            <p>{module.introText}</p>
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
          <Supporters />
        </Row>
      </Container>
      <Container>
        <JoinRR />
      </Container>
    </Layout>
  )
}

export default ModulesTemplate