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

const ArticleTemplate = ({ pageContext, location }) => {
  const [decryptedComment, setDecryptedComment] = useState("");
  const cookies = new Cookies();
  const siteTitle = `${pageContext.article.title}`

  useEffect(() => {
    console.log(pageContext)
    const encryptionKey = cookies.get('EncryptionKey');

    if (encryptionKey) {
      // Decrypt
      const tempDecryptedComment = decrypt(pageContext.article.comment, encryptionKey);
      setDecryptedComment(tempDecryptedComment);
      // Show that section
      // Hide register button
    }
  }, [pageContext, cookies])

  return (
    <Layout location={location} title={siteTitle}>
      <div className="article-banner">
      <Banner name={pageContext.article.title} bannerImage={bannerImage} />
      </div>
      <Container>
        <section className="section-top-content">
          <Row>
            <Col lg={8} xs={12}>
              <SectionLine />
              <h3>{pageContext.article.title}</h3>
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
                    <strong className="bold">Comment: </strong><div className="encrypted-data">{decryptedComment && <div  dangerouslySetInnerHTML={{ __html: decryptedComment }} ></div>}</div>
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
                    <a className="btn btn-secondary load-more-button" href="/join-research-review/">Register to see our summary content</a>
                  </div>
                </div>
              }
            </Col>
            <Col lg={4} xs={12}>
              <div className="section-ad-image">
                <img
                  alt="placeholder"
                  src="https://via.placeholder.com/400x300"
                  className="img-fluid" />
              </div>
              {pageContext.otherArticles && pageContext.otherArticles.length > 0 &&
                <div className="other-articles">
                  <h3>Also in this issue</h3>
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
            </Col>
            <Col xs={12}>

            </Col>
          </Row>
        </section>

        <DoubleAd advertisements={pageContext.advertisements} />

        <section className="section-list-area-selection">
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
        </section>
      </Container>

      <section>
        <Container fluid>
          <Supporters />
        </Container>
      </section>

      <Container>
        <JoinRR />
      </Container>
    </Layout>
  )
}

export default ArticleTemplate