import React, { useState } from "react"
import { Navbar, Container, Nav, NavDropdown, Row, Col } from "react-bootstrap"
import logoResearchReview from "../images/logos/RRAUS leader no subs.png"
// import { Link } from "gatsby"
// import SearchIcon from "@mui/icons-material/Search"
// import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos"
// import Cookies from "universal-cookie";

const JoinResearchReviewForm = () => {
  //   const cookies = new Cookies();
  //   const loginToken = cookies.get("LoginToken");

  const [firstName, setFirstName] = useState()
  const [lastName, setLastName] = useState()
  const [email, setEmail] = useState()
  const [profession, setProfession] = useState()

  const handleSubmit = async event => {
    event.preventDefault()
    const { firstName, lastName, email, profession } = document.forms[0]

    if (firstName.value && lastName.value && email.value && profession.value) {
      // loadLogin();
      // Send email and password entered to store/saga
      console.log(
        firstName.value,
        lastName.value,
        email.value,
        profession.value
      )
      const jsonData = {
        FisrtName: firstName.value,
        LastName: lastName.value,
        Email: email.value,
        Profession: profession.value,
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
        result => {console.log("result", result)},

        error => {
          console.log("error", error);
        }
      )
    }
  }

  return (
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
                    <h2 className="join-research-review-heading">
                      Join Research Review
                    </h2>
                  </div>
                  <form
                    onSubmit={handleSubmit}
                    className="join-research-review-form"
                  >
                    <Row>
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
                        <button
                          type="submit"
                          className="btn btn-primary join-research-review-form-submit"
                        >
                          Submit
                        </button>
                      </Col>
                      <Col xs={6}>
                        <img 
                          alt="research review logo"
                          src={logoResearchReview} 
                          className="img-fluid" />
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
  )
}

export default JoinResearchReviewForm
