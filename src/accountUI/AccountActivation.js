import React, { Component } from 'react';
import { useHistory, Link } from "react-router-dom";
import Container from '../layout/ContainerBasic';
import queryString from 'query-string';
import Alert from 'react-bootstrap/Alert';

const ACTIVATION_API_ENDPOINT = '/api/account-activate';
  


class AccountActivation extends Component {
    constructor(props) {
        super(props);
        this.state = {
            success: false,
            results: null,
            errorList: [],
        };
        //this.handleUpdateEmail = this.handleUpdateEmail.bind(this);

      }

    componentDidMount() {
        //get token from url
        const token = queryString.parse(this.props.location.search).token || null;
        
        if (!token) {
            this.setState({
                success: false,
                errorList: [...this.state.errorList, {errorMsg: "There was a problem with the activation token."}]
            });
            return;
        }

        fetch(ACTIVATION_API_ENDPOINT, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            credentials: 'same-origin', //<-- because we have specified same-origins, all api requests send a cookie to server
            body: JSON.stringify({
                activationToken: token
            })
        }).then((res) => {
            if (!res.ok) {
                return res.json().then(err => {throw err}); //<-- throw an error if response is not ok
            }
            return res.json();
        }).then((results) => {
            //SUCCESSFUL LOGIN
            this.setState({
                success: true,
                results: results
            });
         
        })
        .catch((err) => {
            console.log("error: ", err);
            //DISPLAY ERROR ON UI
            this.setState({
                success: false,
                errorList: [...this.state.errorList, err]
            });
        });
    }


    render() {
        const { success, results, errorList } = this.state;

        if (success) {
            return <ActivatedAccount results={results} />;
        }

        return (
            <Container>
                {
                    errorList.map((err, i) => {
                        return (
                            <Alert key={i} variant='danger'>
                                {err.errorMsg} <Link to="/resend-activation-token">Resend activation token.</Link>
                            </Alert>
                        )
                    })
                }
            </Container>
        )
    }
}//end AccountActivation()

function ActivatedAccount(props) {
    const email = props.results.email;
    let history = useHistory();

    //redirect to logged-in area
    /* note: will need to add an alert to logged-in area so user knows they are logged in successfully */
    const redirectToLoggedIn = () => {
        console.log("the following email is activated: " + email);
        window.setTimeout(()=>{
            history.push("/");
        }, 5000);
    }

    return (
        <React.Fragment>
            <Alert variant='success'>Your account has been successfully activated! You are now logged in.</Alert>
            {
                redirectToLoggedIn()
            
            } 
        </React.Fragment>
        )   
  } 


export default AccountActivation;