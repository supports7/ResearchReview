import React, { useEffect, useState, useCallback } from "react"
import { navigate, Link } from 'gatsby'
import { Container, Row, Col } from "react-bootstrap"
import Layout from "../components/layout"
import Supporters from "../components/supporters"
import SectionLine from "../components/sectionLine"
// import JoinRR from "../components/JoinRR"
import Cookies from "universal-cookie"
import SearchIcon from "@mui/icons-material/Search"
import CircularProgress from "@mui/material/CircularProgress"

const Search = () => {
  const cookies = new Cookies()
  const loginToken = cookies.get("LoginToken");

  const [searchEntry, setSearchEntry] = useState("");
  const [searchResults, setSearchResults] = useState();
  const [errorMessage, setErrorMessage] = useState("");
  
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const params = new URLSearchParams(window.location.search);
    const query = params.get("search");
    setSearchEntry(query);

    if (query) {
      fetch(`https://researchreview.dev.s05.system7.co.nz/api/search/${query}`, {
        method: "POST",
        // mode: 'no-cors',
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then(res => res.json())
        .then(
          result => {
            setSearchResults(result)
          },
          // Note: it's important to handle errors here
          // instead of a catch() block so that we don't swallow
          // exceptions from actual bugs in components.
          error => {
            setSearchResults()
            setErrorMessage(error)
          }
        )
    }

    setLoading(false);
  }, [])

  const handleInputChange = (event) => {
    setSearchEntry(event.target.value);
  };

  const handleSearchSubmit = async event => { }

  return (
    <Layout>
      <Container>
        <Row>
          <section>
            <Col xs={12}>
              <h2>Search Results</h2>
              <SectionLine />
              <div className="search-page-search-bar">
                <form onSubmit={handleSearchSubmit}>
                  <Row>
                    <Col xs={12}>
                      <div className="search-form-input-div">
                        <input
                          type="text"
                          name="search"
                          className="form-control mt-1"
                          placeholder="Search"
                          value={searchEntry}
                          onChange={handleInputChange}
                          required
                        />
                        <button type="submit" className="search-form-submit">
                          <SearchIcon />
                        </button>
                      </div>
                    </Col>
                  </Row>
                </form>
              </div>
            </Col>
            <Col xs={12}>
              {loading ?
                <div className="search-loading">
                  <CircularProgress />
                </div>
                :
                (searchResults ? 
                  <div>
                    {searchResults}
                  </div>
                  :
                  <div>
                    <p>No results found</p>
                  </div>
                )
              }
            </Col>
          </section>
        </Row>
      </Container>
      <section>
        <Container fluid>
          <Supporters />
        </Container>
      </section>
    </Layout >
  )
}

export default Search