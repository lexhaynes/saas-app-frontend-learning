import React, { Component } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';


const RESEND_API_ENDPOINT = '/api/resend-activation-link';

/* TODO: VALIDATE EMAIL CLIENT SIDE; REDUCE REDUNDANCIES IN OTHER COMPONENTS, E.G. ERROR HANDLING */


class ResendActivationLink extends Component {
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

    handleUpdateEmail(evt) {
        this.setState({
            email: evt.target.value,
        });
   
    }

    handleFormSubmit(evt) {
        const _this = this;
        //submit data to server

        fetch(RESEND_API_ENDPOINT, {
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
            return <Alert variant='success'>An activation link has been sent to your account.</Alert>
        }
        if (errorList.length > 0) {
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
        return (
            <>
                <h2>Resend Activation Link</h2>
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
            </>

        )
    }
}


export default ResendActivationLink;