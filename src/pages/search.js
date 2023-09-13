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
import config from "../../config.js"
const Search = () => {
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
      // setSearchResults([{
      //   id: "4956793000004703648",
      //   title: "Efficacy and safety of risankizumab vs. secukinumab in patients with moderate-to-severe plaque psoriasis (IMMerge): Results from a phase III, moderate-to-severe plaque psoriasis (IMMerge): Results from a phase III, randomized, open-label, efficacy–assesso",
      //   summary: "The 52-week, multinational, blinded, open-label, active-comparator, phase III IMMerge study compared risankizumab 150 mg versus secukinumab 300 mg in 327 patients with chronic, moderate-to-severe plaque psoriasis. Risankizumab was noninferior (12% noninferiority margin) to secukinumab for the proportion of patients achieving a =90% improvement from baseline in Psoriasis Area and Severity Index (PASI 90; primary endpoint) at 16 weeks (73.8% vs 65.6%; difference 8.2%; 96.25% CI -2.2 to 18.6) and superior to secukinumab at 52 weeks (86.6% vs 57.1%; difference 29.8%; 95% CI 20.8-38.8; p < 0.001). All secondary endpoints, including PASI 100, static PGA 0/1, and PASI 75, were also better in risankizumab recipients at 52 weeks (all p < 0.001).",
      //   url: "/clinical-areas/medical-specialty/internal-medicine/medical-oncology/oncology/IS-1624/SC-2392",
      //   type: 'Article'
      // },
      // {
      //   id: "4956793000004703648",
      //   title: "Efficacy and safety of risankizumab vs. secukinumab in patients with moderate-to-severe plaque psoriasis (IMMerge): Results from a phase III, moderate-to-severe plaque psoriasis (IMMerge): Results from a phase III, randomized, open-label, efficacy–assesso",
      //   summary: "The 52-week, multinational, blinded, open-label, active-comparator, phase III IMMerge study compared risankizumab 150 mg versus secukinumab 300 mg in 327 patients with chronic, moderate-to-severe plaque psoriasis. Risankizumab was noninferior (12% noninferiority margin) to secukinumab for the proportion of patients achieving a =90% improvement from baseline in Psoriasis Area and Severity Index (PASI 90; primary endpoint) at 16 weeks (73.8% vs 65.6%; difference 8.2%; 96.25% CI -2.2 to 18.6) and superior to secukinumab at 52 weeks (86.6% vs 57.1%; difference 29.8%; 95% CI 20.8-38.8; p < 0.001). All secondary endpoints, including PASI 100, static PGA 0/1, and PASI 75, were also better in risankizumab recipients at 52 weeks (all p < 0.001).",
      //   url: "/clinical-areas/medical-specialty/internal-medicine/medical-oncology/oncology/IS-1624/SC-2392",
      //   type: 'Article'
      // }])
      fetch(`https://researchreview.dev.s05.system7.co.nz/api/search?q=${query}`, {
        method: "GET",
        // mode: 'no-cors',
        headers: {
          "Content-Type": "application/json",
          "Country": config.country,
        },
      })
        .then(res => res.json())
        .then(
          result => {
            console.log("search results", result)
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
                (searchResults && searchResults.length ?
                  <div className="results">
                    <Row>
                      {searchResults.map((result) => {
                        let cleanedString = "";
                        if(result.url){
                          console.log(result.url);
                          const cleanedStringTemp =  result.url.replace(/\(([^)]+)\)/g, (match, group) => {
                            // Use decodeURIComponent to convert the URL-encoded group to its original form
                            return decodeURIComponent(group);
                          });
                          cleanedString = cleanedStringTemp;
                        }
                        return (
                          <div className="result-main-div" key={result.id}>
                            <Col xs={12}>
                              <SectionLine />
                              <a href={cleanedString} className="result-title">
                                <p>{result.title}</p>
                              </a>
                              <p>{result.summary}</p>
                              <p>Type: {result.type}</p>
                              <a href={cleanedString}>
                                <p>{cleanedString}</p>
                              </a>
                            </Col>
                          </div>
                        )
                      })}
                    </Row>
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
      {/* <section>
        <Container fluid>
          <Supporters />
        </Container>
      </section> */}
    </Layout >
  )
}

export default Search