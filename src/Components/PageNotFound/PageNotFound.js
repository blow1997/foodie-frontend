import React from 'react'
import { Link } from 'react-router-dom';

const PageNotFound = () => {
  return (
    <div className="pt-5 mt-5 text-center">
      <h1>Page Not Found</h1>
      <Link to="/">Go to Home </Link>
    </div>
  )
}

export default PageNotFound
