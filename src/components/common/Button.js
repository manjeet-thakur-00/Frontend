import React from 'react'
import { Link } from 'react-router-dom'

function Button({ onClick, text, className, type, to }) {
  return (
    <Link to={to}>
      <button onClick={onClick} className={className} type={type}>
        {text}
      </button>
    </Link>


  )
}

export default Button