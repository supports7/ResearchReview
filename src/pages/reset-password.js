import React, { useEffect, useState, useCallback } from "react"
//import { navigate } from 'gatsby'
import { Container, Row, Col } from "react-bootstrap"
import Layout from "../components/layout"
import { navigate } from "gatsby";
import Cookies from "universal-cookie";
//import Supporters from "../components/supporters"
// import JoinRR from "../components/JoinRR"

const ResetPassword = () => {
  const cookies = new Cookies()
  const [newPassword, setPassword] = useState("");
  const [confirmNewPassword, setConfirmPassword] = useState("");
  const [passwordResetToken, setPasswordResetToken] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [passwordResetTokenErrorMessage, setPasswordResetTokenErrorMessage] = useState("");

  useEffect(() => {
    setPasswordResetTokenErrorMessage("");
    const params = new URLSearchParams(window.location.search);
    const query = params.get("passwordResetToken");
    if (query) {
      setPasswordResetToken(query);
    } else {
      setPasswordResetTokenErrorMessage("Oops! It looks like the password reset link is missing or expired. Please check your email for the latest reset password link from us. If you didn't receive an email, please make sure to also check your spam or junk folder. If you continue to face issues, you can request another reset password link.");
      return;
    }
  }, []);

  const submitLogin = useCallback((event) => {
    setSuccessMessage("");
    setErrorMessage("");
    console.log(newPassword, confirmNewPassword)
    event.preventDefault();
    if (newPassword && confirmNewPassword) {
      if (newPassword !== confirmNewPassword) {
        setErrorMessage("Passwords do not match. Please try again");
        return
      }

      const jsonData = {
        PasswordResetToken: passwordResetToken,
        NewPassword: newPassword
      }


      fetch(`https://researchreview.dev.s05.system7.co.nz/api/users/resetforgottenpassword`, {
        method: "PUT",
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
            });
            cookies.set("EncryptionKey", result.encryptionKey, {
              path: "/",
              expires: new Date(Date.now() + 8640000),
            });
            cookies.set("LoginToken", result.token, {
              path: "/",
              expires: new Date(Date.now() + 8640000),
            });
            navigate("/");
            return;
          },


          error => {
            console.log("error", error);
            setErrorMessage(error);
          }
        )
        .then(
          setSuccessMessage("Success! Your password has been reset.")
        )
    }
    else {
      setErrorMessage("Fill out all the fields above and please try again");
      return
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
                  {passwordResetTokenErrorMessage ? (
                    <Col xs={12}>
                    <div className="alert alert-danger">
                      <p>{passwordResetTokenErrorMessage}</p>
                    </div>
                  </Col>
                  ) : (<div>
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
                          <p>Please create a new password to secure your account.</p>
                        </div>
                        <form onSubmit={submitLogin} className="password-page-form">
                          <Col xs={12}>
                            <input type="password" placeholder="New Password" value={newPassword} onChange={(e) => setPassword(e.target.value)} />
                          </Col>
                          <Col xs={12}>
                            <input type="password" placeholder="Confirm New Password" value={confirmNewPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                          </Col>
                          {errorMessage &&
                            <Col xs={12}>
                              <div className="alert alert-danger">
                                <p>{errorMessage}</p>
                              </div>
                            </Col>
                          }
                          <Col xs={12}>
                            <button type="submit" className="btn btn-primary">Confirm New Password</button>
                          </Col>
                        </form>
                      </div>
                    }
                  </div>)}
                </Col>
              </Row>
            </section>
          </Col>
        </Row>
      </Container>
    </Layout>
  )
}

export default ResetPassword
