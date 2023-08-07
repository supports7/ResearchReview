import React from "react"
import { Container, Row, Col } from "react-bootstrap"
import { Link } from "gatsby"

const Banner = ({ bannerContent }) => {
  return (
    <div id="banner">
      <Container fluid
        className="banner-fullwidth-container"
        style={{
          backgroundImage: `linear-gradient( rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.1) ), url('${bannerContent.bannerImage}')`,
          height: "600px",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
        }}
      >
        <Container>
          <Row>
            <Col xs={12} sm={8} md={6}>
              <div className="banner-content">
                <h1>{bannerContent.bannerText}</h1>
                {bannerContent.buttonLink && bannerContent.buttonText &&
                  <a className="btn btn-primary" href={`${bannerContent.buttonLink}`} target="_blank">
                    {bannerContent.buttonText}
                  </a>
                }
              </div>
            </Col>
          </Row>
        </Container>
      </Container>
    </div>
  )
}

export default Banner
