import React, { useState, useEffect } from "react"
import { Row, Col, Modal, Button } from "react-bootstrap"
import SectionLine from "./sectionLine"
import logoResearchReview from "../images/logos/RRAUS leader no subs.png"
//import { navigate } from "gatsby";
import ReCAPTCHA from "react-google-recaptcha"
import Cookies from "universal-cookie"
import config from "../../config";

const JoinRR = (signUpFormContent) => {
  const cookies = new Cookies();
  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();
  const [email, setEmail] = useState();
  const [profession, setProfession] = useState();
  const [location, setLocation] = useState();
  const [registerPassword, setRegisterPassword] = useState();
  const [registerPasswordConfirm, setRegisterPasswordConfirm] = useState();
  const [organisation, setOrganisation] = useState('');
  const [ahpraNumber, setAHPRANumber] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [healthProfessional, setHealthProfessional] = useState('');
  const [confirmTAndCs, setConfirmTAndCs] = useState('');
  const [registerError, setRegisterError] = useState();
  const [recaptchaData, setRecaptchaData] = useState();
  const recaptchaRef = React.createRef();
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [popupContent, setPopupContent] = useState({
    heading: 'Get Free publications straight to your inbox.',
    text: 'Thank you for subscribing. Your account is under review, and you will receive an email from our database team within 48 hours confirming which publications you would like to subscribe to.',
  });
  const [ locations, setLocations ] = useState();
  const [ professions, setProfessions ] = useState();


  // useEffect(() => {
  //   console.log("signUpFormContent", signUpFormContent.signUpFormContent.locations)
  //   if(signUpFormContent && signUpFormContent.signUpFormContent && signUpFormContent.signUpFormContent.locations){
  //     setLocations(signUpFormContent.signUpFormContent.locations);
  //   }
  //   if(signUpFormContent && signUpFormContent.signUpFormContent && signUpFormContent.signUpFormContent.professions){
  //     setProfessions(signUpFormContent.signUpFormContent.professions);
  //   }
  // }, [])

  // const handleConfirmTAndCsChange = (e) => {
  //   setConfirmTAndCs(e.target.value);
  // };

  // const handleSubmit = async event => {
  //   event.preventDefault()
  //   setRegisterError("");

  //   if (firstName && lastName && email && profession && registerPassword && registerPasswordConfirm && recaptchaData) {

  //     if (registerPassword !== registerPasswordConfirm) {
  //       setRegisterError("Passwords do not match. Please try again.")
  //       return;
  //     }
  //     if (!healthProfessional) {
  //       setRegisterError("Sign-up is only for Health Professionals.")
  //       return;
  //     }
  //     if (!confirmTAndCs) {
  //       setRegisterError("Please accept the Terms and Conditions to proceed.")
  //       return;
  //     }
  //     if (!recaptchaData) {
  //       setRegisterError("reCAPTCHA not complete.")
  //       return;
  //     }
  //     const jsonData = {
  //       First_Name: firstName,
  //       Last_Name: lastName,
  //       Email: email,
  //       Password_Hash: registerPassword,
  //       Health_Professional: healthProfessional,
  //       Custom_Data: {
  //         Location: location,
  //         AHPRANumber: ahpraNumber
  //       },
  //       Profession: profession,
  //       Phone: phoneNumber,
  //       Organisation: organisation,
  //     }

  //     fetch(`https://researchreview.dev.s05.system7.co.nz/api/users/register`, {
  //       method: "POST",
  //       // mode: 'no-cors',
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify(jsonData),
  //     })
  //       .then(res => res.json())
  //       .then(
  //         result => {
  //           console.log("result", result)
  //           cookies.set("userData", result, {
  //             path: "/",
  //             expires: new Date(Date.now() + 8640000),
  //           })
  //           cookies.set("EncryptionKey", result.encryptionKey, {
  //             path: "/",
  //             expires: new Date(Date.now() + 8640000),
  //           })
  //           showSuccessMessage()
  //         },

  //         error => {
  //           console.log("error", error);
  //         }
  //       )
  //   }
  // }

  // function onChangeRecaptcha(value) {
  //   setRecaptchaData(value);
  // }

  // const showSuccessMessage = () => {
  //   setShowSuccessPopup(true);
  // };

  // const hideSuccessMessage = () => {
  //   setShowSuccessPopup(false);
  // };

  return (
    <section className="join-research-review-form-section">
      <Row>
        <Col xs={12}>
          <h2>JOIN RESEARCH REVIEW</h2>
        </Col>
        <SectionLine />
        <Col md={8} sm={6} xs={12}>
          <p>Research Review publications bring the best of 10,000 worldwide medical journals to your inbox every issue 
            with commentary from Australian experts. Over 50 areas including Cardiology, Diabetes, Oncology, 
            General Practice and Psychiatry. Specialist opinions on guidelines, medicines and conferences. 
            All Research Review publications are free to receive.</p>
            <a className="btn btn-primary" href="/join-research-review">Join Now</a>
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


// <form onSubmit={handleSubmit} className="join-rr-form join-research-review-form">
//             <Row>
//               {registerError &&
//                 <Col xs={12}>
//                   <div className="alert alert-danger">
//                     <p>{registerError}</p>
//                   </div>
//                 </Col>
//               }
//               <Col xs={12} md={6}>
//                 <div className="form-group form-first-name-div">
//                   <input
//                     type="text"
//                     name="firstName"
//                     placeholder="First Name *"
//                     required
//                     value={firstName}
//                     onChange={e => setFirstName(e.target.value)}
//                   ></input>
//                 </div>
//               </Col>
//               <Col xs={12} md={6}>
//                 <div className="form-group form-last-name-div">
//                   <input
//                     type="text"
//                     name="lastName"
//                     placeholder="Last Name *"
//                     required
//                     value={lastName}
//                     onChange={e => setLastName(e.target.value)}
//                   ></input>
//                 </div>
//               </Col>
//               <Col xs={12}>
//                 <div className="form-group form-email-div">
//                   <input
//                     type="email"
//                     name="email"
//                     placeholder="Email *"
//                     required
//                     value={email}
//                     onChange={e => setEmail(e.target.value)}
//                   ></input>
//                 </div>
//               </Col>
//               <Col xs={12} md={6}>
//                 <div className="form-group form-phone-number-div">
//                   <input
//                     type="text"
//                     name="phoneNumber"
//                     placeholder="Home/Work Phone Number *"
//                     required
//                     value={phoneNumber}
//                     onChange={e => setPhoneNumber(e.target.value)}
//                   ></input>
//                 </div>
//               </Col>
//               <Col xs={12} md={6}>
//                 <div className="form-group form-organisation-div">
//                   <input
//                     type="text"
//                     name="organisation"
//                     placeholder="Organisation *"
//                     required
//                     value={organisation}
//                     onChange={e => setOrganisation(e.target.value)}
//                   ></input>
//                 </div>
//               </Col>
//               {config.countryCode === "AU" &&
//                 <Col xs={12}>
//                   <div className="form-group form-phone-number-div">
//                     <input
//                       type="text"
//                       name="ahpraNumber"
//                       placeholder="AHPRA Number"
//                       required
//                       value={ahpraNumber}
//                       onChange={e => setAHPRANumber(e.target.value)}
//                     ></input>
//                   </div>
//                 </Col>
//               }
//               <Col xs={12} md={6}>
//                 <div className="form-group form-profession-div">
//                   <input
//                     type="password"
//                     name="registerPassword"
//                     placeholder="Password"
//                     required
//                     value={registerPassword}
//                     onChange={e => setRegisterPassword(e.target.value)}
//                   ></input>
//                 </div>
//               </Col>
//               <Col xs={12} md={6}>
//                 <div className="form-group form-profession-div">
//                   <input
//                     type="password"
//                     name="registerPasswordConfirm"
//                     placeholder="Confirm Password"
//                     required
//                     value={registerPasswordConfirm}
//                     onChange={e => setRegisterPasswordConfirm(e.target.value)}
//                   ></input>
//                 </div>
//               </Col>
//               {/* <Col xs={12}>
//                 <div className="form-group form-profession-div">
//                   <input
//                     type="text"
//                     name="profession"
//                     placeholder="Profession"
//                     required
//                     value={profession}
//                     onChange={e => setProfession(e.target.value)}
//                   ></input>
//                 </div>
//               </Col> */}
//               <Col xs={12} md={6}>
//                 <div className="form-group form-profession-div">
//                   <select
//                     name="location"
//                     required
//                     value={location}
//                     onChange={e => setLocation(e.target.value)}
//                   >
//                     <option value="Select Location" className="placeholder-option">Select Location</option>
//                     {locations && locations.Children.map((locationOption, index) => (
//                       <option key={index} value={locationOption.Node}>
//                         {locationOption.Node}
//                       </option>
//                     ))}
//                   </select>
//                 </div>
//               </Col>
//               <Col xs={12} md={6}>
//                 <div className="form-group form-profession-div">
//                   <select
//                     name="profession"
//                     required
//                     value={profession}
//                     onChange={e => setProfession(e.target.value)}
//                   >
//                     <option value="Select Profession" className="placeholder-option">Select Profession</option>
//                     {professions && professions.Children.map((professionOption, index) => (
//                       <option key={index} value={professionOption.Node}>
//                         {professionOption.Node}
//                       </option>
//                     ))}
//                   </select>
//                 </div>
//               </Col>
//               <Col xs={12}>
//                 <div className="form-group-radio-div">
//                   <label htmlFor="yes_no_radio">Are you a health professional?</label>
//                   <p>
//                     <input type="radio" name="yes_no" onChange={e => setHealthProfessional(true)} defaultChecked={healthProfessional} />Yes
//                   </p>

//                   <p>
//                     <input type="radio" name="yes_no" onChange={e => setHealthProfessional(false)} defaultChecked={!healthProfessional} />No
//                   </p>
//                 </div>
//               </Col>
//               <Col xs={12} className="form-group-radio-div">
//                 <label>
//                   <input
//                     type="checkbox"
//                     name="confirmTAndCs"
//                     checked={confirmTAndCs}
//                     onChange={handleConfirmTAndCsChange}
//                     style={{ marginRight: '10px' }}
//                   />
//                   I have read and agree with the <a href="/terms-and-conditions">Terms and Conditions</a>
//                 </label>
//               </Col>
//               <Col xs={12} lg={6}>
//                 <ReCAPTCHA
//                   ref={recaptchaRef}
//                   sitekey="6Lc4jGIjAAAAAGliVhOH19tHcMT5PS4LprB0qK2U"
//                   onChange={onChangeRecaptcha}
//                 />
//               </Col>
//               <Col xs={12} lg={6}>
//                 <button type="submit" className="btn btn-primary join-research-review-form-submit">
//                   Submit
//                 </button>
//               </Col>
//             </Row>
//           </form>

{/* <Modal show={showSuccessPopup} onHide={hideSuccessMessage} centered>
<Modal.Header closeButton>
  <Modal.Title>{popupContent.heading}</Modal.Title>
</Modal.Header>
<Modal.Body>
  <p>{popupContent.text}</p>
</Modal.Body>
<Modal.Footer>
  <Button variant="secondary" onClick={hideSuccessMessage}>
    Continue
  </Button>
</Modal.Footer>
</Modal> */}