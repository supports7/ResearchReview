import React, { useEffect, useState } from "react"
// import { Link, graphql } from "gatsby"
import { Container, Row, Col } from "react-bootstrap"
import { filter } from 'lodash'
import he from 'he';
// import Bio from "../components/bio"
import Layout from "../components/layout"
// import Seo from "../components/seo"
import SectionLine from "../components/sectionLine"
import Supporters from "../components/supporters"
import DoubleAd from "../components/doubleAd"
import JoinRR from "../components/joinRR"
import FullScreenAd from "../components/fullScreenAd"
import Banner from "../components/banner";
import bannerImage from "../images/banner/national-cancer-institute-L8tWZT4CcVQ-unsplash.jpg"
import logoResearchReview from "../images/logos/RRAUS leader no subs.png"
import Home1 from "../assets/img/Home/Home1.jpg";
import Home2 from "../assets/img/Home/Home2.jpg";
import Home3 from "../assets/img/Home/Home3.jpg";

const Index = ({ pageContext }) => {
  const [homeBannerLinks, setHomeBannerLinks] = useState([])
  const [expertWebinars, setExpertWebinars] = useState([])
  useEffect(() => {
    console.log(pageContext);
    if(pageContext.homeContent.Children){
      const homeBannerLinksFromHomeContent = filter(pageContext.homeContent.Children, { "DocType": "homeBannerLink" });
      const expertWebinarsFromHomeContent = filter(pageContext.homeContent.Children, { "DocType": "homeExpertWebinars" });
      setHomeBannerLinks(homeBannerLinksFromHomeContent)
      setExpertWebinars(expertWebinarsFromHomeContent)
    }
  }, [])

  const bannerContent = {
    bannerImage: pageContext.homeContent.bannerImage,
    bannerText: pageContext.homeContent.bannerText,
    buttonLink: pageContext.homeContent.buttonLink,
    buttonText: pageContext.homeContent.buttonText,
    isHome:true,
    bannerHeight:"600px",
    homeBannerLinks: homeBannerLinks,
  };

  const clinicalAreasText = he.decode(pageContext.homeContent.clinicalAreasText);
  const signUpText = he.decode(pageContext.homeContent.signUpText);
  const aboutTextLeftSide = he.decode(pageContext.homeContent.aboutTextLeftSide);
  const aboutTextRightSide = he.decode(pageContext.homeContent.aboutTextRightSide);

  return (
    <Layout>
      <Banner bannerContent={bannerContent} />
      {/* <Banner name={pageContext.homeContent.bannerHeading} links={links} bannerImage={bannerImage} /> */}

      <Container>
        {pageContext.featuredArticle &&
          <section className="home-page-featured-section">
            <Row>
              <Col md={8} sm={6} xs={12}>
                <div className="featured-section-image">
                  <div className="featured-image-corner-triangle">
                    <p className="featured-image-corner-text text-uppercase">
                      FEATURED
                    </p>
                  </div>
                  <img
                    alt="placeholder"
                    src={`${pageContext.featuredArticle.featuredArticleImage}`}
                    className="img-fluid featured-image"
                  />
                </div>
              </Col>
              <Col md={4} sm={6} xs={12}>
                <div className="featured-section-content">
                  <SectionLine />
                  <div>
                    <h2>
                      {pageContext.featuredArticle.title}
                    </h2>
                    <p className="small-green-text">{pageContext.featuredArticle.subtitle}</p>
                    <p className="featured-paragraph-text">
                      {pageContext.featuredArticle.text}
                    </p>
                    {pageContext.featuredArticle.link &&
                      <a href={pageContext.featuredArticle.link} className="btn btn-secondary">
                        READ MORE
                      </a>
                    }
                    <a href="/join-research-review" className="btn btn-primary">
                      SIGN UP
                    </a>
                  </div>
                </div>
              </Col>
            </Row>
          </section>
        }

        <section className="home-page-connect-section">
          <Row>
            <Col xs={12}>
              <h2>CONNECT</h2>
            </Col>
            <SectionLine />
            <Col lg={4} xs={12}>
              <div className="connect-section-main-div">
                <div className="connect-section-image-div">
                  <img
                    alt="placeholder"
                    src={Home1}
                    className="img-fluid connect-image"
                  />
                </div>
                <div className="connect-section-content">
                  <div dangerouslySetInnerHTML={{ __html: clinicalAreasText }} />
                  <a href="/clinical-areas" className="btn btn-primary">
                    SEE ALL
                  </a>
                </div>
              </div>
            </Col>
            <Col lg={4} xs={12}>
              <div className="connect-section-main-div">
                <div className="connect-section-image-div">
                  <img
                    alt="Home2"
                    src={Home2}
                    className="img-fluid connect-image"
                  />
                </div>
                <div className="connect-section-content">
                  <h3>{pageContext.homeContent.expertWebinarsTitle}</h3>
                  <div className="latest-videos">
                    {expertWebinars && expertWebinars.map((podcast) => {
                      return (
                        <div className="latest-video" key={podcast.Node}>
                          <a href={`${podcast.link}`}>
                            <p>{podcast.title}</p>
                          </a>
                        </div>
                      )
                    })}
                  </div>
                  <a href="/watch" className="btn btn-primary">
                    See All
                  </a>
                </div>
              </div>
            </Col>
            <Col lg={4} xs={12}>
              <div className="connect-section-main-div">
                <div className="connect-section-image-div">
                  <img
                    alt="placeholder"
                    src={Home3}
                    className="img-fluid connect-image"
                  />
                </div>
                <div className="connect-section-content">
                  <div dangerouslySetInnerHTML={{ __html: signUpText }} />
                  <a href="/join-research-review" className="btn btn-primary">
                    SIGN UP
                  </a>
                </div>
              </div>
            </Col>
          </Row>
        </section>

        <DoubleAd advertisements={pageContext.advertisements} />

        <section className="home-page-about-section">
          <Row>
            <Col xs={12}>
              <h2>About</h2>
            </Col>
            <SectionLine />
            <Col md={8} sm={6} xs={12}>
              <div className="about-section-left">
                <div dangerouslySetInnerHTML={{ __html: aboutTextLeftSide }} />
              </div>
              {/* <a href="/contact-us" className="btn btn-secondary">
                  READ MORE
                </a> */}
            </Col>
            <Col md={4} sm={6} xs={12}>
              <div className="about-section-right">
                <div dangerouslySetInnerHTML={{ __html: aboutTextRightSide }} />
              </div>
            </Col>
          </Row>
        </section>
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

export default Index
