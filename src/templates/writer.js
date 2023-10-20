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
   // console.log(pageContext)
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
                Bio: {pageContext.writer.bio}
              </p>
            </Col>
            <Col md={4} xs={12}>
              <div className="writer-image">
                <img
                  alt="research review expert writer"
                  src={
                    pageContext.writer.image
                      ? pageContext.writer.image
                      : "https://upload.wikimedia.org/wikipedia/commons/thumb/9/96/Generic-person.svg/240px-Generic-person.svg.png"
                  }
                  className="img-fluid"
                />
              </div>
            </Col>
          </Row>
        </section>

        <DoubleAd advertisements={pageContext.advertisements}/>
      </Container>

      <section>
        <Container fluid>
          <Supporters partnersMacroContent={pageContext.partnersMacroContent} />
        </Container>
      </section>

      <Container>
        <JoinRR signUpFormContent={pageContext.signUpFormContent}/>
      </Container>
    </Layout>
  )
}

export default WriterTemplate
