// import React, { useEffect, useState } from "react"
// import { Container, Row, Col } from "react-bootstrap"
// import { GatsbyImage } from 'gatsby-plugin-image';
// import { graphql, useStaticQuery } from 'gatsby';
// const config = require('../../config');

// const Supporters = () => {
//   const sourceInstanceName =
//   config.countryCode === 'New Zealand' ? 'nzSupporters' : 'ausSupporters';
// const query = `
//   query {
//     images: allFile(
//       filter: {
//         sourceInstanceName: { eq: "${sourceInstanceName}" }
//         extension: { regex: "/^(png|jpe?g|svg)$/" }
//       }
//     ) {
//       nodes {
//         childImageSharp {
//           gatsbyImageData(layout: CONSTRAINED, width: 100)
//         }
//       }
//     }
//   }
// `;
// const data = useStaticQuery(graphql(query));

//   const imageNodes = data.images.nodes;
//   return ( 
//     <section className="supporters-section">
//       <Col xs={12}>
//         <Container>
//           <Row>
//             <Col xs={12}>
//               <h3 className="supporters-heading">Kindly Support By</h3>
//             </Col>
//             {imageNodes && imageNodes.map((node, index) => {
//               if (node) {
//                 return (
//                   <Col md={1} sm={3} xs={4}>
//                     <GatsbyImage
//                       key={index}
//                       alt={`PartnerImage${index}`}
//                       className="img-fluid"
//                       src={node.childImageSharp.gatsbyImageData}
//                     />
//                   </Col>
//                 )
//               }
//             }
//             )}
//           </Row>
//         </Container>
//       </Col>
//     </section>
//   )
// }

// export default Supporters
