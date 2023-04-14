import React, { useState, useEffect } from "react"
// import { Link } from "gatsby";
import Layout from "../components/layout"
import SectionLine from "../components/sectionLine"
import { Row, Col, Container } from "react-bootstrap"
import Supporters from "../components/supporters"
// import { SettingsSystemDaydreamOutlined } from "@mui/icons-material"
import ReCAPTCHA from "react-google-recaptcha"

const ContactUsTemplate = ({ pageContext, location }) => {
  const siteTitle = `Clinical Areas`

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [recaptchaData, setRecaptchaData] = useState();
  const [formMessage, setFormMessage] = useState("");
  const recaptchaRef = React.createRef();
  function onChangeRecaptcha(value) {
    setRecaptchaData(value);
  }

  useEffect(() => {
    console.log(pageContext.sites)
  }, [pageContext])

  const handleSubmit = (e) => {
    e.preventDefault()
    // const [name, email, message] = e.target.value;
    console.log(name, email, message);

    if (!recaptchaData) {
      setFormMessage("reCAPTCHA not complete")
      return;
    }

    const jsonData = {
      Name: name,
      EmailAddress: email,
      Message: message
    }
    console.log(JSON.stringify(jsonData));

    fetch(`https://researchreview.dev.s05.system7.co.nz/api/contact/`, {
      method: "POST",
      // mode: 'no-cors',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(jsonData),
    })
      .then(result => {
        console.log("result", result);
        setFormMessage("Message sent successfully. We will be in touch soon.");
        setName("");
        setEmail("");
        setMessage("");
        setRecaptchaData();
      },
        error => {
          console.log("error", error);
        }
      )
  }

  return (
    <Layout>
      <Container>
        <section className="contact-us-form-section">
          <Row>
            <SectionLine />
            <Col md={9} xs={12}>
              <div className="contact-us-left-side">
                <p className="contact-us-left-side-content">
                  Research Review is an independent publishing company focused on making education easy. We harness the expertise of Australia's leading specialists to select and advise on the most important medical research and the local implications.
                  <br />
                  We condense what's important and bring it to subscribers on a regular basis with a specialist opinion and a web link to the full study. These short summaries keep medical professionals up to date in any interest area in about 20 minutes.
                  <br />
                  Research Review is an independent publisher of electronic medical journals. The company produces publications focused on specialist areas of medicine to a subscribed database of health professionals. The journals are free to recipients and supported by sponsorship from companies with an interest in the area.
                  <br />
                  For guidance on sponsorship/advertising costs or to discuss your particular requirements please contact Research Review on 1300 132 322 or email admin@researchreview.com.au
                </p>
                {formMessage &&
                  <div className={`alert ${formMessage.includes("successfully") ? "alert-success" : "alert-danger"} mb-0`}>
                    <p>{formMessage}</p>
                  </div>
                }
                <form onSubmit={handleSubmit} className="contact-us-form">
                  <input value={name} onChange={(e) => setName(e.target.value)} type="text" placeholder="Name"></input>
                  <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="Email"></input>
                  <textarea value={message} onChange={(e) => setMessage(e.target.value)} type="message" placeholder="Message" rows="3"></textarea >
                  <ReCAPTCHA
                    ref={recaptchaRef}
                    sitekey="6Lc4jGIjAAAAAGliVhOH19tHcMT5PS4LprB0qK2U"
                    onChange={onChangeRecaptcha}
                  />
                  <button type="submit" className="btn btn-primary mt-3">
                    Send Message
                  </button>
                </form>
              </div>
            </Col>
            <Col md={3} xs={12}>
              <div className="contact-content-right-side">
                <div className="contact-details">
                  <p className="underline">Contact Details</p>
                  <div className="contact-content">
                    <p>Phone: 1300 132 322</p>
                    <p>Email: admin@researchreview.com.au</p>

                  </div>
                </div>
                <div className="postal-address">
                  <p className="underline">Postal Address</p>
                  <div className="contact-content">
                    Research Review Australia Pty Ltd<br />
                    PO Box 6220<br />
                    Highton<br />
                    Geelong 3216<br />
                    Victoria<br />
                    Australia
                  </div>
                </div>
                <div className="physical-address">
                  <p className="underline">Physical Address</p>
                  <div className="contact-content">
                    <p>162 Kitchener Road</p>
                    <p>Milford</p>
                    <p>Auckland</p>
                  </div>
                </div>
                <div className="social-links">
                  <div className="contact-content">
                    <p className="underline">Social</p>
                    <p>Facebook</p>
                    <p>Linkedin</p>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </section>
        <section className="contact-us-other-sites-section">
          <div className="sites-list">
            <Row>
              <Col xs={12}>
                <h2>Other Sites</h2>
              </Col>
              <SectionLine />
              <Col xs={12}>
                <Row>
                  <Col md={4} sm={6} xs={12}>
                    <div className="site">
                      <div className="site-image">
                        <img
                          alt="placeholder"
                          src="https://via.placeholder.com/400x300"
                          className="img-fluid"
                        />
                      </div>
                      <div className="site-content">
                        <h3>New Zealand</h3>
                        <a href="/" className="btn btn-primary">
                          researchreview.com.au
                        </a>
                      </div>
                    </div>
                  </Col>

                  <Col md={4} sm={6} xs={12}>
                    <div className="site">
                      <div className="site-image">
                        <img
                          alt="placeholder"
                          src="https://via.placeholder.com/400x300"
                          className="img-fluid"
                        />
                      </div>
                      <div className="site-content">
                        <h3>Australia</h3>
                        <a href="/" className="btn btn-primary">
                          researchreview.co.nz
                        </a>
                      </div>
                    </div>
                  </Col>

                  <Col md={4} sm={6} xs={12}>
                    <div className="site">
                      <div className="site-image">
                        <img
                          alt="placeholder"
                          src="https://via.placeholder.com/400x300"
                          className="img-fluid"
                        />
                      </div>
                      <div className="site-content">
                        <h3>Egypt</h3>
                        <a href="/" className="btn btn-primary">
                          researchreview.com.eg
                        </a>
                      </div>
                    </div>
                  </Col>
                </Row>
              </Col>
              {/* {pageContext.clinicalAreas.map((clinicalArea, index) => (
                <Col xs={3} key={index}>
                <p>{clinicalArea.node.name}</p>
                </Col>
                ))} */}
            </Row>
          </div>
        </section>
      </Container>
      <Container fluid>
        <Supporters />
      </Container>
    </Layout>
  )
}

export default ContactUsTemplate
