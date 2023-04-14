import React from "react"
import { Navbar, Container, Nav, NavDropdown, Row, Col } from "react-bootstrap"
import logoResearchReview from "../images/logos/RRAUS leader no subs.png"
import { Link } from "gatsby"

const ResearchReviewFooter = () => {
  return (
    <footer id="footer">
      <Container>
        <Row>
          <Col md={4}>
            <div className="footer-logo">
              <Link className="footer-brand" to="/">
                <img 
                  alt="research review logo"
                  src={logoResearchReview} 
                  className="img-fluid" />
              </Link>
            </div>
          </Col>
          <Col md={4} className="offset-md-4 footer-col-padding">
            <p>Research Review highlights critical studies from 10,000 worldwide medical journals with commentary from Australian experts.</p>
            <p className="footer-social-media-links">
              <span><a href="https://facebook.com" target="_blank">FB</a></span>
              <span><a href="https://twitter.com" target="_blank">TW</a></span>
              <span><a href="https://linkedin.com" target="_blank">LI</a></span>
            </p>
          </Col>
          {/* <Col md={2} className="footer-col-padding footer-col-ul">
            <ul>
              <li><a href="tel:123456789">Phone Number</a></li>
              <li><a href="mailto:Testing@researchreview.co.nz">Email Address</a></li>
              <li><a href="https://researchreview.co.nz">Website Link</a></li>
              <li>1 Road Street</li>
              <li>Auckland, Auckland</li>
              <li>AKL 1010</li>
            </ul>
          </Col>
          <Col md={2} className="footer-col-padding footer-col-ul">
            <ul>
              <li><a href="tel:123456789">Phone Number</a></li>
              <li><a href="mailto:Testing@researchreview.co.nz">Email Address</a></li>
              <li><a href="https://researchreview.co.nz">Website Link</a></li>
              <li>1 Road Street</li>
              <li>Auckland, Auckland</li>
              <li>AKL 1010</li>
            </ul>
          </Col> */}
        </Row>
      </Container>
    </footer>
  )
}

export default ResearchReviewFooter