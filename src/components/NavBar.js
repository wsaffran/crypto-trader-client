import React from 'react'
import { Navbar, Nav } from 'react-bootstrap';

const NavBar = (props) => {
    return (
    <Navbar bg="dark" variant="dark">
      <Navbar.Brand name="home">CryptoTrader</Navbar.Brand>
      <Nav className="ml-auto">
        <Nav.Link onClick={props.handleClick} name="portfolio">Portfolio</Nav.Link>
        <Nav.Link onClick={props.handleClick} name="browse">Browse</Nav.Link>
        <Nav.Link onClick={props.handleClick} name="learn-more">Learn More</Nav.Link>
        <Nav.Link onClick={props.handleClick} name="user">User</Nav.Link>
      </Nav>
    </Navbar>
    )
}

export default NavBar;
