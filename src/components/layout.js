import * as React from "react"
// import { Link } from "gatsby"
// import { Container, Nav, Row, Col } from "react-bootstrap";
import ResearchReviewNavbar from './navbar';
import ResearchReviewFooter from './footer';
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
      <link rel="preload" src="/fonts/GothamBookItalic.woff2" as="font" type="font/woff2" crossOrigin="anonymous" key="interFont" />
      <link rel="preload" src="/fonts/GothamBook.woff2" as="font" type="font/woff2" crossOrigin="anonymous" key="interFont2" />
      <link rel="preload" src="/fonts/GothamBold.woff2" as="font" type="font/woff2" crossOrigin="anonymous" key="interFont3" />
      {/* <header className="global-header">{header}</header> */}
      <ResearchReviewNavbar />
      <main>
        {children}
      </main>
      <script src="https://portal.system7.co.nz/Scripts/System7Feedback.js"></script>
      <ResearchReviewFooter />
    </div>
  )
}

export default Layout
