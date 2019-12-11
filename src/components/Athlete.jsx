import React, {Component, Fragment} from 'react';
import Accordion from 'react-bootstrap/Accordion';
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import ButtonGroup from 'react-bootstrap/ButtonGroup'

const athletesAPI = 'http://theboxathletes.herokuapp.com/athletes/'


export default class Athlete extends Component {

    deleteAthlete =(event)=>{
        const athleteID = event.target.id
        console.log(athleteID)
        fetch(athletesAPI+athleteID, {
            method: 'DELETE'
        }).then(res=>res.json()).then((answer)=>{console.log(answer)},(error)=>console.log(error))
        
        // re-render here !!!
    }

    render(){

        const { name, age, sex, email, photo, _id } = this.props.info;

        return(
            <Fragment>
                <Card key={_id} border="success">
                    <Accordion.Toggle as={Card.Header} variant="link" eventKey={_id}>
                        {name}
                    </Accordion.Toggle>
                    <Accordion.Collapse eventKey={_id}>
                    <Card.Body>
                        <Card.Img variant="top" src={photo}/>

                        <Card.Title>{name}</Card.Title>
    
                        <Card.Text>
                            <small className="text-muted">{email}</small>
                            <span style={{display: 'block'}}> Age: {age} | Sex: {sex}</span>             
                        </Card.Text>
                        <ButtonGroup size="sm" aria-label="Action Buttons">
                            <Button variant="success">Personal Best</Button>
                            <Button variant="warning">Edit Athlete</Button>
                            <Button variant="danger" onClick={this.deleteAthlete} id={_id}>Detele Athlete</Button>
                        </ButtonGroup>
                        
                    </Card.Body>
                    </Accordion.Collapse>
                </Card>
            </Fragment>
        )
    }
}