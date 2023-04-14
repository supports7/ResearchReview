import React from "react"
import { Row, Col } from "react-bootstrap"
import SectionLine from "./sectionLine"

const JoinRR = () => {
  return (
    <section className="join-research-review-form-section">
          <Row>
            <Col xs={12}>
              <h2>JOIN RESEARCH REVIEW</h2>
            </Col>
            <SectionLine />
            <Col md={8} sm={6} xs={12}>
              <form className="join-rr-form">
                <Row>
                  <Col md={6} xs={12}>
                    <input type="text" placeholder="First Name"></input>
                  </Col>
                  <Col md={6} xs={12}>
                    <input type="text" placeholder="Last Name"></input>
                  </Col>
                  <Col xs={12}>
                    <input type="email" placeholder="Email"></input>
                  </Col>
                  <Col xs={12}>
                    <input type="text" placeholder="Profession"></input>
                  </Col>
                  <button type="submit" className="btn btn-primary">SUMBIT</button>
                </Row>
              </form>
            </Col>
            <Col md={4} sm={6} xs={12}>
              <img
                src="https://via.placeholder.com/400x300"
                className="img-fluid"
              />
            </Col>
          </Row>
        </section>
  )
}

export default JoinRR
