import React, { useEffect, useState } from "react"
// import { Link, graphql } from "gatsby"
import { Container, Row, Col } from "react-bootstrap"
// import Bio from "../components/bio"
import Layout from "../components/layout"
// import Seo from "../components/seo"
import SectionLine from "../components/sectionLine"
import Supporters from "../components/supporters"
import DoubleAd from "../components/doubleAd"
import FullScreenAd from "../components/fullScreenAd"
import Banner from "../components/banner";
import bannerImage from "../images/banner/national-cancer-institute-L8tWZT4CcVQ-unsplash.jpg"
import logoResearchReview from "../images/logos/RRAUS leader no subs.png"

const Index = ({ pageContext }) => {

  useEffect(() => {
    console.log(pageContext);
  }, [])

  const links = [
    "Free monthly specialist updates",
    "Australian expert webinars",
    "Major international conference coverage",
    "Claim CME points"
  ];

  return (
    <Layout>
      <Banner name="An Australian Perspective On Worldwide Research" links={links} bannerImage={bannerImage} />

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
                    src={`${pageContext.featuredArticle.image}`}
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
                    {pageContext.featuredArticle.url &&
                      <a href={pageContext.featuredArticle.url} className="btn btn-secondary">
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
        {pageContext.homeContent[0].clinicalAreas &&
          <section className="home-page-connect-section">
            <Row>
              <Col xs={12}>
                <h2>CONNECT</h2>
              </Col>
              <SectionLine />
              <Col sm={4} xs={12}>
                <div className="connect-section-main-div">
                  <div className="connect-section-image-div">
                    <img
                      alt="placeholder"
                      src="https://via.placeholder.com/400x300"
                      className="img-fluid connect-image"
                    />
                  </div>
                  <div className="connect-section-content">
                    <h3>CLINICAL AREAS</h3>
                    <p className="connect-section-paragraph-text">
                      Research Review publications bring the best of 10,000 global
                      medical journals to your inbox every issue with commentary
                      from New Zealand experts.
                    </p>
                    <p className="small-green-text">
                      Clinical Areas
                    </p>
                    <ul className="connect-section-list">
                      {pageContext.homeContent[0].clinicalAreas.map((clinicalArea, index) => {
                        return (
                          <li className="connect-section-list-item" key={clinicalArea.id}>
                            <a href={`/clinical-areas/#top-level-clinical-area-${index}`}>{clinicalArea.name}</a>
                          </li>
                        )
                      })}
                    </ul>
                    <a href="/clinical-areas" className="btn btn-primary">
                      SEE ALL
                    </a>
                  </div>
                </div>
              </Col>
              <Col sm={4} xs={12}>
                <div className="connect-section-main-div">
                  <div className="connect-section-image-div">
                    <img
                      alt="placeholder"
                      src="https://via.placeholder.com/400x300"
                      className="img-fluid connect-image"
                    />
                  </div>
                  <div className="connect-section-content">
                    <h3>WATCH EXPERT WEBINARS</h3>
                    <div className="latest-videos">
                      {pageContext.homeContent[0].latestPodcasts.map((podcast) => {
                        let podcastUrlTemp = podcast.title.toLowerCase();
                        podcastUrlTemp = podcastUrlTemp.split(' ').join('-');

                        return (
                          <div className="latest-video" key={podcast.id}>
                            <a href={`/podcasts/${podcastUrlTemp}`}>
                              <h4>{podcast.title}</h4>
                              {/* <p className="small-green-text">
                                16.03.2022 / Medical / Jimmy Choo
                              </p> */}
                            </a>
                          </div>
                        )
                      })}
                    </div>
                    <a href="/podcasts" className="btn btn-primary">
                      See All
                    </a>
                  </div>
                </div>
              </Col>
              <Col sm={4} xs={12}>
                <div className="connect-section-main-div">
                  <div className="connect-section-image-div">
                    <img
                      alt="placeholder"
                      src="https://via.placeholder.com/400x300"
                      className="img-fluid connect-image"
                    />
                  </div>
                  <div className="connect-section-content">
                    <h3>SIGN UP TODAY</h3>
                    <p className="connect-section-paragraph-text">
                      Research Review publications bring the best of 10,000 global
                      medical journals to your inbox every issue with commentary
                      from New Zealand experts.
                    </p>
                    <a href="/join-research-review" className="btn btn-primary">
                      SIGN UP
                    </a>
                  </div>
                </div>
              </Col>
            </Row>
          </section>
        }
        <DoubleAd advertisements={pageContext.advertisements} />

        <section className="home-page-about-section">
          <Row>
            <Col xs={12}>
              <h2>About</h2>
            </Col>
            <SectionLine />

            <Col md={8} sm={6} xs={12}>
              <div className="about-section-left">
                <p className="featured-paragraph-text">
                  Research Review Australia
                  <br />
                  Research Review publications bring the best of 10,000 worldwide medical journals to your inbox every issue with commentary from Australian experts. Over 50 areas including Cardiology, Diabetes, Oncology, General Practice and Psychiatry. Specialist opinions on guidelines, medicines and conferences. All Research Review publications are free to receive.
                  <br />
                  Research Review makes keeping up to date easy whether you're a Physician, Surgeon, General Practitioner or Nurse. 50 regular subject specific reviews, over 50 international medical conferences every year and advice from over 200 Australian medical specialists.
                </p>
                <a href="/contact" className="btn btn-secondary">
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
                  Phone number: 1300 132 322 
                  <br />
                  Email: admin@researchreview.com.au
                </p>
              </div>
            </Col>
          </Row>
        </section>
      </Container>

      <Container fluid>
        <Row>
          <FullScreenAd advertisements={pageContext.advertisements} />
          <Supporters />
        </Row>
      </Container>
      <Container>
        <section className="join-research-review-form-section">
          <Row>
            <Col xs={12}>
              <h2>JOIN RESEARCH REVIEW</h2>
            </Col>
            <SectionLine />
            <Col md={8} sm={6} xs={12}>
              <form className="join-rr-form">
                <Row>
                  <Col md={6} xs={12}>
                    <input type="text" placeholder="First Name"></input>
                  </Col>
                  <Col md={6} xs={12}>
                    <input type="text" placeholder="Last Name"></input>
                  </Col>
                  <Col xs={12}>
                    <input type="email" placeholder="Email"></input>
                  </Col>
                  <Col xs={12}>
                    <input type="text" placeholder="Profession"></input>
                  </Col>
                  <button type="submit" className="btn btn-primary">SUMBIT</button>
                </Row>
              </form>
            </Col>
            <Col md={4} sm={6} xs={12} className="jrr-cta-main-div">
              <div className="jrr-cta-logo">
                <img
                  alt="research review logo"
                  src={logoResearchReview}
                  className="img-fluid"
                />
              </div>
            </Col>
          </Row>
        </section>
      </Container>
    </Layout>
  )
}

export default Index
