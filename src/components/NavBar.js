
class NavBar extends React.Component {
  render() {
    return
    <Navbar bg="dark" variant="dark">
      <Navbar.Brand href="#home">CryptoTrader</Navbar.Brand>
      <Nav className="mr-auto">
        <Nav.Link href="#portfolio">Portfolio</Nav.Link>
        <Nav.Link href="#learn-more">Learn More</Nav.Link>
        <Nav.Link href="#browse">Browse</Nav.Link>
        <Nav.Link href="#user">User</Nav.Link>
      </Nav>
    </Navbar>
    <br />
  }
}

export default NavBar;
