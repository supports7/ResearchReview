import React, { useEffect, useState } from "react";
import Layout from "../components/layout"
import { Row, Col, Container } from "react-bootstrap"
import SectionLine from "../components/sectionLine"
import JoinRR from "../components/joinRR"
import Supporters from "../components/supporters"
import DoubleAd from "../components/doubleAd"
import Banner from "../components/banner"
import bannerImage from "../images/banner/national-cancer-institute-L8tWZT4CcVQ-unsplash.jpg"

const LinksTemplate = ({ pageContext, location }) => {
  const siteTitle = `${pageContext.review.name}`

  const bannerContent = {
    bannerImage: bannerImage,
    bannerText: pageContext.review.name + " Links",
    buttonLink: "",
    buttonText: "",
  };


  return (
    <Layout location={location} title={siteTitle}>
      <Banner bannerContent={bannerContent} />
      <Container>
        <section className="section-top-content">
          <Row>
            <Col xs={12}>
              <h2>{pageContext.review.name}</h2>
              <SectionLine />
              <div className="list-links">
                {pageContext.links.map((link,index) => (
                  <Col xs={12} key={link.id}>
                    <a target="_blank" href={link.url}><h4>{link.title} {">"}</h4></a>
                  </Col>
                ))}
              </div>
            </Col>
            {/* <Col lg={4} xs={12}>
              <div className="section-ad-image">
                <img
                  alt="placeholder"
                  src="https://via.placeholder.com/400x300"
                  className="img-fluid" />
              </div>
            </Col> */}
          </Row>
        </section>

        <DoubleAd advertisements={pageContext.advertisements} />
      </Container>

      <section>
        <Container fluid>
          <Supporters partnersMacroContent={pageContext.partnersMacroContent} />
        </Container>
      </section>

      <Container>
        <JoinRR />
      </Container>
    </Layout>
  )
}

export default LinksTemplate