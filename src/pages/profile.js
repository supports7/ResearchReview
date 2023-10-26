import React, { useEffect, useState } from "react" //, useCallback
import { navigate, Link } from 'gatsby'
import { Container, Row, Col } from "react-bootstrap"
import Layout from "../components/layout"
//import Supporters from "../components/supporters"
import SectionLine from "../components/sectionLine"
// import JoinRR from "../components/JoinRR"
import Cookies from "universal-cookie"
import CircularProgress from "@mui/material/CircularProgress"

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
  const [phone, setPhone] = useState();
  const [organisation, setOrganisation] = useState();
  const [healthProfessional, setHealthProfessional] = useState();
  const [loading, setLoading] = useState(true);


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
      if (userDataFromCookies.full_Name) {
        setFullName(userDataFromCookies.full_Name)
      }
      else {
        setFullName(userDataFromCookies.first_Name + " " + userDataFromCookies.last_Name)
      }
      setEmail(userDataFromCookies.email)
      setProfession(userDataFromCookies.profession)
      setPhone(userDataFromCookies.phone)
      setOrganisation(userDataFromCookies.organisation)
      setHealthProfessional(userDataFromCookies.health_Professional)
    }
    setLoading(false);
  }, []);

  const toggleEditProfile = () => {
    setIsEditingProfile(!isEditingProfile);
  };


  const handleSubmit = async event => {
    event.preventDefault()
    console.log("data", firstName, lastName, email, profession, organisation, healthProfessional);

    if (firstName && lastName && email && profession) {
      // loadLogin();
      // Send email and password entered to store/saga
      const fullName = firstName + " " + lastName;
      setFullName(fullName);

      const jsonData = profileData;
      jsonData.full_Name = fullName;
      jsonData.first_Name = firstName;
      jsonData.last_Name = lastName;
      jsonData.email = email;
      jsonData.phone = phone;
      jsonData.profession = profession;
      jsonData.health_Professional = healthProfessional;
      jsonData.organisation = organisation;
      console.log("jsonData", jsonData);
      setLoading(true);
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
            setProfileData(result);
            setLoading(false);
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
              {loading ? (
                <div className="search-loading">
                  <CircularProgress />
                </div>
              ) : (
                <div>
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
                                  <div className="form-group form-phone-div">
                                    <input
                                      type="text"
                                      name="phone"
                                      className="form-control mt-1"
                                      placeholder="Phone Number"
                                      required
                                      value={phone}
                                      onChange={e => setPhone(e.target.value)}
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
                                <Col xs={8}>
                                  <div id="wrapper">
                                    <label htmlFor="yes_no_radio">Are you a health professional?</label>
                                    <p>
                                      <input type="radio" name="yes_no" onChange={e => setHealthProfessional(true)} defaultChecked={healthProfessional} />Yes
                                    </p>

                                    <p>
                                      <input type="radio" name="yes_no" onChange={e => setHealthProfessional(false)} defaultChecked={!healthProfessional} />No
                                    </p>

                                  </div>
                                </Col>
                              </Col>
                              <Col xs={12} className="pt-2" style={{ display: "flex" }}>
                                <p>
                                  <button
                                    type="submit"
                                    className="btn btn-primary"
                                  >
                                    Submit
                                  </button>
                                </p>
                                <p><a className="btn btn-secondary mx-2" onClick={toggleEditProfile}>Cancel</a></p>
                              </Col>
                            </Row>
                          </form>

                        </div>
                      ) : (
                        <div>
                          <p><strong>NAME:</strong> {fullName}</p>
                          <p><strong>EMAIL:</strong> {email}</p>
                          {profileData.phone && phone && <p><strong>Phone:</strong> {phone}</p>}
                          {profileData.profession && profession && <p><strong>Profession:</strong> {profession}</p>}
                          {profileData.organisation && organisation && <p><strong>Organisation:</strong> {organisation}</p>}
                          {profileData.health_Professional && healthProfessional && <p><strong>Health Professional:</strong> {healthProfessional ? "Yes" : "No"}</p>}
                          <p>
                            <a className="btn btn-primary mr-1" onClick={toggleEditProfile}>Edit Profile</a>
                            <Link className="btn btn-primary mx-1" to="/change-password">Change Password</Link>
                            <Link className="btn btn-primary ml-1" to="/subscriptions">Change Subscriptions</Link>
                          </p>
                        </div>
                      )}
                    </div>
                  }
                </div>
              )}
            </Col>
          </section>
        </Row>
      </Container>
      {/* <section>
        <Container fluid>
          <Supporters />
        </Container>
      </section> */}
    </Layout >
  )
}

export default Profile
