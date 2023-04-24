import React, { useEffect, useState } from "react"
import { navigate, Link } from "gatsby";
import Layout from "../components/layout"
import SectionLine from "../components/sectionLine"
import { Container, Row, Col } from "react-bootstrap"
// import { filter } from 'lodash';
import Banner from "../components/banner";
import bannerImage from "../images/banner/national-cancer-institute-L8tWZT4CcVQ-unsplash.jpg"
import Supporters from "../components/supporters"
import JoinRR from "../components/joinRR"

const ClinicalAreasTemplate = ({ pageContext, location }) => {
  const siteTitle = `Clinical Areas`
  const clinicalAreasData = pageContext.clinicalAreas;
  const [childrenClinicalAreas, setChildrenClinicalAreas] = useState({});



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

    const handleClick = (clinicalArea) => {
      if (clinicalArea == selectedChildNode) {
        setSelectedChildNode(null)
        return;
      }
      console.log("clincalArea - ", clinicalArea)
      let redirecting = false;
      if(clinicalArea.children){
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

  return (
    <Layout location={location} title={siteTitle}>
      <Banner name={pageContext.pageName} bannerImage={bannerImage} />
      <Container>
        <div className="clinical-areas-top-content">
          <Row>
            <SectionLine />
            <Col md={8} xs={12}>
              <p>
                Select your interest areas below, and explore our extensive back catalogue in over 50 clinical areas. Register now for the free monthly update.
              </p>
            </Col>
            <Col md={4} xs={12}>
              <p className="small-text">
                Research Review highlights critical studies from 10,000 worldwide mediacl journals with commentary from Australian experts
              </p>
            </Col>
          </Row>
        </div>
        <div className="clinical-areas-area-selection">
          <Row>
            <Col xs={12}>
              <h2>AREA SELECTION</h2>
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
          <Supporters />
        </Row>
      </Container>
      <Container>
        <JoinRR />
      </Container>
    </Layout>
  )
}

export default ClinicalAreasTemplate


{/* <div className="clinical-area-section-second-middle-div">
      <Row>
        <Col md={3} sm={6} xs={12}>
          <div className="clinical-area-pill">
            <p>Allergy</p>
          </div>
        </Col>
        <Col md={3} sm={6} xs={12}>
          <div className="clinical-area-pill">
            <p>Dermatology <span>+</span></p>
          </div>
        </Col>
        <Col md={3} sm={6} xs={12}>
          <div className="clinical-area-pill">
            <p>Emergency Medicine</p>
          </div>
        </Col>
        <Col md={3} sm={6} xs={12}>
          <div className="clinical-area-pill">
            <p>Fertility</p>
          </div>
        </Col>
      </Row>
    </div>
    <div className="clinical-area-section-bottom-div bottom-clinical-area-section">
      <Row>
        <Col md={3} sm={6} xs={12}>
          <div className="clinical-area-pill">
            <p>Allergy</p>
          </div>
        </Col>
        <Col md={3} sm={6} xs={12}>
          <div className="clinical-area-pill">
            <p>Dermatology <span>+</span></p>
          </div>
        </Col>
        <Col md={3} sm={6} xs={12}>
          <div className="clinical-area-pill">
            <p>Emergency Medicine</p>
          </div>
        </Col>
        <Col md={3} sm={6} xs={12}>
          <div className="clinical-area-pill">
            <p>Fertility</p>
          </div>
        </Col>
      </Row>
    </div> */}

{/* <h1>{pageContext.name}</h1>
			<p>{pageContext.id}</p>
			{pageContext.reviewData && pageContext.reviewData.map((review, index) => {
        return (
          <div key={index}>
            <h2>Review - {review.name && review.name}</h2>
          </div>
        ) 
      })} */}

{/* {pageContext.clinicalAreas.map((clinicalArea, index) => (
        <Col xs={3} key={index}>
          <p>{clinicalArea.node.name}</p>
        </Col>
      ))} */}