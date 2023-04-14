import React, { useEffect, useState } from "react";
import Layout from "../components/layout";
// import { Link, graphql } from "gatsby"
import { Container, Row, Col } from "react-bootstrap"
// import Bio from "../components/bio"
// import Layout from "../components/layout"
// import Seo from "../components/seo"

const ClinicalAreaTemplate = ({
  location,
  pageContext
}) => {
  useEffect(() => {
    console.log("pageContext", pageContext);
  }, [pageContext])
  // const siteTitle = site.siteMetadata?.title || `Title`
  // const siteTitle = `Title`

  return (
    <Layout>
      <Container>
        <div>
          <h1>{pageContext.name}</h1>
          <p>{pageContext.id}</p>
          {pageContext.reviewData && pageContext.reviewData.map((review, index) => {
            return (
              <div key={index}>
                <h2>Review - {review.name && review.name}</h2>
              </div>
            )
          })}
        </div>
      </Container>
    </Layout>
  )
}

export default ClinicalAreaTemplate