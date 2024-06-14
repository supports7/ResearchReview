import React, { useEffect } from "react";
import Layout from "../components/layout";
// import { Link, graphql } from "gatsby";
import { Container, Row, Col } from "react-bootstrap";
import Banner from "../components/banner";
import SectionLine from "../components/sectionLine";
import Supporters from "../components/supporters";
import JoinRR from "../components/joinRR";

const SampleReviewsTemplate = ({
	pageContext
}) => {

	useEffect(() => {
		console.log("pageContext", pageContext);
	}, [pageContext]);

	const bannerContent = {
		bannerImage: pageContext.content.bannerImage,
		bannerText: pageContext.content.bannerText,
		buttonLink: pageContext.content.buttonLink,
		buttonText: pageContext.content.buttonText,
	};

	return (
		<Layout>
			<Banner bannerContent={bannerContent} />
			<Container>
				<section className="home-page-about-section">
					<Row>
						<Col xs={12}>
							<h2>Sample Reviews</h2>
						</Col>
						<SectionLine />
					</Row>
				</section>

				<section className="modules-page-modules-list pt-0">
					<Row>
						{pageContext.sampleReviews && pageContext.sampleReviews.Children &&
							pageContext.sampleReviews.Children.map((sampleReview, index) => {
								return (
									<a key={index} target="_blank" href={`https://rrcms.s05.system7.co.nz${sampleReview.file}`}><p>{sampleReview.title}</p></a>
								)
							})
						}
					</Row>
				</section>
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

export default SampleReviewsTemplate