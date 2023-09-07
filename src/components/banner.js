import React from "react"
import { Container, Row, Col } from "react-bootstrap"
import { Link } from "gatsby"
import SearchIcon from "@mui/icons-material/Search"
import StarIcon from "@mui/icons-material/Star"
import ForumRoundedIcon from '@mui/icons-material/ForumRounded';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import PersonIcon from '@mui/icons-material/Person';
const Banner = ({ bannerContent }) => {
  let bannerHeight = bannerContent.bannerHeight ? bannerContent.bannerHeight : "250px";

  function IconSelector({ iconName }) {
    let selectedIcon = null;

    switch (iconName) {
      case 'Star':
        selectedIcon = <StarIcon />;
        break;
      case 'Person':
        selectedIcon = <PersonIcon />;
        break;
      case 'Forum':
        selectedIcon = <ForumRoundedIcon />;
        break;
      case 'Thumbs Up':
        selectedIcon = <ThumbUpAltIcon />;
        break;
      default:
        // If the iconName doesn't match any of the predefined options, you can handle it here
        selectedIcon = null;
    }

    return <span className="inner-icon">{selectedIcon}</span>;
  }

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
                {bannerContent.isHome && bannerContent.homeBannerLinks &&
                  <ul className="banner-links">
                    {bannerContent.homeBannerLinks.map((homeBannerLink) => {
                      return (
                        <li>
                          <a href={homeBannerLink.link}>
                            <div className="">
                              <IconSelector iconName={homeBannerLink.icon} />
                              {homeBannerLink.text} <span className="gt">&gt;</span>
                            </div>
                          </a>
                        </li>
                      )
                    })}
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
