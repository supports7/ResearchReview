import React, { useEffect, useState } from "react"
import { navigate } from "gatsby";
import Layout from "../components/layout";
import SectionLine from "../components/sectionLine";
import Supporters from "../components/supporters";
import JoinRR from "../components/joinRR";
import Cookies from "universal-cookie";

import { Container, Row, Col } from "react-bootstrap"
import { remove } from 'lodash';

const SubscriptionsTemplate = ({ pageContext, location }) => {
  const siteTitle = `Subscriptions`
  const cookies = new Cookies()
  const subscriptionList = pageContext.clinicalAreas;
  const [subscriptionListWithReviews, setSubscriptionListWithReviews] = useState([]);
  const [fullAreaForCheckboxes, setFullAreaForCheckboxes] = useState([]);
  const [subscriptionListOfIds, setSubscriptionListOfIds] = useState([]);
  
  const bundleReviews = (clinicalArea, reviews) => {
    if (clinicalArea.children) {
      clinicalArea.children.forEach((clinicalAreaChild) => {
        const review = bundleReviews(clinicalAreaChild, reviews)
        if (review) {
          reviews.push(review);
        }
      })
    } else {
      if (clinicalArea) {
        return clinicalArea
      }
      return
    }
  }

  useEffect(() => {
    const userDataFromCookies = cookies.get("userData")
    console.log(userDataFromCookies);
    if(!userDataFromCookies) {
      navigate("/");
    }
    if(userDataFromCookies.customData) {
      //Scan custom data for IDs then add to list
      //setSubscriptionListOfIds(listOfSelectedSubscriptions);
    }
    console.log(subscriptionList);
    subscriptionList.forEach((clinicalArea) => {
      let reviews = [];
      if (clinicalArea.children) {
        clinicalArea.children.forEach((clinicalAreaChild) => {
          const review = bundleReviews(clinicalAreaChild, reviews)
          if (review) {
            reviews.push(review);
          }
        })
        clinicalArea['reviews'] = reviews;
      }
    })
    setSubscriptionListWithReviews(subscriptionList);
  }, [])

  useEffect(() => {
    if (subscriptionListWithReviews) {
      let tempAreaForCheckboxes = [];

      subscriptionListWithReviews.forEach((clinicalArea) => {
        if (clinicalArea.reviews) {
          let tempReviewArray = [];
          clinicalArea.reviews.forEach((review) => {
            const reviewObject = {
              name: review.name,
              isAdded: false,
              id: review.alternative_id,
            }
            tempReviewArray.push(reviewObject);
          });

          const clinicalAreaObject = {
            name: clinicalArea.name,
            reviews: tempReviewArray,
          }

          tempAreaForCheckboxes.push(clinicalAreaObject);
        }
      })

      setFullAreaForCheckboxes(tempAreaForCheckboxes);
    }
  }, [subscriptionListWithReviews])

  const onAddingItem = (event, option, index, i) => {
    const values = [...subscriptionListWithReviews];
    let tempListOfIdsUserIsSubscribedTo = [...subscriptionListOfIds];
    values[index].reviews[i].isAdded = event.target.checked;
    console.log("event.target.checked, option.name, index, i", event.target.checked, option.name, index, i)
    if(event.target.checked) {
      tempListOfIdsUserIsSubscribedTo.push(option.id)
    }
    else {
      tempListOfIdsUserIsSubscribedTo = remove(tempListOfIdsUserIsSubscribedTo, (id) => id == option.id);
    }
    setSubscriptionListOfIds(tempListOfIdsUserIsSubscribedTo);
    setFullAreaForCheckboxes(values);
  }

  const handleSubmit = () => {
    const userDataFromCookies = cookies.get("userData")
    const loginToken = cookies.get("LoginToken");
    const jsonData = {
      UserId: userDataFromCookies.id,
      Subscriptions: subscriptionListOfIds,
    }

    fetch(`https://researchreview.dev.s05.system7.co.nz/api/users/subscriptions`, {
      method: "PUT",
      // mode: 'no-cors',
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + loginToken,
      },
      body: JSON.stringify(jsonData),
    })
    .then(res => console.log(res.json()))
    .then(
      result => {
        console.log("result", result);

        // cookies.set("userData", result, {
        //   path: "/",
        //   expires: new Date(Date.now() + 8640000),
        // })
        // setIsEditingProfile(false);
        // setProfileData(result)
      },

      error => {
        console.log("error", error);
      }
    )
  }

  return (
    <Layout location={location} title={siteTitle}>
      <Container>
        <div className="subscriptions-area-selection">
          <Row>
            <Col xs={12}>
              <h2>Publication Subscriptions</h2>
            </Col>
            <SectionLine />
            {fullAreaForCheckboxes && fullAreaForCheckboxes.map((clinicalArea, index) => {
              return (
                <div key={index} className="clinical-area-section-main-div">
                  <Row>
                    <Col xs={12} className="clinical-area-section-top-div">
                      <h3>{clinicalArea.name}</h3>
                    </Col>
                    <div className="review-div-of-cols">
                      <Row>
                        {clinicalArea.reviews && clinicalArea.reviews.map((review, i) => {
                          return (
                            <Col key={i} xs={3} className="review-col">
                              <input
                                style={{ fontStyle: "normal" }}
                                className="review-input"
                                type="checkbox"
                                id={review.name}
                                value={review.name}
                                checked={review.isAdded}
                                onChange={(e) => onAddingItem(e, review, index, i)}
                              />
                              <label className="review-label" htmlFor={review.name}>{review.name}</label>
                            </Col>
                          )
                        })}
                      </Row>
                    </div>
                  </Row>
                </div>
              )
            }
            )}
            <Col xs={12}>
              <div className="save-changes-button-div">
                <button onClick={handleSubmit} className="btn btn-primary">Save Changes</button>
              </div>
            </Col>
          </Row>

        </div>
      </Container>
      <section>
        <Container fluid>
          <Supporters partnersMacroContent={pageContext.partnersMacroContent} />
        </Container>
      </section>
    </Layout>
  )
}

export default SubscriptionsTemplate