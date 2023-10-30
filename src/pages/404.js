import * as React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import Seo from "../components/seo"
import { Container, Row, Col } from "react-bootstrap"

const NotFoundPage = ({ data }) => {
  const siteTitle = data.site.siteMetadata.title

  return (
    <Layout>
      <Container className="py-5">
        <Row>
          <Col xs={12} className="text-center">
            <h1>404 PAGE NOT FOUND</h1>
            <p>Sorry, the page you are looking for has not been found.</p>
            <a href="/" className="btn btn-primary">Return to the Home Page</a>
          </Col>
        </Row>
      </Container>
    </Layout>
  )
}

export const Head = () => <Seo title="404: Not Found" />

export default NotFoundPage

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
  }
`
