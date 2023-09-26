import React, { useState, useEffect } from "react"
import { navigate } from "gatsby";
import he from 'he';
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
import BannerImage from "../assets/img/shutterstock_1493149190.jpg";
import JoinRR4 from "../assets/img/JoinRR/JoinRR4.jpg";
import JoinRR3 from "../assets/img/JoinRR/JoinRR3.jpg";
import JoinRR2 from "../assets/img/JoinRR/JoinRR2.jpg";
import JoinRR1 from "../assets/img/JoinRR/JoinRR1.jpg";

const JoinResearchReviewTemplate = ({ pageContext, location }) => {
  const cookies = new Cookies()
  const siteTitle = `Join Research Review`
  const [firstName, setFirstName] = useState()
  const [lastName, setLastName] = useState()
  const [email, setEmail] = useState()
  const [profession, setProfession] = useState()
  const [registerPassword, setRegisterPassword] = useState()
  const [registerPasswordConfirm, setRegisterPasswordConfirm] = useState()
  const [organisation, setOrganisation] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [healthProfessional, setHealthProfessional] = useState('');
  const [confirmTAndCs, setConfirmTAndCs] = useState('');
  const [registerError, setRegisterError] = useState()
  const [recaptchaData, setRecaptchaData] = useState()
  const recaptchaRef = React.createRef();

  const introText = he.decode(pageContext.joinRRContent.introText);

  const handleConfirmTAndCsChange = (e) => {
    setConfirmTAndCs(e.target.value);
  };

  const handleSubmit = async event => {
    event.preventDefault()
    setRegisterError("");

    if (firstName && lastName && email && profession && registerPassword && registerPasswordConfirm && recaptchaData) {

      if (registerPassword != registerPasswordConfirm) {
        setRegisterError("Passwords do not match. Please try again")
        return;
      }
      if (!recaptchaData) {
        setRegisterError("reCAPTCHA not complete")
        return;
      }
      const jsonData = {
        First_Name: firstName,
        Last_Name: lastName,
        Email: email,
        Profession: profession,
        Organisation: organisation,
        Phone_Number: phoneNumber,
        Health_Professional: healthProfessional,
        Password_Hash: registerPassword
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
        id="join-research-review-page"
        className="join-research-review"
        style={{
          backgroundImage: `url('${pageContext.joinRRContent.bannerImage}')`,
          height: "800px",
          backgroundSize: "cover",
        }}
      >
        <Container fluid>
          <Row>
            <Col xs={12}>
              <Container>
                <Row className="justify-content-center">
                  <Col lg={8} xs={12} className="join-research-review-col">
                    <div className="join-research-review-popup-box">
                      <h2 className="join-research-review-heading">Join Research Review</h2>
                    </div>
                    <form onSubmit={handleSubmit} className="join-rr-form join-research-review-form">
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
                        <Col xs={6}>
                          <div className="form-group form-phone-number-div">
                            <input
                              type="text"
                              name="phoneNumber"
                              className="form-control mt-1"
                              placeholder="Home/Work Phone Number"
                              required
                              value={phoneNumber}
                              onChange={e => setPhoneNumber(e.target.value)}
                            ></input>
                          </div>
                        </Col>
                        <Col xs={6}>
                          <div className="form-group form-organisation-div">
                            <input
                              type="text"
                              name="organisation"
                              className="form-control mt-1"
                              placeholder="Organisation"
                              required
                              value={organisation}
                              onChange={e => setOrganisation(e.target.value)}
                            ></input>
                          </div>
                        </Col>
                        <Col xs={6}>
                          <div className="form-group form-password-div">
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
                        <Col xs={6}>
                          <div className="form-group form-confirm-password-div">
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
                        <Col xs={12}>
                          <div className="form-group-radio-div">
                            <label htmlFor="yes_no_radio">Are you a health professional?</label>
                            <p>
                              <input type="radio" name="yes_no" onChange={e => setHealthProfessional(true)} defaultChecked={healthProfessional} />Yes
                            </p>

                            <p>
                              <input type="radio" name="yes_no" onChange={e => setHealthProfessional(false)} defaultChecked={!healthProfessional} />No
                            </p>
                          </div>
                        </Col>
                        <Col xs={12} className="form-group-radio-div">
                          <label>
                            <input
                              type="checkbox"
                              name="confirmTAndCs"
                              checked={confirmTAndCs}
                              onChange={handleConfirmTAndCsChange} // Use the custom handler
                            />
                            I have read and agree with the <a href="/terms-and-conditions">Terms and Conditions</a>
                          </label>
                        </Col>
                        <Col xs={12} lg={6}>
                          <ReCAPTCHA
                            ref={recaptchaRef}
                            sitekey="6Lc4jGIjAAAAAGliVhOH19tHcMT5PS4LprB0qK2U"
                            onChange={onChangeRecaptcha}
                          />
                        </Col>
                        <Col xs={12} lg={6}>
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
                  src={pageContext.joinRRContent.introImage}
                  className="img-fluid"
                />
              </div>
            </Col>
            <Col md={3} xs={12}>
              <SectionLine />
              <div className="join-rr-content-right-side">
                <div dangerouslySetInnerHTML={{ __html: introText }} />
              </div>
            </Col>
          </Row>
        </section>
        {pageContext.joinRRContent.Children &&
          <section className="join-rr-promoted-content">
            <Row>
              <SectionLine />
              <Col xs={12}>
                <Row>
                  {pageContext.joinRRContent.Children.map((service) => {
                    return (
                      <Col md={4} sm={6} xs={12}>
                        <div className="promoted-content">
                          <div className="promoted-content-image">
                            <img
                              alt="placeholder"
                              src={service.serviceImage}
                              className="img-fluid"
                            />
                          </div>
                          <div className="promoted-content-content">
                            <h3>{service.title}</h3>
                            <p>
                              {service.text}
                            </p>
                            <a href={service.link} className="btn btn-primary">
                              See all
                            </a>
                          </div>
                        </div>
                      </Col>
                    )
                  })}
                  {/* <Col md={4} sm={6} xs={12}>
                    <div className="promoted-content">
                      <div className="promoted-content-image">
                        <img
                          alt="placeholder"
                          src={JoinRR2}
                          className="img-fluid"
                        />
                      </div>
                      <div className="promoted-content-content">
                        <h3>{pageContext.Children.podcastsTitle}</h3>
                        <p>
                          {pageContext.Children.podcastsText}
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
                          src={pageContext.joinRRContent.introImage}
                          className="img-fluid"
                        />
                      </div>
                      <div className="promoted-content-content">
                        <h3>{pageContext.content[0].speakerEventsTitle}</h3>
                        <p>
                          {pageContext.content[0].speakerEventsText}
                        </p>
                      </div>
                    </div>
                  </Col>

                  <Col md={4} sm={6} xs={12}>
                    <div className="promoted-content">
                      <div className="promoted-content-image">
                        <img
                          alt="placeholder"
                          src={JoinRR4}
                          className="img-fluid"
                        />
                      </div>
                      <div className="promoted-content-content">
                        <h3>{pageContext.content[0].productReviewsTitle}</h3>
                        <p>
                          {pageContext.content[0].productReviewsText}
                        </p>
                      </div>
                    </div>
                  </Col> */}
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
          <Supporters partnersMacroContent={pageContext.partnersMacroContent} />
        </Container>
      </section>
    </Layout>
  )
}

export default JoinResearchReviewTemplate
