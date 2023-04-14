import React, { useEffect, useState, useCallback } from "react"
import { navigate } from 'gatsby'
import { Container, Row, Col } from "react-bootstrap"
import Layout from "../components/layout"
import Supporters from "../components/Supporters"
import JoinRR from "../components/JoinRR"
import Cookies from "universal-cookie"

const ChangePassword = () => {
  const cookies = new Cookies()
  
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    const userDataFromCookies = cookies.get("userData")
    if (!userDataFromCookies) {
      navigate('/')
    }
  }, []);

  const submitLogin = useCallback((event) => {
    setErrorMessage("");
    const userDataFromCookies = cookies.get("userData")
    const { oldPassword, newPassword, confirmNewPassword } = document.forms[2]
    console.log(oldPassword, newPassword, confirmNewPassword)
    event.preventDefault();

    if (oldPassword.value && newPassword.value && confirmNewPassword.value && userDataFromCookies.id) {
      if (newPassword.value != confirmNewPassword.value) {
        setErrorMessage("New password does not match. Please try again");
        return
      }

      const jsonData = {
        Id: userDataFromCookies.id,
        OldPassword: oldPassword.value,
        NewPassword: newPassword.value,
      }


      fetch(`https://researchreview.dev.s05.system7.co.nz/api/users/changePassword`, {
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
        ).then(
          setSuccessMessage("Password reset successfully")
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
                        <p>Please enter your old password and the password you wish to change it to below.</p>
                      </div>
                      <form onSubmit={submitLogin} className="password-page-form">
                        <Col xs={12}>
                          <input type="password" placeholder="Old Password" value={oldPassword} onChange={(e) => setOldPassword(e.target.value)} />
                        </Col>
                        <Col xs={12}>
                          <input type="password" placeholder="New Password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
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

export default ChangePassword
