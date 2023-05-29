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
import FullScreenAd from "../components/fullScreenAd";
import DoubleAd from "../components/doubleAd";

const PodcastDetailsTemplate = ({
  location,
  pageContext
}) => {
  const [videoUrl, setVideoUrl] = useState();

  useEffect(() => {
    console.log("pageContext", pageContext);
    let tempUrl = pageContext.podcast.link;
    const newUrl = tempUrl.replace("youtu.be", "www.youtube.com/embed");
    setVideoUrl(newUrl);
  }, [pageContext]);

  const bannerContent = {
    bannerImage: bannerImage,
    bannerText: pageContext.podcast.title,
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
              <p>{pageContext.podcast.introText}</p>
            </Col>
            <SectionLine />
            <Col xs={12}>
              <div className="podcast-embedded-video">
                <iframe
                  width="100%"
                  height="100%"
                  src={videoUrl}
                  // https://www.youtube.com/embed/cZN32QazNH4
                  title={`Research Review | ${pageContext.podcast.title}`}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowfullscreen></iframe>
              </div>
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
        <JoinRR />
      </Container>
    </Layout>
  )
}

export default PodcastDetailsTemplate