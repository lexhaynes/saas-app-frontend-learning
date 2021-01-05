import React, { Component } from 'react';
import { Form, Button, Alert, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import {
    validateEmail,
    validatePassword
 } from './utils';

 const REGISTRATION_API_ENDPOINT = '/api/register';

/*

- when email is valid && password meets validation requirements, enable submit button

*/

class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            emailIsValid: false,
            passwordIsValid: false,
            errorList: [],
            success: false,
        };
        this.handleUpdateEmail = this.handleUpdateEmail.bind(this);
        this.handleUpdatePassword = this.handleUpdatePassword.bind(this);
        this.handleFormSubmit = this.handleFormSubmit.bind(this);

      }

    handleUpdateEmail(evt) {

        this.setState({
            email: evt.target.value,
            emailIsValid: validateEmail(evt.target.value),
        });
   
    }

    handleUpdatePassword(evt) {
        this.setState({
            password: evt.target.value,
            passwordIsValid: validatePassword(evt.target.value),
        });
    }

    handleFormSubmit(evt) {
        //submit data to server
        const { email, password } = this.state;

        fetch(REGISTRATION_API_ENDPOINT, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            credentials: 'same-origin', //<-- this is for cookies or something...
            body: JSON.stringify({
                email: email,
                password: password
            })
        }).then((res) => {
            if (!res.ok) {
                return res.json().then(err => {throw err}); //<-- throw an error if response is not ok
            }
            return res.json;
        }).then((results) => {
            //ACCOUNT SUCCESSFULLY CREATED
            this.setState({
                success: true
            })
            
            console.log("results: ", results);
        })
        .catch((err) => {
            console.log(err.errors);
            //DISPLAY ERROR ON UI

            this.setState((prevState, props) => ({
                errorList: [...prevState.errorList, ...err.errors],
            }));

            console.log('error list: ', this.state.errorList);

        })

    }


    render() {
        const { success, email, password, emailIsValid, passwordIsValid, errorList } = this.state;

        if (errorList.length) {
            return (
                <>
                    {
                        errorList.map((err, i) => {
                            return (
                                <Alert key={i} variant='danger'>
                                    {err.errorMsg}
                                </Alert>
                            )
                        })
                    }
                </>
            )
        } 

        if (success) {
            return (
                <Alert variant="success">You are now registered! Redirect to logged in area.</Alert>
            )
        }
 
        return (
                <Card>
                <Card.Header as="h2">Register</Card.Header>

                    <Card.Body>          
                        <Form> 
                        <Form.Group controlId="formBasicEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control 
                                type="email" 
                                placeholder="Enter email" 
                                value={email} 
                                onChange={this.handleUpdateEmail}
                            />
                        
                        </Form.Group>

                        <Form.Group controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control 
                                type="password" 
                                placeholder="Password" 
                                value={password} 
                                onChange={this.handleUpdatePassword}
                            />
                            <Form.Text className="text-muted">Password instructions</Form.Text>
                            
                        </Form.Group>


                        <Button 
                            variant="primary" 
                            type="button"
                            disabled={!(emailIsValid && passwordIsValid) }
                            onClick={this.handleFormSubmit}
                        >
                            Submit
                        </Button>
  
                        </Form>
                    </Card.Body>
                    <Card.Footer> 
                            Already have an account? <Link to='/login'>Log in instead.</Link> 
                        </Card.Footer>
                </Card>

        )
    }
}


export default Register;