import React, { useEffect, useState, useCallback } from "react"
import { navigate } from 'gatsby'
import { Container, Row, Col } from "react-bootstrap"
import Layout from "../components/layout"
import Supporters from "../components/supporters"
// import JoinRR from "../components/JoinRR"

const ForgottenPassword = () => {
  const [email, setEmail] = useState("");
  const [confirmEmail, setConfirmEmail] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  
  useEffect(() => {

  }, []);

  const submitLogin = useCallback((event) => {
    setSuccessMessage("");
    setErrorMessage("");
    const { email, confirmEmail } = document.forms[2]
    console.log(email, confirmEmail)
    event.preventDefault();
    if (email.value && confirmEmail.value) {
      if (email.value != confirmEmail.value) {
        setErrorMessage("Emails do not match. Please try again");
        return
      }

      const jsonData = {
        Email: email.value,
      }


      fetch(`https://researchreview.dev.s05.system7.co.nz/api/users/forgottenPassword`, {
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
          },

          error => {
            console.log("error", error);
          }
        )
        .then(
          setSuccessMessage("Reset password email sent successfully")
        )
    }
  })

  return (
    <Layout>
      <Container>
        <Row>
          <Col xs={12}>
            <section className="password-page-form-section">
              <Row className="justify-content-center">
                <Col xs={6} className="password-page-form-main-div">
                  {successMessage &&
                    <Col xs={12}>
                      <div className="alert alert-success">
                        <p>{successMessage}</p>
                      </div>
                    </Col>
                  }
                  {!successMessage &&
                    <div>
                      <div>
                        <p>Please enter your email address below to recieve a password reset</p>
                      </div>
                      <form onSubmit={submitLogin} className="password-page-form">
                        <Col xs={12}>
                          <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                        </Col>
                        <Col xs={12}>
                          <input type="email" placeholder="Confirm Email" value={confirmEmail} onChange={(e) => setConfirmEmail(e.target.value)} />
                        </Col>
                        {errorMessage &&
                          <Col xs={12}>
                            <div className="alert alert-danger">
                              <p>{errorMessage}</p>
                            </div>
                          </Col>
                        }
                        <Col xs={12}>
                          <button type="submit" className="btn btn-primary">Reset Password</button>
                        </Col>
                      </form>
                    </div>
                  }
                </Col>
              </Row>
            </section>
          </Col>
        </Row>
      </Container>
      <section>
        <Container fluid>
          <Supporters />
        </Container>
      </section>
    </Layout>
  )
}

export default ForgottenPassword
