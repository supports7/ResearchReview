import React, { useEffect, useState } from "react"
import { Navbar, Container, Nav, NavDropdown, Row, Col } from "react-bootstrap"
import logoResearchReview from "../images/logos/RRAUS leader no subs.png"
import { Link } from "gatsby"
import SearchIcon from "@mui/icons-material/Search"
import CircularProgress from "@mui/material/CircularProgress"
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos"
import Cookies from "universal-cookie"
// import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const config = require("../../config")

const ResearchReviewNavbar = () => {
  const cookies = new Cookies()
  // const loginToken = cookies.get("LoginToken");

  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [loggedIn, setLoggedIn] = useState(false)
  const [userData, setUserData] = useState()
  const [errorMessage, setErrorMessage] = useState("")
  const [loadingLogin, setLoadingLogin] = useState(true)

  useEffect(() => {
    setLoadingLogin(true)
    const encryptionKey = cookies.get("EncryptionKey")
    const userDataFromCookies = cookies.get("userData")
    if (encryptionKey) {
      if (userDataFromCookies) {
        setUserData(userDataFromCookies)
      }
      setLoggedIn(true)
    }
    setLoadingLogin(false)
  }, [])

  const startLogout = () => {
    cookies.remove("userData", { path: '/' })
    cookies.remove("EncryptionKey", { path: '/' })
    setUserData()
    setLoggedIn(false)
    window.location.reload();
  }

  const handleSubmit = async event => {
    event.preventDefault()
    const { username, password } = document.forms[0]
    const jsonData = {
      Email: username.value,
      Password: password.value,
    }
    if (username.value && password.value) {
      setLoadingLogin(true)

      fetch(`https://researchreview.dev.s05.system7.co.nz/api/users/login`, {
        method: "POST",
        // mode: 'no-cors',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(jsonData),
      })
        .then(res => res.json())
        .then(
          result => {
            console.log("result", result)
            if (!result.errors) {
              console.log("TESTING")
            }
            setLoadingLogin(false)
            setLoggedIn(true)
            setUserData(result)
            cookies.set("userData", result, {
              path: "/",
              expires: new Date(Date.now() + 8640000),
            })
            cookies.set("EncryptionKey", result.encryptionKey, {
              path: "/",
              expires: new Date(Date.now() + 8640000),
            })
            cookies.set("LoginToken", result.token, {
              path: "/",
              expires: new Date(Date.now() + 8640000),
            })
            window.location.reload();
          },
          // Note: it's important to handle errors here
          // instead of a catch() block so that we don't swallow
          // exceptions from actual bugs in components.
          error => {
            setLoadingLogin(false)
            setLoggedIn(false)
            console.log(error.message)
            setErrorMessage(error)
          }
        )
      console.log(username.value, password.value)
    }
  }

  useEffect(() => {
    if (errorMessage) {
      console.log(errorMessage)
    }
  }, [errorMessage])

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
    <div className="full-navbar">
      <div className="top-navbar">
        <Container>
          <Row>
            <Col xs={5}>
              <div className="navbar-logo">
                <Link className="navbar-brand" to="/">
                  <img
                    alt="research review logo"
                    src={logoResearchReview}
                    className="img-fluid" />
                </Link>
              </div>
            </Col>
            <Col md={5}>
              <div className="navbar-login">
                {!loadingLogin && (
                  <div>
                    {!loggedIn && (
                      <form onSubmit={handleSubmit}>
                        <Row>
                          {errorMessage &&
                            <Col xs={12}>
                              {/* {errorMessage} */}
                            </Col>
                          }
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
                                className="form-control"
                                placeholder="Email"
                                required
                                value={username}
                                onChange={e => setUsername(e.target.value)}
                              ></input>
                            </div>
                          </Col>
                          <Col xs={5}>
                            <div className="form-group login-form-password-div">
                              <input
                                type="password"
                                name="password"
                                className="form-control"
                                placeholder="Password"
                                required
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                              ></input>
                              {!loadingLogin && (
                                <button
                                  type="submit"
                                  className="login-form-submit"
                                >
                                  <ArrowForwardIosIcon />
                                </button>
                              )}
                            </div>
                          </Col>
                        </Row>
                      </form>
                    )}
                    {loggedIn && (
                      <Row>
                        <Col xs={12}>
                          <div className="login-form-title-div float-right">
                            <a className="btn btn-primary logout-button" onClick={startLogout}>LOGOUT</a>
                            <Link to="/profile" className="btn btn-secondary profile-button">Profile</Link>
                          </div>
                        </Col>
                      </Row>
                    )}
                  </div>
                )}
                {loadingLogin && (
                  <div className="loading login-form-submit float-right">
                    <CircularProgress color="inherit" />
                  </div>
                )}
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
      </div>
      <div className="bottom-navbar">
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
    </div>
  )
}

export default ResearchReviewNavbar
