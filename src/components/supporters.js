import React from "react"
import { Container, Row, Col } from "react-bootstrap"
import he from 'he';

const Supporters = ({ partnersMacroContent }) => {
  console.log(partnersMacroContent)
  let partnersTitle = "";

  if(partnersMacroContent.partnersTitle) {
    partnersTitle = he.decode(partnersMacroContent.partnersTitle);
  }

  return (
    <section className="supporters-section">
      <Col xs={12}>
        <Container>
          <Row>
            <Col xs={12}>
              {partnersTitle && 
                <div dangerouslySetInnerHTML={{ __html: partnersTitle }} />
              }
            </Col>
            {partnersMacroContent && partnersMacroContent.Children.map((partner) => {
              return (
                <Col md={2} sm={3} xs={4}>
                  <div className="partner-macro-outer-div">
                    <div className="partner-macro-inner-div">
                      <a href={partner.partnerLink}>
                        <img
                          alt={partner.partnerName}
                          className="img-fluid"
                          src={partner.partnerLogo}
                        />
                      </a>
                    </div>
                  </div>
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
