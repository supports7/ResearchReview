import React, { useEffect, useState } from "react"
import { navigate } from "gatsby";
import Layout from "../components/layout";
import SectionLine from "../components/sectionLine";
import Supporters from "../components/supporters";
//import JoinRR from "../components/joinRR";
import Cookies from "universal-cookie";

import { Container, Row, Col } from "react-bootstrap"
import { remove } from 'lodash';
import { CircularProgress } from "@mui/material";

const SubscriptionsTemplate = ({ pageContext, location }) => {
  const siteTitle = `Subscriptions`
  const cookies = new Cookies()
  const subscriptionList = pageContext.clinicalAreas;
  const [subscriptionListWithReviews, setSubscriptionListWithReviews] = useState([]);
  //TODO: Rename variables
  const [fullAreaForCheckboxes, setFullAreaForCheckboxes] = useState([]);
  const [subscriptionListOfIds, setSubscriptionListOfIds] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedIds, setSelectedIds] = useState([]);

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
    if (!userDataFromCookies) {
      navigate("/");
    }
    if (userDataFromCookies.subscriptions) {
      console.log("userDataFromCookies:", userDataFromCookies.subscriptions);
      //Scan custom data for IDs then add to list
      setSubscriptionListOfIds(userDataFromCookies.subscriptions);
      setSelectedIds(userDataFromCookies.subscriptions);
    }
    console.log("subscriptionList:", subscriptionList);

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

  const toggleSelect = (event, id) => {
    //event.preventDefault();
    let currentSelected = [...selectedIds];
    var index = currentSelected.indexOf(id);

    if (index === -1) {
      currentSelected.push(id);
    } else {
      currentSelected.splice(index, 1);
    }
    setSelectedIds(currentSelected);

  }
  const isSelected = (id) => {
    var idSelected = selectedIds.includes(id);
    return idSelected;

  }
  // const onAddingItem = (event, option, index, i) => {
  //   // note: option is review
  //   const values = [...subscriptionListWithReviews];
  //   let tempListOfIdsUserIsSubscribedTo = [...subscriptionListOfIds];
  //   values[index].reviews[i].isAdded = event.target.checked;
  //   console.log("event.target.checked, option.name, index, i", event.target.checked, option.name, index, i)
  //   if(event.target.checked) {
  //     tempListOfIdsUserIsSubscribedTo.push(option.id)
  //     console.log("option added: optionId:",option.id)
  //   }
  //   else {
  //     tempListOfIdsUserIsSubscribedTo = remove(tempListOfIdsUserIsSubscribedTo, (id) => id == option.id);
  //   }
  //   setSubscriptionListOfIds(tempListOfIdsUserIsSubscribedTo);
  //   setFullAreaForCheckboxes(values);
  // }

  const handleSubmit = () => {
    setLoading(true);
    const userDataFromCookies = cookies.get("userData")
    const loginToken = cookies.get("LoginToken");

    const jsonData = {
      UserId: userDataFromCookies.id,
      //Subscriptions: subscriptionListOfIds,
      ReviewIds: selectedIds,
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
          userDataFromCookies.subscriptions = selectedIds;

          cookies.set("userData", userDataFromCookies, {
            path: "/",
            expires: new Date(Date.now() + 8640000),
          })
          //setIsEditingProfile(false);
          //setProfileData(result)
          //setProfileData(userDataFromCookies)
          setLoading(false);
          navigate('/profile')

        },

        error => {
          console.log("error", error);
        }
      )
      .catch(error => {
        // Handle all other errors, including the ones we explicitly threw
        console.log("STRAIGHT ERROR");
        console.error("error message", error.message);
        // setErrorMessageTemp(error.message);
      });
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
                                // checked={review.isAdded}
                                // onChange={(e) => onAddingItem(e, review, index, i)}
                                checked={isSelected(review.id)}
                                onChange={(e) => toggleSelect(e, review.id)}

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
                {!loading ? (
                  <button onClick={handleSubmit} className="btn btn-primary">Save Changes</button>
                ) : (
                  <div className="search-loading">
                    <CircularProgress />
                  </div>
                )}
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