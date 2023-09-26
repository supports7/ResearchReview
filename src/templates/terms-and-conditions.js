import React, { useEffect, useState } from "react";
import Layout from "../components/layout"
import { Row, Col, Container } from "react-bootstrap"
import JoinRR from "../components/joinRR"
import Supporters from "../components/supporters"
import DoubleAd from "../components/doubleAd"
import Banner from "../components/banner"
import he from 'he';

const TermsAndConditionsTemplate = ({ pageContext, location }) => {
  const siteTitle = `Terms And Conditions`

  const bannerContent = {
    bannerImage: pageContext.content.bannerImage,
    bannerText: pageContext.content.bannerText,
    buttonLink: pageContext.content.buttonLink,
    buttonText: pageContext.content.buttonText,
  };
  const fullText = he.decode(pageContext.content.text);

  return (
    <Layout location={location} title={siteTitle}>
      <Banner bannerContent={bannerContent} />
      <Container>
        <section className="section-top-content">
          <Row>
            <Col xs={12}>
                <div dangerouslySetInnerHTML={{ __html: fullText }} />
            </Col>
          </Row>
        </section>

        <DoubleAd advertisements={pageContext.advertisements} />
      </Container>

      <section>
        <Container fluid>
          <Supporters partnersMacroContent={pageContext.partnersMacroContent} />
        </Container>
      </section>
    </Layout>
  )
}

export default TermsAndConditionsTemplate