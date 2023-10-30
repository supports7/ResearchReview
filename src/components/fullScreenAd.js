import React, { useEffect, useState } from "react"
import { Row, Col, Container } from "react-bootstrap"
import { filter } from "lodash";
//import largeAdImage from '../assets/img/Ads/headway-F2KRf_QfCqw-unsplash.jpg'

const FullScreenAd = ({ advertisements }) => {
  const [largeAd, setLargeAd] = useState();

  useEffect(() => {
    console.log("advertisements", advertisements)
    const tempLargeAdverts = filter(advertisements, { "DocType": "fullWidthAdvertisement" })
    if (tempLargeAdverts.length > 0) {

      const tempLargeAdvert = tempLargeAdverts[Math.floor(Math.random() * tempLargeAdverts.length)];
      setLargeAd(tempLargeAdvert);
    }
  }, [])

  return (
    <div>
      <Container>
        <Row>
          <Col xs={12}>
            {largeAd &&
              <a className="full-screen-ad-link" href={largeAd.link} target="_blank" >
                <section
                  className="full-screen-ad"
                >
                  <img src={`${largeAd.image}?width=1600`} className="img-fluid" />
                </section>
              </a>
            }
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default FullScreenAd