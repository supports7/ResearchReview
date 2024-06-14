import React, { useEffect, useState } from "react" //, useCallback
import { navigate, Link } from 'gatsby'
import { Container, Row, Col } from "react-bootstrap"
import Layout from "../components/layout"
//import Supporters from "../components/supporters"
import SectionLine from "../components/sectionLine"
// import JoinRR from "../components/JoinRR"
import Cookies from "universal-cookie"
import CircularProgress from "@mui/material/CircularProgress"
import { find } from 'lodash';
import config from "../../config";

const Profile = ({ pageContext }) => {
  const cookies = new Cookies()
  const loginToken = cookies.get("LoginToken");

  const [profileData, setProfileData] = useState("");
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [fullName, setFullName] = useState();
  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();
  const [email, setEmail] = useState();
  const [profession, setProfession] = useState("");
  const [subProfession, setSubProfession] = useState("");
  const [subProfessionArray, setSubProfessionArray] = useState([]);
  const [location, setLocation] = useState("");
  const [phone, setPhone] = useState();
  const [organisation, setOrganisation] = useState();
  const [ahpraNumber, setAHPRANumber] = useState();
  
  const [healthProfessional, setHealthProfessional] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log("pageContext", pageContext);
    if (profileData.location) {
      const matchedLocation = pageContext.signUpFormContent.locations.locations.find(
        loc => loc === profileData.location
      );
      if (matchedLocation) {
        setLocation(matchedLocation);
      }
    }
    if (profileData.profession) {
      const matchedProfession = pageContext.signUpFormContent.professions.find(
        prof => prof.name === profileData.profession
      );
      console.log("matchedProfession", matchedProfession)
      console.log("professionsContent", pageContext.signUpFormContent.professions)

      if (matchedProfession) {
        setProfession(matchedProfession.name);
        const selectedProfession = find(pageContext.signUpFormContent.professions, { name: matchedProfession.name });
        console.log("selectedProfession", selectedProfession.sub_Specialties)
        if(selectedProfession.sub_Specialties) {
          setSubProfessionArray(selectedProfession.sub_Specialties);
        }
      }
    }
  }, [profileData, pageContext]);

  useEffect(() => {
    if (profileData.sub_Specialty && profession && subProfessionArray) {
      const matchedSubSpecialty = subProfessionArray.find(
        sub => sub === profileData.sub_Specialty
      );
      if (matchedSubSpecialty) {
        setSubProfession(matchedSubSpecialty);
      }
    }
  }, [profileData, profession]);

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
      // setProfession(userDataFromCookies.profession)
      // setSubProfessionArray(userDataFromCookies.sub_Specialty)
      // setLocation(userDataFromCookies.location)
      setOrganisation(userDataFromCookies.organisation)
      setHealthProfessional(userDataFromCookies.health_Professional)
      if(userDataFromCookies.custom_Data) {
        const customData = JSON.parse(userDataFromCookies.custom_Data);
        if(customData.AHPRANumber) {
          setAHPRANumber(customData.AHPRANumber)
        }
        if(customData.Phone) {
          setPhone(customData.Phone)
        }
      }
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

      // const jsonData = profileData;
      // jsonData.full_Name = fullName;
      // jsonData.first_Name = firstName;
      // jsonData.last_Name = lastName;
      // jsonData.email = email;
      // jsonData.phone = phone;
      // jsonData.profession = profession;
      // jsonData.health_Professional = healthProfessional;
      // jsonData.organisation = organisation;
      const customData = {
        AHPRANumber: ahpraNumber,
        Phone: phone,
      };
      const customDataJSON = JSON.stringify(customData);

      const jsonData = {
        First_Name: firstName,
        Last_Name: lastName,
        Email: email,
        Health_Professional: healthProfessional,
        Custom_Data: customDataJSON,
        Profession: profession,
        Sub_Specialty: subProfession,
        Organisation: organisation,
        Country_of_Practice: config.country,
        Location: location,
      }


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

  const handleProfessionChange = (e) => {
    setProfession(e.target.value);
    const selectedProfession = find(pageContext.signUpFormContent.professions, { name: e.target.value });
    setSubProfessionArray(selectedProfession.sub_Specialties);
  };

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
                    <div className="join-research-review">
                      {isEditingProfile ? (
                        <div>
                          <form
                            onSubmit={handleSubmit}
                            className="join-research-review-form p-0"
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
                                {config.countryCode === "AU" &&
                                  <Col xs={8}>
                                    <div className="form-group form-phone-div">
                                      <input
                                        type="text"
                                        name="ahpraNumber"
                                        className="form-control mt-1"
                                        placeholder="AHPRA Number"
                                        required
                                        value={ahpraNumber}
                                        onChange={e => setAHPRANumber(e.target.value)}
                                      ></input>
                                    </div>
                                  </Col>
                                }
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
                                <Col xs={12} md={8}>
                                  <div className="form-group form-profession-div">
                                    <select
                                      name="location"
                                      required
                                      value={location}
                                      onChange={e => setLocation(e.target.value)}
                                    >
                                      <option value="Select Location" className="placeholder-option">Select Location</option>
                                      {pageContext.signUpFormContent.locations && pageContext.signUpFormContent.locations.locations.map((locationOption, index) => (
                                        <option key={index} value={locationOption}>
                                          {locationOption}
                                        </option>
                                      ))}
                                    </select>
                                  </div>
                                </Col>
                                <Col xs={12} md={8}>
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
                                <Col xs={12} md={8}>
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
                                <Col xs={8}>
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
