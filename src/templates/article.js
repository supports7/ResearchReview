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
      // "665c762c3d484fb4a9c71db8435e6127"
      // let tempEncryptedData = "VYUKU95PKq5LmVp7JzmHqAkxkDS6ZR/AsF5tT+VZGpIfG7nOavWJPef4HhKWm5t8eJf07lCuZazaOZFa8Iam06YXU5TLJbN3ZgfR1BExBAuWKnwfgfwytJJQsokYd3X0Fxxhk1MyNOtyc9Go6yzXyJnimAKd14xGCiV5pp4HCd/SXlBYZCI3hMlJ8tMO2mEewvrQNk2IPpfxKqrYuph/bvai85GI174nQzDNUKVSCx+9u3bnTFBIXsV6NPZeBCNlPg9wCXGVSYYjwghJ2cO5gTNPJPGJ8JhSpPe8PXmVcAlWTux7a/cuUatg2OQycG1YJ5Xc6+07S1+/yG0+R2tLKUPL7bT/o/8rEHdXPo8y823BU9Fp832VOagUnW2GnehLrwJuDGUWDM5CcTcRetFmVCGqSiKn+rGQOELIbU9e7uysWvlRF+++YbC4aOHIWUKwGTh0xxPcCXUCA7yiBonoUHm08R8QUtCyCn/xw/npWFDoBeFTyNqRaiCrdOAt/vma696bmEuE/fzWpjwOCPKU9FG1b1orcEEE6eyGjCJeWODd17lj+VYvBF+GZrVDSNHdySFXL9OZZZ2120ggcMVU1evCv0lv1A2LPXbRai25kmUHTkS91W2klNI4CMiLNDapBFch48rwKBNp4lPC2Y45eg=="
      // let tempEncryptedData = '10Ts83V7mjr2zmfsannsEjzwPGzgyR3tdhNdxSJY05K0zJi2bAVvsHcSt8d54uL7WBh5lBGHy3lNhZd8zxJV6I4WJOEyVNA408RMDj862VMBuKKoTzXA9Fr3eBk1fQqb1IF8JJSNohaRtIZGiALdMSYGjzfKmFxfCcdoQZzNqJmCWd/3w5g7gFli4+6lXCdBZEpWu0tT4y7POmeSHeOu/fy3BEsc73sQpqk01QdRdZ6YUUD3tMIWkwqZxuM/nLMjLlZq0ieSiilbssc9W5Ic+RMmwkqzuXO/KXXrcMJcrJj6a3+NnfuPJeGtZIRHVmofy55v4rGcZJtWjUvcMXedubv1Q3+GSlGVi4H5+Y2V891hZmBr1mLStqtqy/nP/k40PhoDVnFPaq3+QIrpTgTgyW4B72ONby5Kuz1pnZrelM7WRxR0rX/F0MuenlTWa0RojjWIjJbv+4j4RcuOhbwE7ecx3xHNhYTjO4J7Wy2Y3iaY05CspuE9y5Xk+SWW90X1Rd7U5OJjbdxTpEcaYEP+3K7KOpri9r5aqgXCm1vTUNptODfGvd8vS1Ey8BVurLJjMlBB5CzGDtrKKIyYhinkoheTO13x1i0oitrKLXO1hjXC7zF0Kyv9tvGV3mZMlkq2AP4VlvsMFk8wneMg+tsl9AMepJyjvQF3ab5Za6fviyGs0jPde93tc1v4+jZtc8RZeyJ+GVo1vyE8An/RyKe1zM9AH4dXfKWKIr0ds1WmWCRzhcxRYEkPOo/xDJRRzm9mnzp09PsknA/+LPaFjkmHKwq4THW/Y9OB4jK/gCi+d0Lx0Sh7af60XAOAOt1KSoJoy1laMVsB9JvFi+5ucSclG+3f2A0hT5lvOBZfwjDoMWvk0M+ca81/1hKSn3GSkqOdUVyl5W/WoQczPYIzuBwFANe+Aof92eh0y4vSx2LMDRz3aYpRug92OkebHwKpEemr2N43js0efRiQLGdYa7yshSKCy+3ND48mHgWP3CLrc5HZfc95T/fWlllCJy/0/sDRHBYE8fmLdAQR3s4BDwfiw1kIUwyMnfQrC0no4Q5kdos='
      // const tempDecryptedComment = decrypt(tempEncryptedData, "665c762c3d484fb4a9c71db8435e6127");
      const tempDecryptedComment = decrypt(pageContext.article.comment, encryptionKey);
      setDecryptedComment(tempDecryptedComment);
      console.log("DECRYPTED DATA", tempDecryptedComment);
      // Show that section
      // Hide register button
    }
  }, [pageContext])

  return (
    <Layout location={location} title={siteTitle}>
      <Banner name={pageContext.article.name} bannerImage={bannerImage} />
      <Container>
        <section className="section-top-content">
          <Row>
            <Col md={8} xs={12}>
              <Col xs={4}>
                <SectionLine />
              </Col>
              <h1>{pageContext.article.title}</h1>
              <div className="article-summary">
                {pageContext.article.summary2.includes(">") ? parse(pageContext.article.summary2) : pageContext.article.summary2}
              </div>
              {decryptedComment &&
                <div className="encrypted-panel">
                  <div className="encrypted-data">{decryptedComment}</div>
                </div>
              }
            </Col>
            <Col md={4} xs={12}>
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
              {!decryptedComment &&
                <div className="full-width-button not-logged-in">
                  <div className="">
                    <a className="btn btn-secondary load-more-button" href="/join-research-review/">Register to see our summary content</a>
                  </div>
                </div>
              }
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