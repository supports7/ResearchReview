import axios from "axios";
import React, {useEffect, useState} from "react";
import { Link } from 'gatsby'

const DatePage = ({data}) => {
  return (
    <main>
      <h1>DATE PAGE</h1>
      <Link to="/">Back to Home</Link>
      <p></p>
    </main>
  )
}

export default DatePage

export const Head = () => <title>Date Page</title>
