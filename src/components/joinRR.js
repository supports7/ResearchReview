import React, { useState, useEffect } from "react"
import { Row, Col } from "react-bootstrap"
import SectionLine from "./sectionLine"
import logoResearchReview from "../images/logos/RRAUS leader no subs.png"
import { navigate } from "gatsby";
import ReCAPTCHA from "react-google-recaptcha"
import Cookies from "universal-cookie"

const JoinRR = () => {
  const cookies = new Cookies()
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
          window.location.reload()
        )
    }
  }

  function onChangeRecaptcha(value) {
    setRecaptchaData(value);
  }

  return (
    <section className="join-research-review-form-section">
      <Row>
        <Col xs={12}>
          <h2>JOIN RESEARCH REVIEW</h2>
        </Col>
        <SectionLine />
        <Col md={8} sm={6} xs={12}>
          <form onSubmit={handleSubmit} className="join-rr-form join-research-review-form">
            <Row>
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
                    placeholder="Profession"
                    required
                    value={profession}
                    onChange={e => setProfession(e.target.value)}
                  ></input>
                </div>
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
        <Col md={4} sm={6} xs={12} className="jrr-cta-main-div">
          <div className="jrr-cta-logo">
            <img
              alt="research review logo"
              src={logoResearchReview}
              className="img-fluid"
            />
          </div>
        </Col>
      </Row>
    </section>
  )
}

export default JoinRR
