import React, { useEffect, useState } from "react";
import Layout from "../components/layout";
// import { Link, graphql } from "gatsby"
import { Container, Row, Col } from "react-bootstrap"
// import Bio from "../components/bio"
// import Layout from "../components/layout"
// import Seo from "../components/seo"
import Banner from "../components/banner";
import bannerImage from "../images/banner/national-cancer-institute-L8tWZT4CcVQ-unsplash.jpg"
import SectionLine from "../components/sectionLine"
import Supporters from "../components/supporters"
import JoinRR from "../components/joinRR"
// import RandomImages from "../components/randomImages"
// import randomImage from "../components/randomImages";

const PartnersTemplate = ({
	location,
	pageContext
}) => {

	useEffect(() => {
		console.log("pageContext", pageContext);
	}, [pageContext]);

	return (
		<Layout>
			<Banner name="Partners" bannerImage={bannerImage} />
			<Container>
				<section className="home-page-about-section">
					<Row>
						<Col xs={12}>
							<h2>Partners</h2>
						</Col>
						<SectionLine />

						<Col md={8} sm={6} xs={12}>
							<div className="about-section-left">
								<p className="featured-paragraph-text">
									Research Review publications bring the best of 10,000 global
									medical journals to your inbox every issue with commentary
									from New Zealand experts. Over 50 areas including Cardiology,
									Diabetes, Oncology, General Practice and Psychiatry.
									Specialist opinions on guidlines, medicines and conferences.
									All Research Review publications are free to receive.
								</p>
								<a href="/" className="btn btn-secondary">
									READ MORE
								</a>
							</div>
						</Col>
						<Col md={4} sm={6} xs={12}>
							<div className="about-section-right">
								<p className="featured-paragraph-text">
									Research Review publications bring the best of 10,000 global
									medical journals to your inbox every issue with commentary
									from New Zealand experts.
								</p>
								<p>
									Phone number
									<br />
									Email address
									<br />
									Website link
								</p>
								<p>
									Full physical address
									<br />
									for Research Review
									<br />
									AKL 2022
								</p>
							</div>
						</Col>
					</Row>
				</section>

				<section className="partners-page-partners-list pt-0">
					<Row>
						{pageContext.partners &&
							<div>
								<Col xs={12}>
									<h2>All Partners</h2>
								</Col>
								<SectionLine />
							</div>
						}
						{pageContext.partners &&
							pageContext.partners.map((partner, index) => {
								return (
									<Col key={index} xs={12}>
										<div className="partner">
											<Row>
												<Col md={2} xs={12}>
													<div>
														<img 
															alt="research review partner image"
															src={partner.image} 
															className="img-fluid" />
													</div>
												</Col>
												<Col md={10} xs={12}>
													<h3>{partner.partnerName}</h3>
													<p>{partner.partnerText}</p>
													<p>Please <a href={partner.link}>CLICK HERE</a> to download CPD information</p>
												</Col>
											</Row>
										</div>
									</Col>
								)
							})
						}
					</Row>
				</section>
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

export default PartnersTemplate