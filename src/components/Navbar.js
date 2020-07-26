import React, {useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar, Nav, Form, FormControl, Button,NavDropdown } from 'react-bootstrap'

const apikey = process.env.REACT_APP_APIKEY
export default function MovieNavbar({originalList, setMovieList}) {
  const [genreList, setGenreList] = useState(null)
  const [ currentGenre, setCurrentGenre] = useState(null)
  const searchByKeyword = (e) => {
    let filteredList = originalList.filter((movie) =>
      movie.title.includes(e.target.value)
    );
    setMovieList(filteredList);
  };

  const getGenreList = async () => {
    let url = `https://api.themoviedb.org/3/genre/movie/list?api_key=${apikey}&language=en-US`;
    let result = await fetch(url)
    let data = await result.json()
    console.log('genre', data.genres)
    setGenreList(data.genres);
  }

  useEffect(() => {
    getGenreList()
  }, [])


  const handleSelect=(e)=>{
    console.log("dropdown value", e)
    setCurrentGenre(e)
  }
    return (
     <div>
            <Navbar bg="dark" variant="dark">
                <Navbar.Brand href="#home">Movie</Navbar.Brand>
                <Nav className="mr-auto">
                    <Nav.Link href="#home">Home</Nav.Link>
                    <Nav.Link href="#features">Movies</Nav.Link>
                    <Nav.Link href="#pricing">More Info</Nav.Link>
                </Nav>
                <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                {genreList && genreList.map(genre => <NavDropdown.Item onSelect={handleSelect} eventKey={genre.id} key={genre.id} href="#action/3.1">{genre.name}</NavDropdown.Item>)}
              {/* <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item> */}
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
