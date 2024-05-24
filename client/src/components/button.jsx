import React from 'react'

const Button = ({title, buttonStyle,callback}) => {
  return (
        <button style={buttonStyle||defaultStyle} onClick={callback}>{title}</button>
  )
}

export default Button;

const defaultStyle={
    padding:"0.5rem 1rem",
    border:"none",
    outline:"none",
    borderRadius:"0.2rem",
    background:"#727272",
    color:"#fff"
}