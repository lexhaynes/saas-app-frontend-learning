import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Form, Button, Alert } from 'react-bootstrap/';
import Container from '../layout/ContainerBasic';


const RESET_PASSWORD_API_ENDPOINT = '/api/reset-password-link';

/* TODO: VALIDATE EMAIL CLIENT SIDE; REDUCE REDUNDANCIES IN OTHER COMPONENTS, E.G. ERROR HANDLING */


class ResetPasswordLink extends Component {
   constructor(props) {
        super(props);
        this.state = {
            email: '',
            success: false,
            errorList: [],
        };
        this.handleUpdateEmail = this.handleUpdateEmail.bind(this);
        this.handleFormSubmit = this.handleFormSubmit.bind(this);

      }

    handleUpdateEmail = (evt) => {
        this.setState({
            email: evt.target.value,
        });
   
    }

    handleFormSubmit = (evt) => {
        const _this = this;
        //submit data to server

        fetch(RESET_PASSWORD_API_ENDPOINT, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            credentials: 'same-origin', //<-- because we have specified same-origins, all api requests send a cookie to server
            body: JSON.stringify({
                email: _this.state.email,
            })
        }).then((res) => {
            if (!res.ok) {
                return res.json().then(err => {throw err}); //<-- throw an error if response is not ok
            }
            return res.json();
        }).then((results) => {
            //SUCCESSFUL API REQUEST   
            _this.setState({ success: true });     
            console.log("results: ", results);

         
        })
        .catch((err) => {
            //DISPLAY ERROR ON UI
            console.log("error: ", err);
            //DISPLAY ERROR ON UI
            this.setState({
                error: true,
                errorList: err.errors
            });
        })

    }


    render() {
        const { email, success, errorList } = this.state;

        if (success) {
            return (
               <Alert variant='success'>A reset-password link has been sent to your account.</Alert>
            )
        }
        if (errorList.length > 0) {
            return (
                        errorList.map((err, i) => {
                            return (
                                <Alert key={i} variant='danger'>
                                    {err.errorMsg}
                                </Alert>
                            )
                        })
                    
            )
        }
        
        return ( //TODO: client-side email validation here
                <div className="form-container">
                        <div className="form-header">Email Password Reset Link</div>
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

                            <Button 
                                variant="primary" 
                                type="button"
                                disabled={!email.length }
                                onClick={this.handleFormSubmit}
                            >
                                Submit
                            </Button>
                        </Form>
            
                    <div className="form-footer"> 
                            Want to try logging in again? <Link to='/login'>Login here.</Link>
                    </div>
                </div>
                

        )
    }
}


export default ResetPasswordLink;