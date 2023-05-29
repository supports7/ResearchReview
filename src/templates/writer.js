import * as React from "react"
// import { Link } from "gatsby";
import Layout from "../components/layout"
import { Row, Col, Container } from "react-bootstrap"
import SectionLine from "../components/sectionLine"
import JoinRR from "../components/joinRR"
import Supporters from "../components/supporters"
import DoubleAd from "../components/doubleAd"

const WriterTemplate = ({ pageContext, location }) => {
  const siteTitle = `Clinical Areas`

  React.useEffect(() => {
    console.log(pageContext.writers)
  }, [pageContext])

  return (
    <Layout location={location} title={siteTitle}>
      <Container>
        <section className="writers-list-top-content">
          <Row>
            <SectionLine />
            <Col md={8} xs={12}>
              <h1>{pageContext.writer.name}</h1>
              <p>
                Research Review publications bring the best of 10,000 global
                medical journals to your inbox every issue with commentary from
                New Zealand experts. Over 50 areas including Cardiology,
                Diabetes, Oncology, General Practice and Psychiatry. Specialist
                opinions on guidlines, medicines and conferences. All Research
                Review publications are free to receive.
              </p>
            </Col>
            <Col md={4} xs={12}>
              <div className="writer-image">
                <img
                  alt="research review expert writer"
                  src={
                    pageContext.writer.image
                      ? pageContext.writer.image
                      : "https://via.placeholder.com/400x300"
                  }
                  className="img-fluid"
                />
              </div>
            </Col>
          </Row>
        </section>

        <DoubleAd advertisements={pageContext.advertisements}/>

        <section className="writers-list-area-selection">
          <Row>
            <h2>Recent Reviews By {pageContext.writer.name}</h2>
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
            {/* {pageContext.clinicalAreas.map((clinicalArea, index) => (
							<Col xs={3} key={index}>
							<p>{clinicalArea.node.name}</p>
							</Col>
						))} */}
          </Row>
        </section>
      </Container>

      <section>
        <Container fluid>
          <Supporters partnersMacroContent={pageContext.partnersMacroContent} />
        </Container>
      </section>

      <Container>
        <JoinRR />
      </Container>
    </Layout>
  )
}

export default WriterTemplate
