import React, { useEffect, useState, useRef } from "react"
import { Navbar, Container, Nav, NavDropdown, Row, Col } from "react-bootstrap"
import logoResearchReview from "../images/logos/RRAUS leader no subs.png"
import { Link } from "gatsby"
import SearchForm from "./navbarSearch"
import LoginForm from "./navbarLogin"

// import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const config = require("../../config")

function DesktopNavbar() {
  return (
    <div className="bottom-navbar desktop">
      <Container>
        <Row className="w-100 navbar-row">
          <Col xs={10}>
            <Navbar>
              <Navbar.Toggle aria-controls="basic-navbar-nav" />
              <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto">
                  <Nav.Link href="/clinical-areas">Clinical Areas</Nav.Link>
                  <Nav.Link href="/expert-writers">Expert Writers</Nav.Link>
                  <Nav.Link href="/podcasts">Watch</Nav.Link>
                  <Nav.Link href="/partners">
                    Professional Development
                  </Nav.Link>
                  {/* <Nav.Link href="/industry-resources">
                      Industry Resources
                    </Nav.Link> */}
                  {/* <Nav.Link href="/links">Links</Nav.Link> */}
                  {/* <Nav.Link href="/advertise">Advertise</Nav.Link> */}
                  {/* <Nav.Link href="/about">About</Nav.Link> */}
                  <Nav.Link href="/contact-us">Contact</Nav.Link>
                </Nav>
              </Navbar.Collapse>
            </Navbar>
          </Col>
          <Col xs={2} className="navbar-sign-up-div">
            <Nav.Link href="/join-research-review" className="text-center navbar-sign-up">
              Sign up with us
            </Nav.Link>
          </Col>
        </Row>
      </Container>
    </div>
  );
}


const ResearchReviewNavbar = () => {
  function MobileNavbar() {
    return (
      <div className="mobile bottom-navbar">
        <Row className="w-100 navbar-row">
          <Col xs={12}>
            <Navbar collapseOnSelect expand="lg" bg="light" variant="light">
              <div className="navbar-login mobile-nav-row">
                <Row>
                  <Col xs={12}>
                    <LoginForm />
                  </Col>
                  <Col xs={8}>
                    <SearchForm />
                  </Col>
                  <Col xs={4}>
                    <div className="menu-button">
                      <p>Menu</p>
                      <Navbar.Toggle aria-controls="responsive-navbar-nav float-right" />
                    </div>
                  </Col>
                </Row>
              </div>
              <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="me-auto">
                  <Nav.Link as={Link} to="/clinical-areas">Clinical Areas</Nav.Link>
                  <Nav.Link as={Link} to="/expert-writers">Expert Writers</Nav.Link>
                  <Nav.Link as={Link} to="/podcasts">Watch</Nav.Link>
                  <Nav.Link as={Link} to="/partners">Professional Development</Nav.Link>
                  <Nav.Link as={Link} to="/contact-us">Contact</Nav.Link>
                </Nav>
                <Nav>
                  <Nav.Link as={Link} to="/join-research-review">Sign up with us</Nav.Link>
                </Nav>
              </Navbar.Collapse>
            </Navbar>
          </Col>
        </Row>
      </div>
    );
  }

  return (
    <div className="full-navbar">
      <div className="top-navbar">
        <Container>
          <Row>
            <Col xs={12} lg={5}>
              <div className="navbar-logo">
                <Link className="navbar-brand" to="/">
                  <img
                    alt="research review logo"
                    src={logoResearchReview}
                    className="img-fluid" />
                </Link>
              </div>
            </Col>
            <Col lg={5}>
              <div className="navbar-login desktop">
                <LoginForm />
              </div>
            </Col>
            <Col lg={2}>
              <div className="desktop">
                <SearchForm />
              </div>
            </Col>
          </Row>
        </Container>
      </div>
      <MobileNavbar />
      <DesktopNavbar />
    </div>
  )
}

export default ResearchReviewNavbar