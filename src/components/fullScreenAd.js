import React, {useEffect, useState} from "react"
import { Row, Col, Container } from "react-bootstrap"
import {find} from "lodash";
import largeAdImage from '../assets/img/Ads/towfiqu-barbhuiya-w8p9cQDLX7I-unsplash.jpg'

const FullScreenAd = ({advertisements}) => {
  const [ largeAd, setLargeAd ] = useState({});

  useEffect(() => {
    const tempLargeAdvert = find(advertisements, {"advertisementType": "Large"})
    setLargeAd(tempLargeAdvert);
  }, [])

  return (
    <a className="full-screen-ad-link" href={largeAd.link} target="_blank" >
    <section
      className="full-screen-ad"
      style={{
        backgroundImage: `url('${largeAdImage}')`,
        height: "600px",
        backgroundPosition: 'center center',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
      }}
    >
      <Container>
        <Row>
          <Col xs={12}>
            <div className="full-screen-ad-image">
              <div className="full-screen-ad-content">
                <p className="small-green-text">
                  16.03.2022 / Medical / Jimmy Choo
                </p>
                <h2>{largeAd.advertisementName}</h2>
                <p>
                  Research Review publications bring the best of 10,000
                  global medical journals to your inbox every issue with
                  commentary from New Zealand experts.
                </p>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
    </a>
  )
}

export default FullScreenAd