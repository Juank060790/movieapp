import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  Navbar,
  Nav,
  Form,
  FormControl,
  Button,
  NavDropdown,
  Container,
} from "react-bootstrap";

export default function MovieNavbar({
  genreList,
  originalList,
  setMovieList,
  searchByTopRated,
  handleSelect,
  setGenreList,
}) {
  const searchByKeyword = (e) => {
    let filteredList = originalList.filter((movie) =>
      movie.title.includes(e.target.value)
    );
    setMovieList(filteredList);
  };

  return (
    <Container fluid>
      <Navbar className="navbar-dark m-auto" expand="lg">
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto navbar-light">
            <Navbar.Brand href="#home">Movie</Navbar.Brand>
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#features">Movies</Nav.Link>
            <Nav.Link href="#pricing">More Info</Nav.Link>
          </Nav>
          <Button onClick={() => searchByTopRated()} variant="warning">
            TopRated
          </Button>
          <NavDropdown title="Dropdown" id="basic-nav-dropdown">
            {genreList &&
              genreList.map((genre) => (
                <NavDropdown.Item
                  onSelect={(e) => handleSelect(e)}
                  eventKey={genre.id}
                  key={genre.id}
                  href="#action/3.1"
                >
                  {genre.name}
                </NavDropdown.Item>
              ))}
          </NavDropdown>
          <Form inline>
            <FormControl
              type="text"
              placeholder="Search"
              className="mr-sm-2"
              onChange={(e) => searchByKeyword(e)}
            />
            <Button variant="outline-success">Search</Button>
          </Form>
        </Navbar.Collapse>
      </Navbar>
    </Container>
  );
}
