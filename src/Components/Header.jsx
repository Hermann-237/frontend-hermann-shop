import { Fragment } from "react";
import { Navbar, Nav } from "react-bootstrap";

function Header() {
  return (
    <Fragment>
      <Navbar expand="lg" className="container my-3">
        <Navbar.Brand href="/frontend-hermann-shop" className="text-danger">
          Logo
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto">
            <Nav.Link href="/frontend-hermann-shop">Home</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      <hr />
    </Fragment>
  );
}

export default Header;
