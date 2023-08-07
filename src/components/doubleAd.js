import React, { useEffect, useState } from "react"
import { Row, Col } from "react-bootstrap"
import { filter } from "lodash";
// import SmallAdImage from '../assets/img/Ads/austin-distel-7bMdiIqz_J4-unsplash.jpg'
// import MediumAdImage from '../assets/img/Ads/towfiqu-barbhuiya-w8p9cQDLX7I-unsplash.jpg'

const DoubleAd = ({ advertisements }) => {
  const [smallAd, setSmallAd] = useState({});
  const [mediumAd, setMediumAd] = useState({});

  useEffect(() => {
    const tempSmallAdverts = filter(advertisements, { "DocType": "smallAdvertisement" })
    if(tempSmallAdverts.length>0)
    {
      const tempSmallAdvert = tempSmallAdverts[Math.floor(Math.random()*tempSmallAdverts.length)];
      setSmallAd(tempSmallAdvert);
    }

    const tempMediumAdverts = filter(advertisements, { "DocType": "mediumAdvertisement" })
    if(tempMediumAdverts.length>0)
    {
      const tempMediumAdvert = tempMediumAdverts[Math.floor(Math.random()*tempMediumAdverts.length)];
      setMediumAd(tempMediumAdvert);
    }
  }, [])

  return (
    <section className="home-page-ad-section" style={{marginBottom:'100px'}}>
      <Row>
      {mediumAd && 
        <Col md={8} sm={6} xs={12}>
          <a href={mediumAd.link} target="_blank" >
            <div className="home-page-ad-section-image">
              <img
                alt={mediumAd.name}
                src={mediumAd.medium}
                className="img-fluid featured-image"
                style={{maxHeight: '280px', minWidth: '850px'}}
              />
            </div>
          </a>
          
        </Col>
          }
        {smallAd && 
          <Col md={4} sm={6} xs={12}>
            <a href={smallAd.link} target="_blank" >
              <div className="home-page-ad-section-image">
                <img
                  alt={smallAd.name}
                  src={smallAd.small}
                  className="img-fluid featured-image"
                />
              </div>
            </a>
          </Col>
        }
      </Row>
    </section >
  )
}

export default DoubleAd