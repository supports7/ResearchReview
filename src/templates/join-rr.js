import React, { useState, useEffect } from "react"
import { navigate } from "gatsby";
import Layout from "../components/layout"
import SectionLine from "../components/sectionLine"
import { Row, Col, Container } from "react-bootstrap"
import Supporters from "../components/supporters"
// import { Password, SettingsSystemDaydreamOutlined } from "@mui/icons-material"
import logoResearchReview from "../images/logos/RRAUS leader no subs.png"
import ReCAPTCHA from "react-google-recaptcha"
import Cookies from "universal-cookie"
import DoubleAd from "../components/doubleAd";
import FullScreenAd from "../components/fullScreenAd";

const JoinResearchReviewTemplate = ({ pageContext, location }) => {
  const cookies = new Cookies()
  const siteTitle = `Join Research Review`
  const [firstName, setFirstName] = useState()
  const [lastName, setLastName] = useState()
  const [email, setEmail] = useState()
  const [profession, setProfession] = useState()
  const [registerPassword, setRegisterPassword] = useState()
  const [registerPasswordConfirm, setRegisterPasswordConfirm] = useState()
  const [registerError, setRegisterError] = useState()
  const [recaptchaData, setRecaptchaData] = useState()
  const recaptchaRef = React.createRef();

  const handleSubmit = async event => {
    event.preventDefault()
    setRegisterError("");
    const { firstName, lastName, email, profession, registerPassword, registerPasswordConfirm } = document.forms[2]

    if (firstName.value && lastName.value && email.value && profession.value && registerPassword.value && registerPasswordConfirm.value && recaptchaData) {
      // loadLogin();
      // Send email and password entered to store/saga
      // console.log(
      //   firstName.value,
      //   lastName.value,
      //   email.value,
      //   profession.value
      // )
      if (registerPassword.value != registerPasswordConfirm.value) {
        setRegisterError("Passwords do not match. Please try again")
        return;
      }
      if (!recaptchaData) {
        setRegisterError("reCAPTCHA not complete")
        return;
      }
      const jsonData = {
        First_Name: firstName.value,
        Last_Name: lastName.value,
        Email: email.value,
        Profession: profession.value,
        Password_Hash: registerPassword.value
      }

      fetch(`https://researchreview.dev.s05.system7.co.nz/api/users/register`, {
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
            cookies.set("userData", result, {
              path: "/",
              expires: new Date(Date.now() + 8640000),
            })
            cookies.set("EncryptionKey", result.encryptionKey, {
              path: "/",
              expires: new Date(Date.now() + 8640000),
            })

          },

          error => {
            console.log("error", error);
          }
        ).then(
          navigate('/')
        )
    }
  }

  function onChangeRecaptcha(value) {
    setRecaptchaData(value);
  }

  useEffect(() => {
    console.log(pageContext)
  }, [pageContext])

  return (
    <Layout>
      {/* <JoinResearchReviewForm /> */}
      <section
        className="join-research-review"
        style={{
          backgroundImage: "url('https://via.placeholder.com/2000x800')",
          height: "800px",
        }}
      >
        <Container fluid>
          <Row>
            <Col xs={12}>
              <Container>
                <Row className="justify-content-center">
                  <Col xs={8} className="join-research-review-col">
                    <div className="join-research-review-popup-box">
                      <h2 className="join-research-review-heading">Join Research Review</h2>
                    </div>
                    <form onSubmit={handleSubmit} className="join-research-review-form">
                      <Row>
                        <Col xs={12} className="justify-content-center">
                          <Col xs={6}>
                            <img 
                              alt="research review logo"
                              src={logoResearchReview}
                              className="img-fluid" />
                          </Col>
                        </Col>
                        {registerError &&
                          <Col xs={12}>
                            <div className="alert alert-danger">
                              <p>{registerError}</p>
                            </div>
                          </Col>
                        }
                        <Col xs={6}>
                          <div className="form-group form-first-name-div">
                            <input
                              type="text"
                              name="firstName"
                              className="form-control mt-1"
                              placeholder="First Name"
                              required
                              value={firstName}
                              onChange={e => setFirstName(e.target.value)}
                            ></input>
                          </div>
                        </Col>
                        <Col xs={6}>
                          <div className="form-group form-last-name-div">
                            <input
                              type="text"

                              name="lastName"
                              className="form-control mt-1"
                              placeholder="Last Name"
                              required
                              value={lastName}
                              onChange={e => setLastName(e.target.value)}
                            ></input>
                          </div>
                        </Col>
                        <Col xs={12}>
                          <div className="form-group form-email-div">
                            <input
                              type="email"
                              name="email"
                              className="form-control mt-1"
                              placeholder="Email"
                              required
                              value={email}
                              onChange={e => setEmail(e.target.value)}
                            ></input>
                          </div>
                        </Col>
                        <Col xs={12}>
                          <div className="form-group form-profession-div">
                            <input
                              type="password"
                              name="registerPassword"
                              className="form-control mt-1"
                              placeholder="Password"
                              required
                              value={registerPassword}
                              onChange={e => setRegisterPassword(e.target.value)}
                            ></input>
                          </div>
                        </Col>
                        <Col xs={12}>
                          <div className="form-group form-profession-div">
                            <input
                              type="password"
                              name="registerPasswordConfirm"
                              className="form-control mt-1"
                              placeholder="Confirm Password"
                              required
                              value={registerPasswordConfirm}
                              onChange={e => setRegisterPasswordConfirm(e.target.value)}
                            ></input>
                          </div>
                        </Col>
                        <Col xs={12}>
                          <div className="form-group form-profession-div">
                            <input
                              type="text"
                              name="profession"
                              className="form-control mt-1"
                              placeholder="Profession"
                              required
                              value={profession}
                              onChange={e => setProfession(e.target.value)}
                            ></input>
                          </div>
                        </Col>
                        <Col xs={6}>
                          <ReCAPTCHA
                            ref={recaptchaRef}
                            sitekey="6Lc4jGIjAAAAAGliVhOH19tHcMT5PS4LprB0qK2U"
                            onChange={onChangeRecaptcha}
                          />
                        </Col>
                        <Col xs={6}>
                          <button type="submit" className="btn btn-primary join-research-review-form-submit">
                            Submit
                          </button>
                        </Col>
                      </Row>
                    </form>
                  </Col>
                </Row>
              </Container>
            </Col>
          </Row>
        </Container>
      </section>
      <Container>
        <section className="join-rr-second-section">
          <Row>
            <Col md={9} xs={12}>
              <div className="join-rr-left-side">
                <img
                  alt="placeholder"
                  src="https://via.placeholder.com/900x300"
                  className="img-fluid"
                />
              </div>
            </Col>
            <Col md={3} xs={12}>
              <SectionLine />
              <div className="join-rr-content-right-side">
                <h3>Why join?</h3>
                <p>
                  Stay informed, quickly and effectively<br/>
                  Hear from Australia's leading experts<br/>
                  Free to receive<br/>
                  Claim CPD/CME points for reading
                </p>
              </div>
            </Col>
          </Row>
        </section>
        {pageContext.content[0] &&
          <section className="join-rr-promoted-content">
            <Row>
              <SectionLine />
              <Col xs={12}>
                <Row>
                  <Col md={4} sm={6} xs={12}>
                    <div className="promoted-content">
                      <div className="promoted-content-image">
                        <img
                          alt="placeholder"
                          src="https://via.placeholder.com/400x300"
                          className="img-fluid"
                        />
                      </div>
                      <div className="promoted-content-content">
                        <h3>{pageContext.content[0].podcastsTitle}</h3>
                        <p>
                          {pageContext.content[0].podcastsText}
                        </p>
                        <a href="/podcasts" className="btn btn-primary">
                          See all
                        </a>
                      </div>
                    </div>
                  </Col>

                  <Col md={4} sm={6} xs={12}>
                    <div className="promoted-content">
                      <div className="promoted-content-image">
                        <img
                          alt="placeholder"
                          src="https://via.placeholder.com/400x300"
                          className="img-fluid"
                        />
                      </div>
                      <div className="promoted-content-content">
                        <h3>{pageContext.content[0].speakerEventsTitle}</h3>
                        <p>
                          {pageContext.content[0].speakerEventsText}
                        </p>
                        {/* <a href="/" className="btn btn-primary">
                          Sign up
                        </a> */}
                      </div>
                    </div>
                  </Col>

                  <Col md={4} sm={6} xs={12}>
                    <div className="promoted-content">
                      <div className="promoted-content-image">
                        <img
                          alt="placeholder"
                          src="https://via.placeholder.com/400x300"
                          className="img-fluid"
                        />
                      </div>
                      <div className="promoted-content-content">
                        <h3>{pageContext.content[0].productReviewsTitle}</h3>
                        <p>
                          {pageContext.content[0].productReviewsText}
                        </p>
                        {/* <a href="/" className="btn btn-primary">
                          Sign up
                        </a> */}
                      </div>
                    </div>
                  </Col>
                </Row>
              </Col>
              {/* {pageContext.clinicalAreas.map((clinicalArea, index) => (
                <Col xs={3} key={index}>
                <p>{clinicalArea.node.name}</p>
                </Col>
                ))} */}
            </Row>
          </section>
        }

      </Container>

      <Container fluid>
        <Row>
          <FullScreenAd advertisements={pageContext.advertisements} />
        </Row>
      </Container>

      <Container>
        <DoubleAd advertisements={pageContext.advertisements} />
      </Container>

      <section>
        <Container fluid>
          <Supporters />
        </Container>
      </section>
    </Layout>
  )
}

export default JoinResearchReviewTemplate
