import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Form, Alert, Button, Card } from 'react-bootstrap';
import Cookies from 'js-cookie';

 const LOGIN_API_ENDPOINT = '/api/login';


class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            success: false,
            errorList: []
        };
        this.handleUpdateEmail = this.handleUpdateEmail.bind(this);
        this.handleUpdatePassword = this.handleUpdatePassword.bind(this);
        this.handleFormSubmit = this.handleFormSubmit.bind(this);

      }

    handleUpdateEmail(evt) {

        this.setState({
            email: evt.target.value,
        });
   
    }

    handleUpdatePassword(evt) {
        this.setState({
            password: evt.target.value,
        });
    }

    handleFormSubmit(evt) {
        const _this = this;
        //submit data to server

        fetch(LOGIN_API_ENDPOINT, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            credentials: 'same-origin', //<-- because we have specified same-origins, all api requests send a cookie to server
            body: JSON.stringify({
                email: _this.state.email,
                password: _this.state.password
            })
        }).then((res) => {
            if (!res.ok) {
                return res.json().then(err => {throw err}); //<-- throw an error if response is not ok
            }
            return res.json();
        }).then((results) => {
            //SUCCESSFUL LOGIN
            this.setState({
                success:true
            })
            
            console.log("results: ", results);
            //this cookie will be sent to the server with each API request, and will confirm that the user is logged in.
            const token = results.token;
            Cookies.set('token', token, {
                expires: 7 //<-- cookie experiesi n 7 days
            });
        })
        .catch((err) => {
            console.log(err);
            //DISPLAY ERROR ON UI
            this.setState((prevState, props) => ({
                errorList: [...prevState.errorList, ...err.errors],
            }));
        })

    }


    render() {
        const { success, email, password, errorList } = this.state;

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
                <Alert variant="success">You are now logged in! Redirect to logged in area.</Alert>
            )
        }
 
        return (
                <Card>
                    <Card.Header as="h2">Login</Card.Header>

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
                            
                        </Form.Group>


                        <Button 
                            variant="primary" 
                            type="button"
                            disabled={!(this.state.email.length && this.state.password.length) }
                            onClick={this.handleFormSubmit}
                        >
                            Submit
                        </Button>
                        </Form>
                    </Card.Body>
                    <Card.Footer> 
                            <p>Don't have an account? <Link to='/register'>Register here.</Link></p>
                            <p>Trouble logging in?  <Link to='/account/reset-password-link'>Reset password here.</Link></p>
                    </Card.Footer>
                </Card>
        )
    }
}


export default Login;