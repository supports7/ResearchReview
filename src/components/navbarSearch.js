import React, { useEffect, useState, useRef } from "react"
import { Row, Col } from "react-bootstrap"
import SearchIcon from "@mui/icons-material/Search"
// import { navigate } from 'gatsby'
// import { useHistory } from "react-router-dom";

function SearchForm() {
  const [searchEntry, setSearchEntry] = useState("")
  const inputRef = useRef(null);
  // const history = useHistory();
  const handleInputChange = (event) => {
    setSearchEntry(event.target.value);
  };
  const handleSearchSubmit = async event => {
    event.preventDefault()

    if (searchEntry) {
      console.log(searchEntry)
      window.location.href = `/search?search=${searchEntry}`;
      // history.push(`/search?query=${searchEntry}`);
    }
  }

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  return (
    <div className="search-form">
      <form onSubmit={handleSearchSubmit} className="navbar-serach">
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
                ref={inputRef}
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
  )
}


export default SearchForm