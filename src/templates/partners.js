import React, { useEffect} from "react";
import Layout from "../components/layout";
import he from 'he';
// import { Link, graphql } from "gatsby"
import { Container, Row, Col } from "react-bootstrap"
// import Bio from "../components/bio"
// import Layout from "../components/layout"
// import Seo from "../components/seo"
import Banner from "../components/banner";
//import bannerImage from "../images/banner/national-cancer-institute-L8tWZT4CcVQ-unsplash.jpg"
import SectionLine from "../components/sectionLine"
import Supporters from "../components/supporters"
import JoinRR from "../components/joinRR"
// import RandomImages from "../components/randomImages"
// import randomImage from "../components/randomImages";

const PartnersTemplate = ({
  location,
  pageContext
}) => {

  useEffect(() => {
   // console.log("pageContext", pageContext);
  }, [pageContext]);

  const bannerContent = {
    bannerImage: pageContext.partnersContent.bannerImage,
    bannerText: pageContext.partnersContent.bannerText,
    buttonLink: pageContext.partnersContent.buttonLink,
    buttonText: pageContext.partnersContent.buttonText,
  };

  const introTextLeft = he.decode(pageContext.partnersContent.introTextLeft);
  const introTextRight = he.decode(pageContext.partnersContent.introTextRight);

  return (
    <Layout>
      <Banner bannerContent={bannerContent} />
      <Container>
        <section className="home-page-about-section">
          <Row>
            <Col xs={12}>
              <h2>Partners</h2>
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

        <section className="partners-page-partners-list pt-0">
          <Row>
            {pageContext.partnersContent.Children &&
              <div>
                <Col xs={12}>
                  <h2>All Partners</h2>
                </Col>
                <SectionLine />
              </div>
            }
            {pageContext.partnersContent.Children &&
              pageContext.partnersContent.Children.map((partner, index) => {
                return (
                  <Col key={index} xs={12}>
                    <div className="partner">
                      <Row>
                        <Col md={2} xs={12}>
                          <div>
                            <img
                              alt="research review partner"
                              src={partner.partnerLogo}
                              className="img-fluid" />
                          </div>
                        </Col>
                        <Col md={10} xs={12}>
                          <h3>{partner.partnerName}</h3>
                          <p>{partner.partnerText}</p>
                          <p>Please <a href={partner.partnerLink} target="_blank">CLICK HERE</a> to download CPD information</p>
                        </Col>
                      </Row>
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
        <JoinRR signUpFormContent={pageContext.signUpFormContent}/>
      </Container>
    </Layout>
  )
}

export default PartnersTemplate