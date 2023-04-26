import React, { useEffect, useState, useCallback } from "react"
import { navigate, Link } from 'gatsby'
import { Container, Row, Col } from "react-bootstrap"
import Layout from "../components/layout"
import Supporters from "../components/supporters"
import SectionLine from "../components/sectionLine"
// import JoinRR from "../components/JoinRR"
import Cookies from "universal-cookie"

const Profile = () => {
  const cookies = new Cookies()
  const loginToken = cookies.get("LoginToken");

  const [profileData, setProfileData] = useState("");
  const [isEditingProfile, setIsEditingProfile] = useState(false);

  const [fullName, setFullName] = useState();
  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();
  const [email, setEmail] = useState();
  const [profession, setProfession] = useState();
  const [healthProfessional, setHealthProfessional] = useState();

  useEffect(() => {
    const userDataFromCookies = cookies.get("userData")
    if (!userDataFromCookies) {
      navigate('/')
    }
    else {
      console.log("profileData", userDataFromCookies);
      setProfileData(userDataFromCookies);

      setFirstName(userDataFromCookies.first_Name)
      setLastName(userDataFromCookies.last_Name)
      setFullName(userDataFromCookies.full_Name)
      setEmail(userDataFromCookies.email)
      setProfession(userDataFromCookies.profession)
      setHealthProfessional(userDataFromCookies.health_Professional)
    }
  }, []);

  const startEditProfile = () => {
    setIsEditingProfile(true);
  };


  const handleSubmit = async event => {
    event.preventDefault()
    const { firstName, lastName, email, profession } = document.forms[1]

    if (firstName.value && lastName.value && email.value && profession.value) {
      // loadLogin();
      // Send email and password entered to store/saga
      const fullName = firstName.value + " " + lastName.value;
      setFullName(fullName);

      const jsonData = profileData;
      jsonData.full_Name = fullName;
      jsonData.first_Name = firstName.value;
      jsonData.last_Name = lastName.value;
      jsonData.email = email.value;
      jsonData.profession = profession.value;

      fetch(`https://researchreview.dev.s05.system7.co.nz/api/users/${profileData.id}`, {
        method: "PUT",
        // mode: 'no-cors',
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer " + loginToken,
        },
        body: JSON.stringify(jsonData),
      })
        .then(res => res.json())
        .then(
          result => {
            console.log("result", result);

            cookies.set("userData", result, {
              path: "/",
              expires: new Date(Date.now() + 8640000),
            })
            setIsEditingProfile(false);
          },

          error => {
            console.log("error", error);
          }
        )
    }
  }


  return (
    <Layout>
      <Container>
        <Row>
          <section>
            <Col xs={12}>
              <h2>Profile</h2>
            </Col>
            <SectionLine />
            <Col xs={12}>
              {profileData &&
                <div>
                  {isEditingProfile ? (
                    <div>
                      <form
                        onSubmit={handleSubmit}
                        className="join-research-review-form"
                      >
                        <Row>
                          <Col xs={6}>
                            <Col xs={8}>
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
                            <Col xs={8}>
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
                            <Col xs={8}>
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
                            <Col xs={8}>
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
                            <Col xs={8}>
                              <div id="wrapper">
                                <label for="yes_no_radio">Are you a health professional?</label>
                                <p>
                                  <input type="radio" name="yes_no" onChange={e => setHealthProfessional(true)} defaultChecked={healthProfessional} />Yes
                                </p>

                                <p>
                                  <input type="radio" name="yes_no" onChange={e => setHealthProfessional(false)} defaultChecked={!healthProfessional} />No
                                </p>

                              </div>
                            </Col>
                          </Col>
                          <Col xs={12} className="pt-2">
                            <p>
                              <button
                                type="submit"
                                className="btn btn-primary"
                              >
                                Submit
                              </button>
                            </p>
                          </Col>
                        </Row>
                      </form>

                    </div>
                  ) : (
                    <div>
                      <p><strong>NAME:</strong> {fullName}</p>
                      <p><strong>EMAIL:</strong> {email}</p>
                      {profileData.profession && profession && <p><strong>Profession:</strong> {profession}</p>}
                      <p>
                        <a className="btn btn-primary mr-1" onClick={startEditProfile}>Edit Profile</a>
                        <Link className="btn btn-primary mx-1" to="/change-password">Change Password</Link>
                        <Link className="btn btn-primary ml-1" to="/subscriptions">Change Subscriptions</Link>
                      </p>
                    </div>
                  )}
                </div>
              }
            </Col>
          </section>
        </Row>
      </Container>
      <section>
        <Container fluid>
          <Supporters />
        </Container>
      </section>
    </Layout >
  )
}

export default Profile
