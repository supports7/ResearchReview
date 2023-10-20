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
   // console.log("pageContext", pageContext);

    //setLoadingLogin(true);
    const encryptionKey = cookies.get("EncryptionKey")
    if (encryptionKey) {
      setLoggedIn(true);
    }
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
        <section className="home-page-about-section">
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
                {pageContext.modules.Children &&
                  <div>
                    <Col xs={12}>
                      <h2>All Modules</h2>
                    </Col>
                    <SectionLine />
                  </div>
                }
                {pageContext.modules &&
                  pageContext.modules.map((module, index) => {
                    return (
                      <Col key={index} xs={12}>
                        <div class="module">
                          <a href={module.link} target="_blank" rel="noreferrer">
                            <Row>
                              <Col md={12} xs={12}>
                                <h3>{module.moduleName}</h3>
                                <p>{module.text}</p>
                              </Col>
                            </Row>
                          </a>
                        </div>
                      </Col>
                    )
                  })
                }
              </div>
              :
              <div className="full-width-button not-logged-in">
                <div className="">
                  <a className="btn btn-secondary load-more-button" href="/join-research-review/">Register to see our summary content</a>
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
        <JoinRR signUpFormContent={pageContext.signUpFormContent}/>
      </Container>
    </Layout>
  )
}

export default ModulesTemplate