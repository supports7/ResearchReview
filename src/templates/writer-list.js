import * as React from "react"
// import { Link } from "gatsby";
import Layout from "../components/layout"
import { Row, Col, Container } from "react-bootstrap"
import SectionLine from "../components/sectionLine"
import Banner from "../components/banner";
import JoinRR from "../components/joinRR";
import Supporters from "../components/supporters"

import bannerImage from "../images/banner/national-cancer-institute-L8tWZT4CcVQ-unsplash.jpg"

const WritersListTemplate = ({ pageContext, location }) => {
  const siteTitle = `Clinical Areas`

  React.useEffect(() => {
    console.log(pageContext.writers)
  }, [pageContext])

  return (
    <Layout location={location} title={siteTitle}>
      <Banner name={pageContext.review.name} bannerImage={bannerImage} />
      <Container>
        <section className="writers-list-top-content">
          <Row>
            <SectionLine />
            <Col md={8} xs={12}>
              <p>
                Since Research Review's foundation in 2007, it has worked with many of Australia's leading experts. Not only are these medical professionals highly regarded locally, many are international leaders, innovating and improving the health of people worldwide through their tireless efforts. Select a clinical are to see details of our current advisors.
              </p>
            </Col>
            <Col md={4} xs={12}>
              <p className="small-text">
                Research Review publications bring the best of 10,000 global
                medical journals to your inbox every issue with commentary from
                New Zealand experts.
              </p>
            </Col>
          </Row>
        </section>
        <section className="writers-list-area-selection">
          <Row>
            <Col xs={12}>
              <h2>Medical Advisors' Index</h2>
            </Col>
            <SectionLine />
            <Col xs={12}>
              <Row>
                {pageContext.writers.map((writer, index) => {
                  let writerUrlTemp = writer.name.toLowerCase();
                  writerUrlTemp = writerUrlTemp.split(' ').join('-');
                  return (
                    <Col md={4} sm={6} xs={12} key={index}>
                      <div className="writer">
                        <div className="writer-image">
                          <img
                            alt={writer.name}
                            src={writer.image ? writer.image : "https://via.placeholder.com/400x300"} 
                            className="img-fluid" />
                        </div>
                        <div className="writer-content">
                          <h3>{writer.name}</h3>
                          <p>Expert Writer</p>
                          <a href={pageContext.url + writerUrlTemp} className="btn btn-primary">
                            READ MORE
                          </a>
                        </div>
                      </div>
                    </Col>
                  )
                })}
              </Row>
            </Col>
            {/* {pageContext.clinicalAreas.map((clinicalArea, index) => (
							<Col xs={3} key={index}>
							<p>{clinicalArea.node.name}</p>
							</Col>
						))} */}
          </Row>
        </section>
      </Container>

      <Container fluid>
        <Supporters />
      </Container>

      <Container>
        <JoinRR />
      </Container>
    </Layout>
  )
}

export default WritersListTemplate
