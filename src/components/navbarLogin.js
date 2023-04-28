import React, { useEffect, useState, useRef } from "react"
import { Row, Col } from "react-bootstrap"
import { Link } from "gatsby"
import CircularProgress from "@mui/material/CircularProgress"
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos"
import Cookies from "universal-cookie"


function LoginForm() {
  const cookies = new Cookies()
  const loginToken = cookies.get("LoginToken");  
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [loggedIn, setLoggedIn] = useState(false)
  const [userData, setUserData] = useState()
  const [errorMessage, setErrorMessage] = useState("")
  const [loadingLogin, setLoadingLogin] = useState(true)
  const inputRef = useRef(null);
  
  const handleUsernameInputChange = (event) => {
    setUsername(event.target.value);
  };
  const handlePasswordInputChange = (event) => {
    setPassword(event.target.value);
  };

  
  useEffect(() => {
    if (errorMessage) {
      console.log(errorMessage)
    }
  }, [errorMessage])

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

  return (
    <div>
      {!loadingLogin && (
        <div>
          {!loggedIn && (
            <form onSubmit={handleSubmit} id="navbar-login">
              <Row>
                {errorMessage &&
                  <Col xs={12}>
                    {/* {errorMessage} */}
                  </Col>
                }
                <Col xs={12} md={6}>
                  <div className="form-group login-form-username-div">
                    <input
                      type="text"
                      name="username"
                      className="form-control"
                      placeholder="Email"
                      required
                      value={username}
                      ref={inputRef}
                      onChange={handleUsernameInputChange}
                    ></input>
                  </div>
                </Col>
                <Col xs={12} md={6}>
                  <div className="form-group login-form-password-div">
                    <input
                      type="password"
                      name="password"
                      className="form-control"
                      placeholder="Password"
                      required
                      value={password}
                      onChange={handlePasswordInputChange}
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
  )
}

export default LoginForm