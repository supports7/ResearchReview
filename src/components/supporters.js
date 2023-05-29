import React from "react"
import { Container, Row, Col } from "react-bootstrap"

const Supporters = ({partnersMacroContent}) => {
  console.log(partnersMacroContent)
  return (
    <section className="supporters-section">
      <Col xs={12}>
        <Container>
          <Row>
            <Col xs={12}>
              <h3 className="supporters-heading">Kindly Support By</h3>
            </Col>
            {partnersMacroContent && partnersMacroContent.Children.map((partner) => {
              return (
                <Col md={1} sm={3} xs={4}>
                  <a href={partner.partnerLink}>
                    <img
                      alt={partner.partnerName}
                      className="img-fluid"
                      src={partner.partnerLogo}
                    />
                  </a>
                </Col>
              )
            })}
          </Row>
        </Container>
      </Col>
    </section>
  )
}

export default Supporters
