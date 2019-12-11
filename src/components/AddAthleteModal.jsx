import React, { Component } from 'react'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'


const athletesAPI = 'http://theboxathletes.herokuapp.com/athletes/'



export default class AddAthleteModal extends Component {

    constructor(props){
        super(props)
        this.state = {
            isValidated: false, 
            selectedFile: null
        }
    }

    onChangeFileHandler=(event)=>{
        this.setState({
            selectedFile: event.target.files[0],
            loaded:0
        })
        console.log(event.target.files[0])
    }


    handleSubmit =(event)=>{
        const form = event.currentTarget
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        } else {
            this.setState({
                isValidated: true
            })
            console.log("Form validated and submitted")

            
            const personalBest = form.formPersonalBest
            const personalScore = {}
            for(let i = 0 ; i < personalBest.length; i++){
                personalScore[personalBest[i].placeholder] = personalBest[i].value
            }

            const formData = new FormData()
            formData.append('name', form.formName.value)
            formData.append('email', form.formEmail.value)
            formData.append('age', form.formAge.value)
            formData.append('sex', form.formGender.value)
            formData.append('personalBest', JSON.stringify(personalScore))
            formData.append('photo', this.state.selectedFile)

            console.log(formData)

            fetch(athletesAPI, {
                method: 'POST',
                body: formData
            }).then((response)=>{console.log(response.json())},
            (error)=>{console.log(error)})

        }

        // event.preventDefault()
        console.log("Submitting attempt: isValidated is " + this.state.isValidated)

        
    }


    render(){
        return (
            <Modal
            {...this.props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                Add new Athlete
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
            {/* FORM STARTS HERE */}
                <Form noValidate validated={this.state.isValidated} onSubmit={this.handleSubmit}>
            {/* NAME */}
                    <Form.Group as={Row} controlId="formName">
                        <Form.Label column sm={2}>Name</Form.Label>
                        <Col sm={10}>
                            <Form.Control required type="text" placeholder="Athlete's name" />
                        </Col>
                    </Form.Group>
            {/* EMAIL ADDRESS */}
                    <Form.Group as={Row} controlId="formEmail">
                        <Form.Label column sm={2}>Email</Form.Label>
                        <Col sm={10}>
                            <Form.Control required type="email" placeholder="Enter email" />
                            <Form.Text className="text-muted">
                                We'll never share your email with anyone else.
                            </Form.Text>
                            <Form.Control.Feedback type="invalid">
                                Please provide a valid email.
                            </Form.Control.Feedback>
                        </Col>
                    </Form.Group>
            {/* AGE SELECTION */}
                    <Form.Group as={Row} controlId="formAge">
                        <Form.Label column sm={2}>Age</Form.Label>
                        <Col sm={10}>               
                            <Form.Control required type="number" placeholder="Enter age" />
                        </Col>
                    </Form.Group>
            {/* GENDER SELECTION */}
                    <fieldset>
                        <Form.Group as={Row} controlId="formGender">
                            <Form.Label as="legend" column sm={2}>
                                Sex
                            </Form.Label>
                            <Col sm={10}>
                                <Form.Check type="radio" label="M" value="M" name="gender"  />
                                <Form.Check type="radio" label="F" value="F" name="gender" />
                            </Col>
                        </Form.Group>
                    </fieldset>
            {/* PERSONAL BEST SCORE */}
                    <Form.Group as={Row} controlId="formPersonalBest">
                        <Form.Label column lg={12}>
                                Personal Best
                        </Form.Label>
                        <Col sm={3}>
                            <Form.Control size="sm" type="number" placeholder="Benchpress" />
                        </Col>
                        <Col sm={3}>
                            <Form.Control size="sm" type="number" placeholder="Strictpress" />
                        </Col>
                        <Col sm={3}>
                            <Form.Control size="sm" type="number" placeholder="Pushpress" />
                        </Col>
                        <Col sm={3}>
                            <Form.Control size="sm" type="number" placeholder="Row" />
                        </Col>
                        <Col sm={3}>
                            <Form.Control size="sm" type="number" placeholder="Backsquat" />
                        </Col>
                        <Col sm={3}>
                            <Form.Control size="sm" type="number" placeholder="Frontsquat" />
                        </Col>
                        <Col sm={3}>
                            <Form.Control size="sm" type="number" placeholder="Deadlift" />
                        </Col>
                        <Col sm={3}>
                            <Form.Control size="sm" type="number" placeholder="Trapbardeadlift" />
                        </Col>
                    </Form.Group>
            {/* PHOTO UPLOAD */}
                    <Form.Group as={Row} controlId="formPhoto">
                        <Form.Label column sm={2}>Photo</Form.Label>
                        <Col sm={10}>
                            <Form.Control required type="file" onChange={this.onChangeFileHandler}/>
                        </Col>
                    </Form.Group>
            {/* SUBMIT BUTTON */}
                    <Form.Group as={Row}>
                        <Col sm={{ span: 10, offset: 2 }}>
                            <Button variant="success" type="submit">
                                Submit
                            </Button>
                        </Col>
                    </Form.Group>
                </Form>
            {/* FORM ENDED RIGHT ABOVE */}
            </Modal.Body>
            {/* OPTIONAL FOOTER - UNCOMMENT BELOW TO DISPLAY */}
            {/* <Modal.Footer>
                <Button variant="danger" size="sm" onClick={props.onHide}>Cancel</Button>
            </Modal.Footer> */}
            </Modal>
        );
        }
}