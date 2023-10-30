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
  const [errorMessageTemp, setErrorMessageTemp] = useState("")
  const [loadingLogin, setLoadingLogin] = useState(true)
  const inputRef = useRef(null);
  
  const handleUsernameInputChange = (event) => {
    setUsername(event.target.value);
  };
  const handlePasswordInputChange = (event) => {
    setPassword(event.target.value);
  };

  function isJSONString(str) {
    try {
      JSON.parse(str);
      return true;
    } catch (e) {
      return false;
    }
  }

  useEffect(() => {
    if (errorMessageTemp) {
      // Parse the error messages and display them
      if(isJSONString(errorMessageTemp)) {
        let JSONObjectError = JSON.parse(errorMessageTemp);
        // if error message has email field get message else set message
        if(JSONObjectError.errors) {
          console.log(JSONObjectError.errors.Email)
          if(JSONObjectError.errors.Email) {
            setErrorMessage(JSONObjectError.errors.Email[0])
          }
        }
      }
        else {
          setErrorMessage(errorMessageTemp);
      }
    }
  }, [errorMessageTemp])

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
      .then(async res => {
        if (!res.ok) {
          const responseText = await res.text(); // Get the response as text
          if (res.status === 400) {
            // Handle a 400 Bad Request error, assuming it contains a text message
            throw new Error(`${responseText}`);
          }
          // Handle other non-OK responses here if needed
          throw new Error(`${res.status}`);
        }
        return res.json();
      })
      .then(result => {
        // Handle JSON response as before
        console.log("STRAIGHT RESULTS");
        if (result.errors) {
          // Handle errors
          setLoadingLogin(false);
          setErrorMessageTemp(result.errors);
          setLoggedIn(false);
          return;
        }
        // Handle successful response
        setLoadingLogin(false);
        setLoggedIn(true);
        setUserData(result);
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
        window.location.reload();
      })
      .catch(error => {
        // Handle all other errors, including the ones we explicitly threw
        console.log("STRAIGHT ERROR");
        setLoadingLogin(false);
        setLoggedIn(false);
        console.error("error message", error.message);
        setErrorMessageTemp(error.message);
      });
      console.log(username.value, password.value)
    }
  }

  return (
    <div>
      {!loadingLogin && (
        <div>
          {!loggedIn && (
            <form onSubmit={handleSubmit} className="navbar-login-form">
              <Row>
                <Col className="offset-md-2 col-md-10" style={{height: '24px'}}>
                  {errorMessage}
                </Col>
                <Col xs={12} md={2} style={{display: 'grid'}}>
                  <h6 style={{alignSelf: 'center', textAlign: 'end', marginBottom: 0}}>LOGIN</h6>    
                </Col>
                <Col xs={12} md={5}>
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
                <Col xs={12} md={5}>
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
                <Col xs={12}>
                  <a className="float-end" href="/forgotten-password">Forgot your password?</a>
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