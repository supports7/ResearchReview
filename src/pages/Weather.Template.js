import React, {useEffect} from "react";
import { Link } from 'gatsby'

const DatePage = ({pageContext}) => {
  const weather = pageContext.weather;

  useEffect(() => {
    console.log("pageContext - ", pageContext)
  }, [pageContext])

  return (
    <main>
      <h1>DATE PAGE {weather.Summary}  {weather.TemperatureF}</h1>
      <Link to="/">Back to Home</Link>
      <p></p>
    </main>
  )
}

export default DatePage

export const Head = () => <title>Date Page</title>
