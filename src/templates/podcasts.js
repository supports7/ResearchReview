import React, { useEffect, useState } from "react";
import Layout from "../components/layout";
import {orderBy} from 'lodash';
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
  const [sortedPodcasts, setSortedPodcasts] = useState();

  useEffect(() => {
    console.log("pageContext", pageContext);
    if(pageContext.podcasts) {
      const tempSortedPodcast = orderBy(pageContext.podcasts, ['LastModified'], ['desc']);
      setSortedPodcasts(tempSortedPodcast);
    }
  }, [pageContext]);


  const bannerContent = {
    bannerImage: bannerImage,
    bannerText: pageContext.podcasts.name,
    buttonLink: "",
    buttonText: "",
  };

  return (
    <Layout>
      <Banner bannerContent={bannerContent} />
      <Container>
        <section className="home-page-connect-section">
          <Row>
            <Col xs={12}>
              <h2>Podcasts</h2>
            </Col>
            <SectionLine />
            <Col xs={12}>
              <Row>
                {sortedPodcasts && sortedPodcasts.map((podcast, index) => {
                  let podcastUrlTemp = podcast.title.toLowerCase();
                  podcastUrlTemp = podcastUrlTemp.split(' ').join('-');

                  return (
                    <Col md={4} sm={6} xs={12} key={index}>
                      <div className="promoted-content">
                        <a href={`${pageContext.tempUrlPath}${podcastUrlTemp}`}>
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
                            <h3>{podcast.title}</h3>
                            <span className="btn btn-primary">View Podcast</span>
                          </div>
                        </a>
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

          <Supporters partnersMacroContent={pageContext.partnersMacroContent} />
        </Row>
      </Container>
      <Container>
        <JoinRR signUpFormContent={pageContext.signUpFormContent}/>
      </Container>
    </Layout>
  )
}

export default PodcastTemplate