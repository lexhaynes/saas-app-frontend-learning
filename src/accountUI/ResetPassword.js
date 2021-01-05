import React, { Component } from 'react';
import { Link } from "react-router-dom";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import queryString from 'query-string';
import Container from '../layout/ContainerBasic';


const RESET_PASSWORD_API_ENDPOINT = '/api/reset-password';

/*
    STEPS:
    1. on componentDidMount, check that password reset token is valid via a fetch to db
    2. IF token is valid, display password reset form
    3. on submit of password reset form, post reset password

    OR

    STEPS
    1. display form by default, even if the token is wrong
    2. send API request on form submit
*/


class ResetPassword extends Component {
   constructor(props) {
        super(props);
        this.state = {
            password: '',
            errorList: [],
            success: false,
            token: null,
        };
        this.handleUpdatePassword = this.handleUpdatePassword.bind(this);
        this.handleFormSubmit = this.handleFormSubmit.bind(this);

      }

    componentDidMount = () => {
        console.log("did mount");
        //get token from url
        const token = queryString.parse(this.props.location.search).token || null;

        //if no token, perhaps redirect to home page? or display an error
        if (token === null) {
            
            const error = {
                errorMsg: "Please request a reset password link."
            };

            this.setState({
                errorList: [...this.state.errorList, error]
            });

        } else {
            this.setState({
                token
            });
        }

    }


    handleUpdatePassword = (evt) => {
        this.setState({
            password: evt.target.value,
        });
   
    }

    handleFormSubmit = (evt) => {
        const { token, password } = this.state;

        fetch(RESET_PASSWORD_API_ENDPOINT, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            credentials: 'same-origin', //<-- because we have specified same-origins, all api requests send a cookie to server
            body: JSON.stringify({
                password: password,
                resetPasswordToken: token,
            })
        }).then((res) => {
            if (!res.ok) {
                return res.json().then(err => {throw err}); //<-- throw an error if response is not ok
            }
            return res.json();
        }).then((results) => {
            //SUCCESSFUL API REQUEST  
            this.setState({
                success: true
            });
            //do something
            console.log(results);
        })
        .catch((err) => {
            //DISPLAY ERROR ON UI         
            console.log(err);
    
            this.setState({
                errorList: [...this.state.errorList, err]
            });
        })

    }


    render() {
        const { password, errorList, success} = this.state;

        if (errorList.length) {
            return (
                <Container>
                    {
                        errorList.map((err, i) => {
                            return (
                                <Alert key={i} variant='danger'>
                                    {err.errorMsg}
                                </Alert>
                            )
                        })
                    }
                </Container>
            )
        } 

        if (success) {
            return (
                <Container>
                     <Alert variant='success'> Your password has been succesfully updated. Please proceed to <Link to="/login">login page</Link> </Alert>
                </Container>
            )
        }
         return ( //TODO: client-side password validation here
            <Container>
                <h2>Reset Password</h2>
                <Form>
                    
                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control 
                            type="password" 
                            placeholder="Enter new password" 
                            value={password} 
                            onChange={this.handleUpdatePassword}
                        />
                    </Form.Group>

                    <Button 
                        variant="primary" 
                        type="button"
                        disabled={!password.length }
                        onClick={this.handleFormSubmit}
                    >
                        Submit
                    </Button>
                </Form>
            
            </Container>

        )
    }
}



export default ResetPassword;