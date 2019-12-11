import React, { Component, Fragment } from 'react'
import Accordion from 'react-bootstrap/Accordion'
import Athlete from './Athlete.jsx'
import AddAthleteModal from './AddAthleteModal.jsx'
import Button from 'react-bootstrap/Button'


export default class Main extends Component {

  constructor(){
    super()
    this.state = {
      modalShow: false
    }
    this.showModal = this.showModal.bind(this)
    this.hideModal = this.hideModal.bind(this)
  }

  showModal(){
    this.setState({
      modalShow: true
    })
  }

  hideModal(){
    this.setState({
      modalShow: false
    })
  }

  render(){
    const alwaysVisible = {
      width: "3rem",
      height: "3rem",
      fontSize: "1.25em",
      borderRadius: "50%",
      position: "fixed",
      bottom: 100,
      right: 50
    }

    return(
    <Fragment>
      {/* TEXT DISPLAYED WHILE FETCH IS RUNNING */}
        {this.props.athletes.length === 0 && <p>Loading athletes...</p>}
      {/* DISPLAYNG ATHLETES */}
      <Accordion>
        {this.props.athletes.map(athlete => <Athlete info={athlete} key={athlete._id}/>)}
      </Accordion>
      <div style={{paddingBottom: '3.5rem'}}></div>
      {/* BUTTON ALWAYS VISIBLE FOR ADDING NEW ATHLETE */}
      <Button style={alwaysVisible} onClick={this.showModal}>+</Button>
      {/* MODAL ADD ATHLETE */}
        <AddAthleteModal show={this.state.modalShow} onHide={this.hideModal} />
    </Fragment>
    )

  }
}



