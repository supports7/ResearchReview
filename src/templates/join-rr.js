import React, { useState, useEffect } from "react";
import Layout from "../components/layout";
import SectionLine from "../components/sectionLine";
import { Row, Col, Container, Modal, Button } from "react-bootstrap";
import Supporters from "../components/supporters";
import ReCAPTCHA from "react-google-recaptcha";
import Cookies from "universal-cookie";
import DoubleAd from "../components/doubleAd";
import FullScreenAd from "../components/fullScreenAd";
import config from "../../config";
import { navigate } from "gatsby";
import { find } from 'lodash';
import he from 'he';

const JoinResearchReviewTemplate = ({ pageContext }) => {
  console.log("pageContext", pageContext);
  const cookies = new Cookies()
  //const siteTitle = `Join Research Review`
  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();
  const [email, setEmail] = useState();
  const [profession, setProfession] = useState("");
  const [subProfession, setSubProfession] = useState("");
  const [subProfessionArray, setSubProfessionArray] = useState([]);
  const [location, setLocation] = useState("");
  const [registerPassword, setRegisterPassword] = useState();
  const [registerPasswordConfirm, setRegisterPasswordConfirm] = useState();
  const [organisation, setOrganisation] = useState('');
  const [ahpraNumber, setAHPRANumber] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [healthProfessional, setHealthProfessional] = useState('');
  const [confirmTAndCs, setConfirmTAndCs] = useState('');
  const [registerError, setRegisterError] = useState();
  const [recaptchaData, setRecaptchaData] = useState();
  const recaptchaRef = React.createRef();
  const introText = he.decode(pageContext.content.introText);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [popupContent, setPopupContent] = useState({
    heading: 'Get Free publications straight to your inbox.',
    text: 'Thank you for subscribing. Your account is under review, and you will receive an email from our database team within 48 hours confirming which publications you would like to subscribe to.',
  });

  const handleConfirmTAndCsChange = (e) => {
    setConfirmTAndCs(e.target.value);
  };

  const showSuccessMessage = () => {
    setShowSuccessPopup(true);
  };

  const hideSuccessMessage = () => {
    setShowSuccessPopup(false);
  };

  const handleProfessionChange = (e) => {
    setProfession(e.target.value);
    const selectedProfession = find(pageContext.signUpFormContent.professions, { name: e.target.value });
    setSubProfessionArray(selectedProfession.sub_Specialties);
  };

  const handleSubmit = async event => {
    event.preventDefault()
    setRegisterError("");

    if (firstName && lastName && email && profession && registerPassword && registerPasswordConfirm && recaptchaData) {

      if (registerPassword != registerPasswordConfirm) {
        setRegisterError("Passwords do not match. Please try again.")
        return;
      }
      if (!healthProfessional) {
        setRegisterError("Sign-up is only for Health Professionals.")
        return;
      }
      if (!confirmTAndCs) {
        setRegisterError("Please accept the Terms and Conditions to proceed.")
        return;
      }
      if (!recaptchaData) {
        setRegisterError("reCAPTCHA not complete.")
        return;
      }
      if (profession == "") {
        setRegisterError("Please select your profession")
        return
      }
      const customData = {
        AHPRANumber: ahpraNumber,
        Phone: phoneNumber,
      };
      const customDataJSON = JSON.stringify(customData);

      const jsonData = {
        First_Name: firstName,
        Last_Name: lastName,
        Email: email,
        Password_Hash: registerPassword,
        Health_Professional: healthProfessional,
        Custom_Data: customDataJSON,
        Profession: profession,
        Sub_Specialty: subProfession,
        Organisation: organisation,
        Country_of_Practice: config.country,
        Location: location,
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
            //  console.log("result", result)
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
          showSuccessMessage()
        )
    }
  }

  function onChangeRecaptcha(value) {
    setRecaptchaData(value);
  }
  useEffect(() => {
    // console.log("pageContext", pageContext)
  }, [pageContext])

  return (
    <Layout>
      <section
        id="join-research-review-page"
        className="join-research-review"
        style={{
          backgroundImage: `url('${pageContext.content.bannerImage}')`,
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
                        {registerError &&
                          <Col xs={12}>
                            <div className="alert alert-danger">
                              <p>{registerError}</p>
                            </div>
                          </Col>
                        }
                        <Col xs={12} md={6}>
                          <div className="form-group form-first-name-div">
                            <input
                              type="text"
                              name="firstName"
                              placeholder="First Name *"
                              required
                              value={firstName}
                              onChange={e => setFirstName(e.target.value)}
                            ></input>
                          </div>
                        </Col>
                        <Col xs={12} md={6}>
                          <div className="form-group form-last-name-div">
                            <input
                              type="text"
                              name="lastName"
                              placeholder="Last Name *"
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
                              placeholder="Email *"
                              required
                              value={email}
                              onChange={e => setEmail(e.target.value)}
                            ></input>
                          </div>
                        </Col>
                        <Col xs={12} md={6}>
                          <div className="form-group form-phone-number-div">
                            <input
                              type="text"
                              name="phoneNumber"
                              placeholder="Home/Work Phone Number"
                              required
                              value={phoneNumber}
                              onChange={e => setPhoneNumber(e.target.value)}
                            ></input>
                          </div>
                        </Col>
                        <Col xs={12} md={6}>
                          <div className="form-group form-organisation-div">
                            <input
                              type="text"
                              name="organisation"
                              placeholder="Organisation"
                              required
                              value={organisation}
                              onChange={e => setOrganisation(e.target.value)}
                            ></input>
                          </div>
                        </Col>
                        {config.countryCode === "AU" &&
                          <Col xs={12}>
                            <div className="form-group form-phone-number-div">
                              <input
                                type="text"
                                name="ahpraNumber"
                                placeholder="AHPRA Number"
                                required
                                value={ahpraNumber}
                                onChange={e => setAHPRANumber(e.target.value)}
                              ></input>
                            </div>
                          </Col>
                        }
                        <Col xs={12} md={6}>
                          <div className="form-group form-profession-div">
                            <input
                              type="password"
                              name="registerPassword"
                              placeholder="Password *"
                              required
                              value={registerPassword}
                              onChange={e => setRegisterPassword(e.target.value)}
                            ></input>
                          </div>
                        </Col>
                        <Col xs={12} md={6}>
                          <div className="form-group form-profession-div">
                            <input
                              type="password"
                              name="registerPasswordConfirm"
                              placeholder="Confirm Password *"
                              required
                              value={registerPasswordConfirm}
                              onChange={e => setRegisterPasswordConfirm(e.target.value)}
                            ></input>
                          </div>
                        </Col>
                        {/* <Col xs={12}>
                <div className="form-group form-profession-div">
                  <input
                    type="text"
                    name="profession"
                    placeholder="Profession"
                    required
                    value={profession}
                    onChange={e => setProfession(e.target.value)}
                  ></input>
                </div>
              </Col> */}
                        <Col xs={12} md={6}>
                          <div className="form-group form-profession-div">
                            <select
                              name="location"
                              required
                              value={location}
                              onChange={e => setLocation(e.target.value)}
                            >
                              <option value="Select Location" className="placeholder-option">Select Location</option>
                              {pageContext.signUpFormContent && pageContext.signUpFormContent.locations.locations.map((locationOption, index) => (
                                <option key={index} value={locationOption}>
                                  {locationOption}
                                </option>
                              ))}
                            </select>
                          </div>
                        </Col>
                        <Col xs={12} md={6}>
                          <div className="form-group form-profession-div">
                            <select
                              name="profession"
                              required
                              value={profession}
                              onChange={e => handleProfessionChange(e)}
                            >
                              <option value="Select Profession" className="placeholder-option">Select Profession</option>
                              {pageContext.signUpFormContent && pageContext.signUpFormContent.professions.map((professionOption, index) => (
                                <option key={index} value={professionOption.name}>
                                  {professionOption.name}
                                </option>
                              ))}
                            </select>
                          </div>
                        </Col>
                        <Col xs={12} md={6}>
                          <div className="form-group form-profession-div">
                            <select
                              name="subProfession"
                              required
                              value={subProfession}
                              onChange={e => setSubProfession(e.target.value)}
                            >
                              <option value="Select a Sub Profession" className="placeholder-option">Select a Sub Profession</option>
                              {subProfessionArray && subProfessionArray.map((subProfessionOption, index) => (
                                <option key={index} value={subProfessionOption}>
                                  {subProfessionOption}
                                </option>
                              ))}
                            </select>
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
                              onChange={handleConfirmTAndCsChange}
                              style={{ marginRight: '10px' }}
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
        <Modal show={showSuccessPopup} onHide={hideSuccessMessage} centered>
          <Modal.Header closeButton>
            <Modal.Title>{popupContent.heading}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>{popupContent.text}</p>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={hideSuccessMessage}>
              Continue
            </Button>
          </Modal.Footer>
        </Modal>
      </section>
      <Container>
        <section className="join-rr-second-section">
          <Row>
            <Col md={9} xs={12}>
              <div className="join-rr-left-side">
                <img
                  alt="placeholder"
                  src={pageContext.content.introImage}
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
        {pageContext.content.Children &&
          <section className="join-rr-promoted-content">
            <Row>
              <SectionLine />
              <Col xs={12}>
                <Row>
                  {pageContext.content.Children.map((service) => {
                    if (service.serviceImage) {
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
                    }
                  })}
                </Row>
              </Col>
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
