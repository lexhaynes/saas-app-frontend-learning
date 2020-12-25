import React, { Component } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from '../layout/ContainerBasic';
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
        const _this = this;
        //submit data to server

        fetch(REGISTRATION_API_ENDPOINT, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            credentials: 'same-origin', //<-- this is for cookies or something...
            body: JSON.stringify({
                email: _this.state.email,
                password: _this.state.password
            })
        }).then((res) => {
            if (!res.ok) {
                return res.json().then(err => {throw err}); //<-- throw an error if response is not ok
            }
            return res.json;
        }).then((results) => {
            //ACCOUNT SUCCESSFULLY CREATED
            alert("account successfully created!");
            
            console.log("results: ", results);
        })
        .catch((err) => {
            //DISPLAY ERROR ON UI
            console.log("There was an error posting data: ", err.errors);
        })

    }


    render() {
        return (
            <Container>
                <h2>Register</h2>
                <Form>
                    
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control 
                            type="email" 
                            placeholder="Enter email" 
                            value={this.state.email} 
                            onChange={this.handleUpdateEmail}
                        />
                      
                    </Form.Group>

                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control 
                            type="password" 
                            placeholder="Password" 
                            value={this.state.password} 
                            onChange={this.handleUpdatePassword}
                        />
                        <Form.Text className="text-muted">Password instructions</Form.Text>
                        
                    </Form.Group>


                    <Button 
                        variant="primary" 
                        type="button"
                        disabled={!(this.state.emailIsValid && this.state.passwordIsValid) }
                        onClick={this.handleFormSubmit}
                    >
                        Submit
                    </Button>
                </Form>
            
            </Container>

        )
    }
}


export default Register;