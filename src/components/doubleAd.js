import React, {useEffect, useState} from "react"
import { Row, Col } from "react-bootstrap"
import {find} from "lodash";

const DoubleAd = ({advertisements}) => {
  const [ smallAd, setSmallAd ] = useState({});
  const [ mediumAd, setMediumAd ] = useState({});

  useEffect(() => {
    const tempSmallAdvert = find(advertisements, {"advertisementType": "Small"})
    setSmallAd(tempSmallAdvert);

    const tempMediumAdvert = find(advertisements, {"advertisementType": "Medium"})
    setMediumAd(tempMediumAdvert);
  }, [])

  return (
    <section className="home-page-ad-section">
      <Row>
        <Col md={8} sm={6} xs={12}>
          <div className="home-page-ad-section-image">
            <img
              alt={mediumAd.name}
              src={mediumAd.image}
              className="img-fluid featured-image"
            />
            <div className="home-page-ad-section-link">
              <a href={mediumAd.link} target="_blank" className="btn btn-primary">
                Full Details {">"}
              </a>
            </div>
          </div>
        </Col>
        <Col md={4} sm={6} xs={12}>
          <div className="home-page-ad-section-image">
            <img
              alt={smallAd.name}
              src={smallAd.image}
              className="img-fluid featured-image"
            />
            <div className="home-page-ad-section-link">
              <a href={smallAd.link} target="_blank" className="btn btn-primary">
                Full Details {">"}
              </a>
            </div>
          </div>
        </Col>
      </Row>
    </section>
  )
}

export default DoubleAd