import React, { useEffect, useState } from "react";
// // import { Link } from "gatsby";
import Layout from "../components/layout"
import { Row, Col, Container } from "react-bootstrap"
import SectionLine from "../components/sectionLine"
import JoinRR from "../components/joinRR"
import Supporters from "../components/supporters"
import DoubleAd from "../components/doubleAd"
import Banner from "../components/banner"
import bannerImage from "../images/banner/national-cancer-institute-L8tWZT4CcVQ-unsplash.jpg"
import parse from 'html-react-parser'
import Cookies from "universal-cookie"
import decrypt from "../utilities/decrypt"
import BreadcrumbComponent from "../components/breadcrumbComponent";

const ArticleTemplate = ({ pageContext, location }) => {
  const [decryptedComment, setDecryptedComment] = useState("");
  const cookies = new Cookies();
  const siteTitle = `${pageContext.article.title}`

  useEffect(() => {
    console.log("pageContext", pageContext)
    const encryptionKey = cookies.get('EncryptionKey');

    if (encryptionKey) {
      // Decrypt
      const tempDecryptedComment = decrypt(pageContext.article.comment, encryptionKey);
      const sanitizedHTML = tempDecryptedComment.replace(/\n/g, '<br>');
      setDecryptedComment(sanitizedHTML);
      // Show that section
      // Hide register button
    }
  }, [pageContext, cookies])

  const bannerContent = {
    bannerImage: bannerImage,
    bannerText: pageContext.article.title,
    buttonLink: "",
    buttonText: "",
  };

  return (
    <Layout location={location} title={siteTitle}>
      <div className="article-banner">
        <Banner bannerContent={bannerContent} />
      </div>
      <Container>
        <section className="article-page-top-section">
          <Row>
            <Col xs={12}>
              {pageContext.breadcrumbs &&
                <BreadcrumbComponent breadcrumbs={pageContext.breadcrumbs} />
              }
            </Col>
            <Col lg={4} xs={12}>
              {pageContext.otherArticles && pageContext.otherArticles.length > 0 &&
                <div className="other-articles">
                  <h3>In This Issue</h3>
                  <SectionLine />
                  {pageContext.otherArticles.map((article, index) => {
                    if (article.id != pageContext.article.id) {

                      return (
                        <p className="other-article" key={index}>
                          <a href={`${pageContext.tempUrlPath}${article.name}`}>{article.title}</a>
                        </p>
                      )
                    }
                  })}
                </div>
              }
              {/* <div className="abbreviations-section">
                <h3>Abbreviations</h3>
                <SectionLine />
                <p><strong>ABC</strong> Auckland Business Council</p>
                <p><strong>ABC</strong> Auckland Business Council</p>
                <p><strong>ABC</strong> Auckland Business Council</p>
                <p><strong>ABC</strong> Auckland Business Council</p>
                <p><strong>ABC</strong> Auckland Business Council</p>
                <p><strong>ABC</strong> Auckland Business Council</p>
                <p><strong>ABC</strong> Auckland Business Council</p>
                <p><strong>ABC</strong> Auckland Business Council</p>
              </div> */}
            </Col>
            <Col lg={8} xs={12}>
              <SectionLine />
              <h3>{pageContext.article.longTitle}</h3>
              {pageContext.article.authors &&
                <div className="article-summary">
                  <strong className="bold">Author: </strong>{pageContext.article.authors}
                </div>
              }
              {pageContext.article.summary2 &&
                <div className="article-summary">
                  <strong className="bold">Summary: </strong>{pageContext.article.summary2.includes(">") ? parse(pageContext.article.summary2) : pageContext.article.summary2}
                </div>
              }
              {decryptedComment ?
                <div>
                  <div className="encrypted-panel">
                    <strong className="bold">Comment: </strong><div className="encrypted-data">{decryptedComment && <div dangerouslySetInnerHTML={{ __html: decryptedComment }} ></div>}</div>
                  </div>
                  {pageContext.article.reference &&
                    <div className="encrypted-panel">
                      <strong className="bold">Reference: </strong> {pageContext.article.reference}
                    </div>
                  }
                  {pageContext.article.abstract &&
                    <div className="encrypted-panel">
                      <strong className="bold">Abstract: </strong> {pageContext.article.abstract}
                    </div>
                  }
                </div>
                :
                <div className="full-width-button not-logged-in">
                  <div className="">
                    <p className="btn btn-secondary load-more-button"><a href="#navbar">Login</a> or <a href="/join-research-review/">Register</a> to see our summary content</p>
                  </div>
                </div>
              }
            </Col>

            <Col xs={12}>

            </Col>
          </Row>
        </section>

        {/* <DoubleAd advertisements={pageContext.advertisements} /> */}

        {/* <section className="section-list-area-selection">
          <Row>
            <h2>Related Articles</h2>
            <SectionLine />
            <Col md={4} xs={12}>
              <div className="connect-section-main-div">
                <div className="connect-section-image-div">
                  <img
                    alt="placeholder"
                    src="https://via.placeholder.com/400x300"
                    className="img-fluid connect-image"
                  />
                </div>
                <div className="connect-section-content">
                  <h3>Treatment Failure In Endodontics</h3>
                  <p className="connect-section-paragraph-text">
                    Research Review publications bring the best of 10,000 global
                    medical journals to your inbox every issue with commentary
                    from New Zealand experts.
                  </p>
                  <a href="/" className="btn btn-primary">
                    Read More
                  </a>
                </div>
              </div>
            </Col>
            <Col md={4} xs={12}>
              <div className="connect-section-main-div">
                <div className="connect-section-image-div">
                  <img
                    alt="placeholder"
                    src="https://via.placeholder.com/400x300"
                    className="img-fluid connect-image"
                  />
                </div>
                <div className="connect-section-content">
                  <h3>Treatment Failure In Endodontics</h3>
                  <p className="connect-section-paragraph-text">
                    Research Review publications bring the best of 10,000 global
                    medical journals to your inbox every issue with commentary
                    from New Zealand experts.
                  </p>
                  <a href="/" className="btn btn-primary">
                    Read More
                  </a>
                </div>
              </div>
            </Col>
            <Col md={4} xs={12}>
              <div className="connect-section-main-div">
                <div className="connect-section-image-div">
                  <img
                    alt="placeholder"
                    src="https://via.placeholder.com/400x300"
                    className="img-fluid connect-image"
                  />
                </div>
                <div className="connect-section-content">
                  <h3>Treatment Failure In Endodontics</h3>
                  <p className="connect-section-paragraph-text">
                    Research Review publications bring the best of 10,000 global
                    medical journals to your inbox every issue with commentary
                    from New Zealand experts.
                  </p>
                  <a href="/" className="btn btn-primary">
                    Read More
                  </a>
                </div>
              </div>
            </Col>
          </Row>
        </section> */}
      </Container>

      <section>
        <Container fluid>
          <Supporters partnersMacroContent={pageContext.partnersMacroContent} />
        </Container>
      </section>

      <Container>
        <JoinRR signUpFormContent={pageContext.signUpFormContent} />
      </Container>
    </Layout>
  )
}

export default ArticleTemplate