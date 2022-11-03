import * as React from "react"
import { Link } from "gatsby"
import { Container, Nav, Row, Col } from "react-bootstrap";
import ResearchReviewNavbar from './navbar'
import "bootstrap/dist/css/bootstrap.min.css";
const Layout = ({ children }) => {
  // const rootPath = `${__PATH_PREFIX__}/`
  // const isRootPath = location.pathname === rootPath
  // let header

  // if (isRootPath) {
  //   header = (
  //     <h1 className="main-heading">
  //       <Link to="/">{title}</Link>
  //     </h1>
  //   )
  // } else {
  //   header = (
  //     <Link className="header-link-home" to="/">
  //       {title}
  //     </Link>
  //   )
  // }

  return (
    <div className="">
      {/* <header className="global-header">{header}</header> */}
      <section>
        <ResearchReviewNavbar />
      </section>
      <main>
        <Container>
          {children}
        </Container>
      </main>
      <script src="https://portal.system7.co.nz/Scripts/System7Feedback.js"></script>
      {/* <footer>
        © {new Date().getFullYear()}, Built with
        {` `}
        <a href="https://www.gatsbyjs.com">Gatsby</a>
      </footer> */}
    </div>
  )
}

export default Layout
