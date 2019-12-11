import React, { Component } from 'react'

const footerStyle = {
    position : 'fixed',
    left : 0,
    bottom : 0,
    width : '100%',
    background : '#343a40',
    color : '#fff',
    height : '3.5rem',
    fontSize : '1.25rem',
    padding : '.75rem 3.175rem'
}

export default class Footer extends Component {
  render(){
    return(
      <footer style={footerStyle}>
          | Footer
      </footer>
    )
  }
}