import { NavLink } from "react-router-dom";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Form from 'react-bootstrap/Form';

type NavBarProps = {
  userName: string | undefined;
};
export default function NavBar({ userName }: NavBarProps) {

  function renderLoginLogout() {
    if (userName) {
      return (
        <NavLink to={"/login"}> {userName}</NavLink>
        );
    } else {
      return (
        <NavLink to={"/login"}> Login </NavLink>

      );
    }
  }


  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container fluid>
        <Navbar.Brand href="#">Tool finder</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: '100px' }}
            navbarScroll
          >
            <NavLink to={"/passwords"}>Passwords</NavLink>
            <NavLink to={"/new"}>New password</NavLink>

          
          </Nav>
          <Form className="d-flex">
           
          {renderLoginLogout()}
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
