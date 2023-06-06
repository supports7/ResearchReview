import React, { useEffect, useState } from "react"
import { Row, Col } from "react-bootstrap"
import { find } from "lodash";
import SmallAdImage from '../assets/img/Ads/austin-distel-7bMdiIqz_J4-unsplash.jpg'
import MediumAdImage from '../assets/img/Ads/towfiqu-barbhuiya-w8p9cQDLX7I-unsplash.jpg'

const DoubleAd = ({ advertisements }) => {
  const [smallAd, setSmallAd] = useState({});
  const [mediumAd, setMediumAd] = useState({});

  useEffect(() => {
    const tempSmallAdvert = find(advertisements, { "advertisementType": "Small" })
    setSmallAd(tempSmallAdvert);

    const tempMediumAdvert = find(advertisements, { "advertisementType": "Medium" })
    setMediumAd(tempMediumAdvert);
  }, [])

  return (
    <section className="home-page-ad-section">
      <Row>
        <Col md={8} sm={6} xs={12}>
          <a href={mediumAd.link} target="_blank" >
            <div className="home-page-ad-section-image">
              <img
                alt={mediumAd.name}
                src={MediumAdImage}
                className="img-fluid featured-image"
              />
            </div>
          </a>
        </Col>

        <Col md={4} sm={6} xs={12}>
          <a href={smallAd.link} target="_blank" >
            <div className="home-page-ad-section-image">
              <img
                alt={smallAd.name}
                src={SmallAdImage}
                className="img-fluid featured-image"
              />
            </div>
          </a>
        </Col>
      </Row>
    </section >
  )
}

export default DoubleAd