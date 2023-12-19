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
  const [videoUrl, setVideoUrl] = useState("");

  useEffect(() => {
   console.log("pageContext", pageContext);
   if(pageContext.podcast.externalLink) {
     let tempUrl = pageContext.podcast.externalLink;
     let newUrl = tempUrl;
     if (tempUrl.includes("youtu.be")) {
       newUrl = tempUrl.replace("youtu.be", "www.youtube.com/embed");
      }
      if (tempUrl.includes("youtube.com/watch")) {
        newUrl = tempUrl.replace("youtube.com/watch", "youtube.com/embed/watch");
      }
      setVideoUrl(newUrl);
    }
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
      <Container >
        <section className="home-page-connect-section">
          <Row>
            <Col xs={12}>
              <div className="issue-description">
                <SectionLine />
                {pageContext.podcast.description &&  <p>{pageContext.podcast.description}</p>}
              </div>
            </Col>
          </Row>
        </section>
      </Container>
      <Container>
        <section>
          <Row>
          <Col xs={2} style={{textAlign:'center'}}>
              {/* {pageContext.advertisements && pageContext.advertisements.length > 0 &&
                <a href={pageContext.advertisements[0].link} target="_blank" >

                  <img
                    alt={pageContext.advertisements[0].Node}
                    src={pageContext.advertisements[0].image}
                    className="img-fluid featured-image"
                  />
                </a>
              } */}
            </Col>
            <Col xs={8}>
              <div className="podcast-embedded-video">
                <iframe
                  width="100%"
                  height="100%"
                  src={videoUrl}
                  title={`Research Review | ${pageContext.podcast.title}`}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen></iframe>
              </div>
            </Col>
            <Col xs={2} style={{textAlign:'center'}}>
              {/* {pageContext.advertisements && pageContext.advertisements.length > 1 &&
                <a href={pageContext.advertisements[1].link} target="_blank" >

                  <img
                    alt={pageContext.advertisements[1].Node}
                    src={pageContext.advertisements[1].image}
                    className="img-fluid featured-image"

                  />
                </a>
              } */}
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
        <JoinRR signUpFormContent={pageContext.signUpFormContent}/>
      </Container>
    </Layout>
  )
}

export default PodcastDetailsTemplate