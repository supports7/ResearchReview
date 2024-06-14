import React, { useState, useEffect } from "react"
// import { Link } from "gatsby";
import he from 'he';
import Layout from "../components/layout"
import SectionLine from "../components/sectionLine"
import { Row, Col, Container } from "react-bootstrap"
import Supporters from "../components/supporters"
// import { SettingsSystemDaydreamOutlined } from "@mui/icons-material"
import ReCAPTCHA from "react-google-recaptcha"
import Banner from "../components/banner"
//const config = require("../../config")

const ContactUsTemplate = ({ pageContext, location }) => {
  //const siteTitle = `Clinical Areas`

  const bannerContent = {
    bannerImage: pageContext.content.bannerImage,
    bannerText: pageContext.content.bannerText,
    buttonLink: pageContext.content.buttonLink,
    buttonText: pageContext.content.buttonText,
  };

  const introTextLeft = he.decode(pageContext.content.introTextLeft);
  const introTextRight = he.decode(pageContext.content.introTextRight);

  const sites = pageContext.content.Children;

  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [message, setMessage] = useState("")
  const [recaptchaData, setRecaptchaData] = useState()
  const [formMessage, setFormMessage] = useState("")
  const recaptchaRef = React.createRef()
  function onChangeRecaptcha(value) {
    setRecaptchaData(value)
  }

  useEffect(() => {
    //console.log(pageContext)
  }, [pageContext])

  const handleSubmit = e => {
    e.preventDefault()
    // const [name, email, message] = e.target.value;
    console.log(name, email, message)

    if (!recaptchaData) {
      setFormMessage("reCAPTCHA not complete")
      return
    }

    const jsonData = {
      Name: name,
      EmailAddress: email,
      Message: message,
    }
    //console.log(JSON.stringify(jsonData))

    fetch(`https://researchreview.dev.s05.system7.co.nz/api/contact/`, {
      method: "POST",
      // mode: 'no-cors',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(jsonData),
    }).then(
      result => {
        //console.log("result", result)
        setFormMessage("Message sent successfully. We will be in touch soon.")
        setName("")
        setEmail("")
        setMessage("")
        setRecaptchaData()
      },
      error => {
        console.log("error", error)
      }
    )
  }

  return (
    <Layout>
      <Banner bannerContent={bannerContent} />
      <Container>
        <section className="contact-us-form-section">
          <Row>
            <SectionLine />
            <Col md={9} xs={12}>
              <div className="contact-us-left-side">
                <div dangerouslySetInnerHTML={{ __html: introTextLeft }} />
                {formMessage && (
                  <div
                    className={`alert ${formMessage.includes("successfully")
                      ? "alert-success"
                      : "alert-danger"
                      } mb-0`}
                  >
                    <p>{formMessage}</p>
                  </div>
                )}
                <form onSubmit={handleSubmit} className="contact-us-form">
                  <input
                    value={name}
                    onChange={e => setName(e.target.value)}
                    type="text"
                    placeholder="Name"
                  ></input>
                  <input
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    type="email"
                    placeholder="Email"
                  ></input>
                  <textarea
                    value={message}
                    onChange={e => setMessage(e.target.value)}
                    type="message"
                    placeholder="Message"
                    rows="3"
                  ></textarea>
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
              <div dangerouslySetInnerHTML={{ __html: introTextRight }} />
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
                  {sites && sites.map((site) => {
                    return (
                      <Col md={4} sm={6} xs={12} key={site.Node}>
                        <div className="site">
                          <div className="site-image">
                            <img
                              alt="Australia"
                              src={site.siteImage}
                              className="img-fluid"
                            />
                            <div className="site-name">
                              <h3>{site.siteName}</h3>
                            </div>
                          </div>
                          <div className="site-content">
                            <a href={site.link} target="_blank" rel="noreferrer" className="btn btn-primary">
                              {site.link}
                            </a>
                          </div>
                        </div>
                      </Col>
                    )
                  })}
                  {/* {config.countryCode === "New Zealand" ? (
                    <Col md={4} sm={6} xs={12}>
                      <div className="site">
                        <div className="site-image">
                          <img
                            alt="Image of Australia"
                            src={AustraliaImage}
                            className="img-fluid"
                          />
                          <div className="site-name">
                            <h3>Australia</h3>
                          </div>
                        </div>
                        <div className="site-content">
                          <a href="https://researchreview.com.au" target="_blank" className="btn btn-primary">
                            researchreview.com.au
                          </a>
                        </div>
                      </div>
                    </Col>
                  ) : (
                    <Col md={4} sm={6} xs={12}>
                      <div className="site">
                        <div className="site-image">
                          <img
                            alt="Image of New Zealand"
                            src={NewZealandImage}
                            className="img-fluid"
                          />
                          <div className="site-name">
                            <h3>New Zealand</h3>
                          </div>
                        </div>
                        <div className="site-content">
                          <a href="https://researchreview.co.nz" className="btn btn-primary">
                            researchreview.co.nz
                          </a>
                        </div>
                      </div>
                    </Col>
                  )} */}

                  {/* <Col md={4} sm={6} xs={12}>
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
                  </Col> */}
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
        <Supporters partnersMacroContent={pageContext.partnersMacroContent} />
      </Container>
    </Layout>
  )
}

export default ContactUsTemplate
