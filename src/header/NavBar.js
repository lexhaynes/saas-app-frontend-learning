import React, { Component } from 'react';
import { routesData } from '../Routes';
import { Navbar, Nav, NavDropdown, Container } from 'react-bootstrap';


const filterQuery = (path) => {
    return (path === "/register" || path === "/login" || path === "/")
}


const mainNav = routesData.filter(obj => filterQuery(obj.path));

const dropdownNav = routesData.filter(obj => !filterQuery(obj.path));

class NavBar extends Component {

    render() {
        return (
            <Navbar bg="dark" variant="dark" expand="lg">
                    <Navbar.Brand href="/">Bookwhim</Navbar.Brand>
                        <Navbar.Toggle aria-controls="basic-navbar-nav" />
                        <Navbar.Collapse id="basic-navbar-nav">
                            <Nav className="mr-auto">
                                {
                                    mainNav.map( (route, i) => {
                                        return <Nav.Link key={"mainNavLink-"+i} href={route.path}>{ route.title }</Nav.Link>
                                    })
                                }
                                <NavDropdown title="Other Routes" id="basic-nav-dropdown">
                                    {
                                        dropdownNav.map( (route, i) => {
                                            return <NavDropdown.Item key={"mainNavDropdown-"+i} href={route.path}>{ route.title }</NavDropdown.Item>
                                        })
                                    }
                                </NavDropdown>
                            </Nav>
                        </Navbar.Collapse>
            </Navbar>
        )

    }
}

export default NavBar;