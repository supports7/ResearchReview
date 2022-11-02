import * as React from "react"
import { Link, graphql } from "gatsby"

import Bio from "../components/bio"
import Layout from "../components/layout"
import Seo from "../components/seo"

const ClinicalAreaTemplate = ({ pageContext }) => {

//   const siteTitle = site.siteMetadata?.title || `Title`
  const siteTitle = `Title`
  console.log(pageContext.reviewData);

  return (
    <div>
      <h1>{pageContext.name}</h1>
      <p>{pageContext.id}</p>
      {pageContext.reviewData && pageContext.reviewData.map((review, index) => {
       return (
          <div key={index}>
            <h2>Review - {review.name}</h2>
          </div>
       ) 
      })}
    {/*<Layout title={siteTitle}>
       <article
        className="blog-post"
        itemScope
        itemType="http://schema.org/Article"
      >
        <header>
          <h1 itemProp="headline">{post.frontmatter.title}</h1>
          <p>{post.frontmatter.date}</p>
        </header>
        <section
          dangerouslySetInnerHTML={{ __html: post.html }}
          itemProp="articleBody"
        />
        <hr />
        <footer>
          <Bio />
        </footer>
      </article>
      <nav className="blog-post-nav">
        <ul
          style={{
            display: `flex`,
            flexWrap: `wrap`,
            justifyContent: `space-between`,
            listStyle: `none`,
            padding: 0,
          }}
        >
          <li>
            {previous && (
              <Link to={previous.fields.slug} rel="prev">
                ← {previous.frontmatter.title}
              </Link>
            )}
          </li>
          <li>
            {next && (
              <Link to={next.fields.slug} rel="next">
                {next.frontmatter.title} →
              </Link>
            )}
          </li>
        </ul>
      </nav> 
    </Layout>*/}
    </div>
  )
}

// export const Head = ({ data: { markdownRemark: post } }) => {
//   return (
//     <Seo
//       title={post.frontmatter.title}
//       description={post.frontmatter.description || post.excerpt}
//     />
//   )
// }

export default ClinicalAreaTemplate

// export const pageQuery = graphql`
//   query allRestApiApiReviews($filter: {clinical_Area_Id: {eq: "$endpointId"}}) {
//     nodes {
//       endpointId
//       name
//       clinical_Area_Id
//       modified_Time
//     }
//   }
// `
