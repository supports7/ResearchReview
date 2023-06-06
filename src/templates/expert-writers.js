import React, { useEffect, useState } from "react"
import { navigate, Link } from "gatsby";
import he from 'he';
import Layout from "../components/layout"
import SectionLine from "../components/sectionLine"
import { Container, Row, Col } from "react-bootstrap"
// import { filter } from 'lodash';
import Banner from "../components/banner";
import bannerImage from "../images/banner/national-cancer-institute-L8tWZT4CcVQ-unsplash.jpg"
import Supporters from "../components/supporters"
import JoinRR from "../components/joinRR"

const ExpertWritersTemplate = ({ pageContext, location }) => {
  const siteTitle = `Expert Writers`
  const clinicalAreasData = pageContext.clinicalAreas;
  const [reviewsWithWriters, setReviewsWithWriters] = useState({});


  const bannerContent = {
    bannerImage: pageContext.content.bannerImage,
    bannerText: pageContext.content.bannerText,
    buttonLink: pageContext.content.buttonLink,
    buttonText: pageContext.content.buttonText,
  };

  const introTextLeft = he.decode(pageContext.content.introTextLeft);
  const introTextRight = he.decode(pageContext.content.introTextRight);

  useEffect(() => {
    console.log(pageContext);
  }, [])

  const TopLevelClinicalArea = ({ clinicalArea, index }) => {
    let url = clinicalArea.name;
    const [children, setChildren] = useState();
    const [isActive, setIsActive] = useState();

    return (
      <Col xs={12} key={index} id={`top-level-clinical-area-${index}`}>
        <div className="clinical-area-section-main-div">
          <div className="clinical-area-section-top-div">
            <h3>{clinicalArea.name}</h3>
          </div>
          <ClinicalAreaSubPills clinicalAreaParent={clinicalArea} level={1} />
        </div>
      </Col>
    )
  }

  const ClinicalAreaSubPills = ({ clinicalAreaParent, level }) => {
    const [selectedChildNode, setSelectedChildNode] = useState(null);
    const [selectedParentNodeWithWriters, setSelectedParentNodeWithWriters] = useState(null);
    const [writers, setWriters] = useState([]);

    const handleClick = (clinicalArea) => {
      if (clinicalArea == selectedChildNode) {
        setSelectedChildNode(null)
        return;
      }
      console.log("clincalArea - ", clinicalArea)
      let redirecting = false;

      if (clinicalArea.writersByReview) {
        setWriters(clinicalArea.writersByReview);
        setSelectedParentNodeWithWriters(clinicalArea);
        return;
      }

      if (clinicalArea.children) {
        let numberOfChildren = clinicalArea.children.length;

        if (numberOfChildren == 1) {
          //Need to check if the only child has a url and if it has a url Redriect to that url
          let firstChild = clinicalArea.children[0];
          if (firstChild.url && firstChild.url.length > 0) {
            redirecting = true;
            navigate(`${pageContext.pageUrl}${firstChild.url}`);
          }
        }
      }
      else {
        redirecting = true;
        navigate(clinicalArea.url)
      }
      if (!redirecting) {
        setSelectedChildNode(clinicalArea);
      }
    };

    return (
      <div>
        {clinicalAreaParent.children && clinicalAreaParent.children.length > 0 &&
          <div>
            <div className={`clinical-area-section-middle-div pill-level-${level}`}>
              <Row>
                {clinicalAreaParent.children.map((clinicalAreaChild, i) => (
                  <ClinicalAreaPill handleClick={handleClick} clinicalArea={clinicalAreaChild} level={level} selectedChildNode={selectedChildNode} index={i} url={clinicalAreaChild.url} key={clinicalAreaChild.id} />
                ))}
              </Row>
            </div>
            <div>
              {writers &&
                <div className={`clinical-area-section-middle-div pill-level-${level + 1}`}>
                  <Row>
                    {writers.map((writer, i) => (
                      <WritersPill selectedParentNodeWithWriters={selectedParentNodeWithWriters} writer={writer} i={i} level={level + 1}  key={writer.Node} />
                    ))}
                  </Row>
                </div>
              }
              {selectedChildNode &&
                <ClinicalAreaSubPills clinicalAreaParent={selectedChildNode} level={level + 1} />
              }
            </div>
          </div>
        }
      </div>
    )
  }

  const ClinicalAreaPill = ({ clinicalArea, level, selectedChildNode, index, url, handleClick }) => {
    let hasChildren = false;
    if (clinicalArea.children) {
      let numberOfChildren = clinicalArea.children.length;

      if (numberOfChildren > 1 || (level == 1 && numberOfChildren > 0 || (clinicalArea.writersByReview && clinicalArea.writersByReview.length > 0))) {
        hasChildren = true;
      }
    }
    // let urlCopy = url.slice();
    // urlCopy = urlCopy + "/" + clinicalArea.name;
    // if (clinicalArea.children.length > 0) {
    //   hasChildren = true;
    // }

    return (
      <Col xs={12} sm={6} md={4} lg={3}>
        <div key={clinicalArea.id} className="clinical-area-pill">
          <p onClick={() => handleClick(clinicalArea)}>
            {clinicalArea.name}
            {hasChildren && (selectedChildNode ? (selectedChildNode.id === clinicalArea.id ? <span>-</span> : <span>+</span>) : <span>+</span>)}
          </p>
        </div>
      </Col>
    )
  }


  const WritersPill = ({ selectedParentNodeWithWriters, writer, i }) => {
    
    const writerHandleClick = (writer) => {
      console.log("selectedParentNodeWithWriters - ", selectedParentNodeWithWriters);
      console.log("writer - ", writer);
      let writerUrlTemp = writer.first_Name.toLowerCase() + "-" + writer.last_Name.toLowerCase();
      writerUrlTemp = writerUrlTemp.split(' ').join('-');
      let url = selectedParentNodeWithWriters.writerUrl + "/" + writerUrlTemp;
      navigate(url)
    }

    return (
      <Col xs={12} sm={6} md={4} lg={3}>
        <div key={writer.Node} className="clinical-area-pill">
          <p onClick={() => writerHandleClick(writer)}>
            {writer.first_Name + " " + writer.last_Name}
          </p>
        </div>
      </Col>
    )
  }

  return (
    <Layout location={location} title={siteTitle}>
      <Banner bannerContent={bannerContent} />
      <Container>
        <div className="clinical-areas-top-content">
          <Row>
            <SectionLine />
            <Col md={8} xs={12}>
              <div dangerouslySetInnerHTML={{ __html: introTextLeft }} />
            </Col>
            <Col md={4} xs={12}>
              <div dangerouslySetInnerHTML={{ __html: introTextRight }} />
            </Col>
          </Row>
        </div>
        <div className="clinical-areas-area-selection">
          <Row>
            <Col xs={12}>
              <h2>Medical Advisors' Index</h2>
            </Col>
            <SectionLine />
            {clinicalAreasData && clinicalAreasData.map((clinicalArea, index) => {
              return (
                <TopLevelClinicalArea clinicalArea={clinicalArea} index={index} key={index} />
              )
            }
            )}
          </Row>

        </div>
      </Container>
      <Container fluid>
        <Row>
          <Supporters partnersMacroContent={pageContext.partnersMacroContent} />
        </Row>
      </Container>
      <Container>
        <JoinRR />
      </Container>
    </Layout>
  )
}

export default ExpertWritersTemplate