import React, { useEffect, useState, useRef } from "react"
import { Navbar, Container, Nav, NavDropdown, Row, Col } from "react-bootstrap"
import { Link } from "gatsby"
import SearchForm from "./navbarSearch"
import LoginForm from "./navbarLogin"
import config from "../../config";
// import AccountCircleIcon from '@mui/icons-material/AccountCircle';

//LOGO SELECTOR
import logoResearchReviewAu from "../images/logos/RRAUS leader no subs.png";
const selectLogo = (countryCode) => {
  if (countryCode === "AU") {
    return logoResearchReviewAu;
  } else {
    // Return a default logo or handle other cases
    return ""; // Define your default logo path
  }
}

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
                  <Nav.Link as={Link} to="/clinical-areas">Clinical Areas</Nav.Link>
                  <Nav.Link as={Link} to="/expert-advisors">Expert Advisors</Nav.Link>
                  <Nav.Link as={Link} to="/watch">Watch</Nav.Link>
                  <NavDropdown title="CPD/CME" id="cpd-cme-dropdown">
                    <NavDropdown.Item as={Link} to="/partners">Partners</NavDropdown.Item>
                    <NavDropdown.Item as={Link} to="/modules">Modules</NavDropdown.Item>
                  </NavDropdown>
                  <Nav.Link as={Link} to="/links">Links</Nav.Link>
                  <Nav.Link as={Link} to="/contact-us">Contact</Nav.Link>
                  {/* <Nav.Link as={Link} to="/advertise">Advertise</Nav.Link> */}
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
  const logoPath = selectLogo(config.countryCode);
  
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
                  <Nav.Link as={Link} to="/expert-advisors">Expert Advisors</Nav.Link>
                  <Nav.Link as={Link} to="/watch">Watch</Nav.Link>
                  <NavDropdown title="CPD/CME" id="cpd-cme-dropdown">
                    <NavDropdown.Item as={Link} to="/partners">Partners</NavDropdown.Item>
                    <NavDropdown.Item as={Link} to="/modules">Modules</NavDropdown.Item>
                  </NavDropdown>
                  <Nav.Link as={Link} to="/links">Links</Nav.Link>
                  <Nav.Link as={Link} to="/contact-us">Contact</Nav.Link>
                  {/* <Nav.Link as={Link} to="/advertise">Advertise</Nav.Link> */}
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
    <div className="full-navbar" id="navbar">
      <div className="top-navbar">
        <Container>
          <Row>
            <Col xs={12} lg={4}>
              <div className="navbar-logo">
                <Link className="navbar-brand" to="/">
                  <img
                    alt="research review logo"
                    src={logoPath}
                    className="img-fluid" />
                </Link>
              </div>
            </Col>
            <Col lg={6}>
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