import React, { useEffect, useState } from "react";
import Layout from "../components/layout";
//import he from 'he';
// import { Link, graphql } from "gatsby";
import { Container, Row, Col } from "react-bootstrap";
// import Bio from "../components/bio";
// import Layout from "../components/layout";
// import Seo from "../components/seo";
import Banner from "../components/banner";
import bannerImage from "../images/banner/national-cancer-institute-L8tWZT4CcVQ-unsplash.jpg";
import SectionLine from "../components/sectionLine";
import Supporters from "../components/supporters";
import JoinRR from "../components/joinRR";
// import RandomImages from "../components/randomImages"
// import randomImage from "../components/randomImages";
import Cookies from "universal-cookie";

const ModulesTemplate = ({
  location,
  pageContext
}) => {
  const cookies = new Cookies()
  const [loggedIn, setLoggedIn] = useState(false);
  //const [loadingLogin, setLoadingLogin] = useState(true);

  useEffect(() => {
    console.log("pageContext", pageContext);

    //setLoadingLogin(true);
    const encryptionKey = cookies.get("EncryptionKey")
    if (encryptionKey) {
    }
    setLoggedIn(true);
    // setLoadingLogin(false);
  }, []);

  const bannerContent = {
    bannerImage: bannerImage,
    bannerText: pageContext.review.name + " Modules",
    buttonLink: "",
    buttonText: "",
  };

  return (
    <Layout>
      <Banner bannerContent={bannerContent} />
      <Container>
        <section className="home-page-about-section pb-0">
          <Row>
            <Col xs={12}>
              <h2>Modules</h2>
            </Col>
            <SectionLine />
          </Row>
        </section>

        <section className="modules-page-modules-list pt-0">
          <Row>
            {loggedIn ?
              <div>
                {pageContext.modules && pageContext.modules.length > 0 &&
                  <div>
                    {pageContext.modules.map((module, index) => {
                      return (
                        <Col key={index} xs={12}>
                          <div className="module">
                            <a href={module.pdfDownloadUr} target="_blank" rel="noreferrer">
                              <Row>
                                <Col md={12} xs={12}>
                                  <h3>{module.issue1}</h3>
                                  <p>{module.description}</p>
                                </Col>
                              </Row>
                            </a>
                          </div>
                        </Col>
                      )
                    })}
                  </div>
                }
              </div>
              :
              <div className="full-width-button not-logged-in">
                <div className="">
                  <p className="btn btn-secondary load-more-button"><a href="#navbar">Login</a> or <a href="/join-research-review/">Register</a> to see modules</p>
                </div>
              </div>
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
        <JoinRR signUpFormContent={pageContext.signUpFormContent} />
      </Container>
    </Layout>
  )
}

export default ModulesTemplate