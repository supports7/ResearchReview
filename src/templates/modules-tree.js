import React, { useEffect, useState } from "react"
import { navigate, Link } from "gatsby";
import he from 'he';
import Layout from "../components/layout"
import SectionLine from "../components/sectionLine"
import { Container, Row, Col } from "react-bootstrap"
import { find } from 'lodash';
import Banner from "../components/banner";
import bannerImage from "../images/banner/national-cancer-institute-L8tWZT4CcVQ-unsplash.jpg"
import Supporters from "../components/supporters"
import JoinRR from "../components/joinRR"

const ModulesTreeTemplate = ({ pageContext, location }) => {
  const siteTitle = `Modules Tree`
  const clinicalAreasData = pageContext.clinicalAreas;

  const bannerContent = {
    bannerImage: pageContext.modulesContent.bannerImage,
    bannerText: pageContext.modulesContent.bannerText,
    buttonLink: pageContext.modulesContent.buttonLink,
    buttonText: pageContext.modulesContent.buttonText,
  };

  const introTextLeft = he.decode(pageContext.modulesContent.introTextLeft);
  const introTextRight = he.decode(pageContext.modulesContent.introTextRight);

  useEffect(() => {
    console.log("pageContext", pageContext);
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

    const handleClick = (clinicalArea, url) => {
      if (clinicalArea == selectedChildNode) {
        setSelectedChildNode(null)
        return;
      }
      console.log("clincalArea - ", clinicalArea)
      let redirecting = false;
      if (clinicalArea.children) {

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
              <Row className="clinical-area-section-row">
                {clinicalAreaParent.children.map((clinicalAreaChild, i) => (
                  <ClinicalAreaPill handleClick={handleClick} clinicalArea={clinicalAreaChild} level={level} selectedChildNode={selectedChildNode} index={i} url={clinicalAreaChild.url} key={clinicalAreaChild.id} />
                ))}
              </Row>
            </div>
            <div>
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

      if (numberOfChildren > 1 || (level == 1 && numberOfChildren > 0)) {
        hasChildren = true;
      }
    }
    let isReview = false;
    if(clinicalArea.url) {
      isReview = true;
    }

    //check if the pill should show
    let showPill = clinicalArea.ModulesCount > 0 || isReview;

    if (showPill) {
      return (
        <Col xs={12} sm={6} md={4} lg={3}>
          <div key={clinicalArea.id} className="clinical-area-pill">
            <p onClick={() => handleClick(clinicalArea, url)}>
              {clinicalArea.name}
              {(hasChildren) && (selectedChildNode ? (selectedChildNode.alternative_id === clinicalArea.alternative_id ? <span>-</span> : <span>+</span>) : <span>+</span>)}
            </p>
          </div>
        </Col>
      )
    }
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
              <h2>Select a CPD Module</h2>
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
        <JoinRR signUpFormContent={pageContext.signUpFormContent}/>
      </Container>
    </Layout>
  )
}

export default ModulesTreeTemplate