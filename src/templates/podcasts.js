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

const PodcastTemplate = ({
  location,
  pageContext
}) => {

  useEffect(() => {
    console.log("pageContext", pageContext);
  }, [pageContext]);

  return (
    <Layout>
      <Banner name={pageContext.review.name} bannerImage={bannerImage}/>
      <Container>
        <section className="home-page-connect-section">
          <Row>
            <Col xs={12}>
              <h2>Podcasts</h2>
            </Col>
            <SectionLine />
            <Col xs={12}>
              <Row>
                {pageContext.podcasts.map((podcast, index) => {
                  let podcastUrlTemp = podcast.title.toLowerCase();
                  podcastUrlTemp = podcastUrlTemp.split(' ').join('-');
                  
                  return (
                    <Col md={4} sm={6} xs={12} key={index}>
                      <div className="promoted-content">
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
                          <p>{podcast.introText}</p>
                          <a href={`${pageContext.tempUrlPath}${podcastUrlTemp}`} className="btn btn-primary">
                            Watch
                          </a>
                        </div>
                      </div>
                    </Col>
                  )
                })}
              </Row>
            </Col>
          </Row>
        </section>
        <DoubleAd advertisements={pageContext.advertisements} />
      </Container>

      <Container fluid>
        <Row>
          <FullScreenAd advertisements={pageContext.advertisements} />

          <Supporters />
        </Row>
      </Container>
      <Container>
        <JoinRR />
      </Container>
    </Layout>
  )
}

export default PodcastTemplate