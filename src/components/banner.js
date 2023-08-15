import React from "react"
import { Container, Row, Col } from "react-bootstrap"
import { Link } from "gatsby"
import SearchIcon from "@mui/icons-material/Search"
import StartIcon  from "@mui/icons-material/Star"
import ForumRoundedIcon from '@mui/icons-material/ForumRounded';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import PersonIcon from '@mui/icons-material/Person';
const Banner = ({ bannerContent }) => {
  let bannerHeight=bannerContent.bannerHeight?bannerContent.bannerHeight:"250px";
  return (
    <div id="banner">
      <Container fluid
        className="banner-fullwidth-container"
        style={{
          backgroundImage: `linear-gradient( rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.1) ), url('${bannerContent.bannerImage}')`,
          height: bannerHeight,
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
            <Col xs={12} sm={8} md={6}>
            <div className="banner-content">
                  {bannerContent.isHome && 
              <ul className="banner-links">
                          <li >
                            <a href='test'>
                              <div className="">
                                <span className="inner-icon"><StartIcon/></span>
                                Top Ten Must Read Studies <span className="gt">&gt;</span>
                                </div>
                            </a>
                          </li>
                          <li >
                            <a href='test'>
                              <div className="">
                                <span className="inner-icon"><ForumRoundedIcon/></span>
                                Podcasts from Leading Experts <span className="gt">&gt;</span>
                                </div>
                            </a>
                          </li>
                          <li >
                          <a href='test'>
                            <div className="">
                              <span className="inner-icon"><PersonIcon/></span>
                              Speaker Events <span className="gt">&gt;</span>
                              </div>
                          </a>
                        </li>                  
                        <li >
                          <a href='test'>
                            <div className="">
                              <span className="inner-icon"><ThumbUpAltIcon/></span>
                              Product Reviews <span className="gt">&gt;</span>
                              </div>
                          </a>
                        </li>                  
                      </ul>
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
