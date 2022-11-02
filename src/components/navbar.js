import * as React from "react";
import { Navbar, Container, Nav, NavDropdown, Row, Col } from "react-bootstrap";
import logoResearchReview from "../images/logos/RRAUS leader no subs.png";
import { Link } from "gatsby";
import SearchIcon from '@mui/icons-material/Search';
// import Cookies from "universal-cookie";

export default function ResearchReviewNavbar() {
  //   const cookies = new Cookies();
  //   const loginToken = cookies.get("LoginToken");
  const handleSubmit = async event => {
    event.preventDefault()
    const { username, password } = document.forms[0]

    if (username.value && password.value) {
      // loadLogin();
      // Send email and password entered to store/saga
      console.log(username.value, password.value)
    }
  }

  const handleSearchSubmit = async event => {
    event.preventDefault()
    const { search } = document.forms[0]

    if (search.value) {
      // loadLogin();
      // Send email and password entered to store/saga
      console.log(search.value)
    }
  }

  return (
    <div className="top-navbar">
      <Container>
        <Row>
          <Col xs={5}>
            <div className="navbar-logo">
              <Link className="navbar-brand" to="/">
                <img src={logoResearchReview} className="img-fluid" />
              </Link>
            </div>
          </Col>
          <Col md={5}>
            <div className="navbar-login">
              <form onSubmit={handleSubmit}>
                <Row>
                  <Col xs={2}>
                    <div className="login-form-title-div">
                      <p>Login</p>
                    </div>
                  </Col>
                  <Col xs={5}>
                    <div className="form-group login-form-username-div">
                      <input
                        type="text"
                        name="username"
                        className="form-control mt-1"
                        placeholder="Username"
                        required
                      />
                    </div>
                  </Col>
                  <Col xs={5}>
                    <div className="form-group login-form-password-div">
                      <input
                        type="password"
                        name="password"
                        className="form-control mt-1"
                        placeholder="Password"
                        required
                      />
                      <button type="submit" className="login-form-submit">
                        {">"}
                      </button>
                    </div>
                  </Col>
                </Row>
              </form>
            </div>
          </Col>
          <Col xs={2}>
            <div className="search-form">
              <form onSubmit={handleSearchSubmit}>
                <Row>
                  <Col xs={12}>
                    <div className="search-form-input-div">
                      <input
                        type="text"
                        name="search"
                        className="form-control mt-1"
                        placeholder="Search"
                        required
                      />
                      <button type="submit" className="search-form-submit">
                        <SearchIcon />
                      </button>
                    </div>
                  </Col>
                </Row>
              </form>
            </div>
          </Col>
        </Row>
      </Container>
      <div className="bottom-navbar">
        <Container>
          <Row>
            <Col xs={12}>
              <Navbar>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                  <Nav className="me-auto">
                    <NavDropdown title="Clinical Areas" id="basic-nav-dropdown">
                      <NavDropdown.Item href="/clinical-areas/dentistry/3.1">Dentistry</NavDropdown.Item>
                    </NavDropdown>
                    <Nav.Link href="/expert-writers">Expert Writers</Nav.Link>
                    <Nav.Link href="/watch">Watch</Nav.Link>
                    <Nav.Link href="/professional-development">Professional Development</Nav.Link>
                    <Nav.Link href="/industry-resources">Industry Resourcers</Nav.Link>
                    <Nav.Link href="/links">Links</Nav.Link>
                    <Nav.Link href="/advertise">Advertise</Nav.Link>
                    <Nav.Link href="/about">About</Nav.Link>
                    <Nav.Link href="/contact">Contact</Nav.Link>
                  </Nav>
                </Navbar.Collapse>
              </Navbar>
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  )
}
