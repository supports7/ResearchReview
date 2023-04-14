import React from "react"
import { Container, Row, Col } from "react-bootstrap"
import { Link } from "gatsby"

const Banner = ({name, bannerImage, pdfDownloadLink}) => {
  return (
    <div id="banner">
      <Container fluid 
        className="banner-fullwidth-container"
        style={{
            backgroundImage: `linear-gradient( rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.1) ), url('${bannerImage}')`,
            height: "800px",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
        }}
      >
        <Container>
          <Row>
            <Col xs={12}>
              <div className="banner-content">
                <h1>{name}</h1>
                {pdfDownloadLink ?
                  <a className="btn btn-primary" href={pdfDownloadLink} target="_blank">
                      Download Latest Issue
                  </a>
                  : 
                  <Link className="btn btn-primary" to="/join-research-review">
                      Subscribe
                  </Link>
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
