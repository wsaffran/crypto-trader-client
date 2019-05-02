import React from 'react'
<<<<<<< HEAD

class NavBar extends React.Component {
  render() {
    return (
      <h1>Nav Bar</h1>
    )
    // <Navbar bg="dark" variant="dark">
    //   <Navbar.Brand href="#home">CryptoTrader</Navbar.Brand>
    //   <Nav className="mr-auto">
    //     <Nav.Link href="#portfolio">Portfolio</Nav.Link>
    //     <Nav.Link href="#learn-more">Learn More</Nav.Link>
    //     <Nav.Link href="#browse">Browse</Nav.Link>
    //     <Nav.Link href="#user">User</Nav.Link>
    //   </Nav>
    // </Navbar>

  }
=======
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
>>>>>>> fc7ebb1d4c703e1e5c4ab8e1128941130f71c471
}

export default NavBar;
