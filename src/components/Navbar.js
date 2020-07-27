import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar, Nav, Form, FormControl, Button, NavDropdown } from 'react-bootstrap'


export default function MovieNavbar({ genreList, originalList, setMovieList ,searchByTopRated, handleSelect, setGenreList}) {
  
  const searchByKeyword = (e) => {
    let filteredList = originalList.filter((movie) =>
      movie.title.includes(e.target.value)
    );
    setMovieList(filteredList);
  };

  return (
    <div>
      <Navbar bg="dark" variant="dark">
        <Navbar.Brand href="#home">Movie</Navbar.Brand>
        <Nav className="mr-auto">
          <Nav.Link href="#home">Home</Nav.Link>
          <Nav.Link href="#features">Movies</Nav.Link>
          <Nav.Link href="#pricing">More Info</Nav.Link>
        </Nav>
        <Button  onClick={() => searchByTopRated()} variant="warning">TopRated</Button>
        <NavDropdown title="Dropdown" id="basic-nav-dropdown">
          {genreList && genreList.map(genre => <NavDropdown.Item onSelect={(e)=>handleSelect(e)} eventKey={genre.id} key={genre.id} href="#action/3.1">{genre.name}</NavDropdown.Item>)}
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
      </Navbar>

    </div>
  );
}
