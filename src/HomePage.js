import React, { Component } from 'react';
//import { withRouter } from 'react-router-dom';


class HomePage extends Component {
    componentDidMount() {
        console.log(this.props);
        //this.props.history.push("/login");
    }
    render() {
        return (
            <div>
            HomePage component
            </div>
        )

    }
}

export default HomePage;