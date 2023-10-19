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

const ClinicalAreasTemplate = ({ pageContext, location }) => {
  const siteTitle = `Clinical Areas`
  const clinicalAreasData = pageContext.clinicalAreas;
  const [childrenClinicalAreas, setChildrenClinicalAreas] = useState({});

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

    const handleClick = (clinicalArea) => {
      if (clinicalArea == selectedChildNode) {
        setSelectedChildNode(null)
        return;
      }
      console.log("clincalArea - ", clinicalArea)
      let redirecting = false;

      if (clinicalArea.children && clinicalArea.children.length === 1) {
        const firstChild = clinicalArea.children[0];
        console.log("firstChild", firstChild);
      
        if (
          firstChild.url && firstChild.url.length > 0 &&
          clinicalArea.name === firstChild.name
        ) {
          // Redirect to the child's page if it's the only child with the same name and a URL.
          // console.log("what the url should be =", `${pageContext.pageUrl}${firstChild.url}`);
          navigate(`${pageContext.pageUrl}${firstChild.url}`);
          return;
        } else if (
          firstChild.children &&
          firstChild.children.length === 1 &&
          firstChild.children[0].url &&
          firstChild.children[0].url.length > 0
        ) {
          // Redirect to the child's page if the first child's only child has a URL.
          const firstGrandChild = firstChild.children[0];
          // console.log("what the url should be =", `${pageContext.pageUrl}${firstGrandChild.url}`);
          navigate(`${pageContext.pageUrl}${firstGrandChild.url}`);
          return;
        }
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
    let onlyOneChildWithSameName = false;
    if (clinicalArea.children) {
      let numberOfChildren = clinicalArea.children.length;

      if (numberOfChildren > 1 || (level == 1 && numberOfChildren > 0)) {
        hasChildren = true;
      }
      if (numberOfChildren === 1 && clinicalArea.name === clinicalArea.children[0].name && clinicalArea.children[0].children && clinicalArea.children[0].children[0] && clinicalArea.children[0].children[0].url) {
        onlyOneChildWithSameName = true;
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
            {hasChildren && !onlyOneChildWithSameName && (selectedChildNode ? (selectedChildNode.id === clinicalArea.id ? <span>-</span> : <span>+</span>) : <span>+</span>)}
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
          <Supporters partnersMacroContent={pageContext.partnersMacroContent} />
        </Row>
      </Container>
      <Container>
        <JoinRR signUpFormContent={pageContext.signUpFormContent}/>
      </Container>
    </Layout>
  )
}

export default ClinicalAreasTemplate