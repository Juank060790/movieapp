import React, { useState, useEffect } from 'react';
import { Carousel } from 'react-bootstrap'
import 'mdbreact/dist/css/mdb.css';
import { MDBMask, MDBView} from "mdbreact";

const apikey = process.env.REACT_APP_APIKEY


export default function CoverSection(props) {
  const [index, setIndex] = useState(0);
  const [popularMovies, setPopularMovies] = useState([])



  const callPopularMovies = async () => {
    let url = `https://api.themoviedb.org/3/trending/all/day?api_key=${apikey}`;
    let result = await fetch(url)
    let data = await result.json()
    console.log("data cover IMG", data.results)
    setPopularMovies(data.results)
  }

  useEffect(()=> {
    console.log('effeeeect')
    callPopularMovies()
  }, [])
  if (popularMovies.length === 0) {
    return (
      <div></div>
    )
  } else {
    let randomNumber = Math.floor(Math.random() * 15) + 1
    let firstSlide = randomNumber
    let secondSlide = randomNumber
    let thirdSlide = randomNumber
  
    let listImage = []
    listImage[0] = "https://image.tmdb.org/t/p/w1920_and_h800_face/" + popularMovies[firstSlide].backdrop_path
    listImage[1] = "https://image.tmdb.org/t/p/w1920_and_h800_face/" + popularMovies[secondSlide].backdrop_path
    listImage[2] = "https://image.tmdb.org/t/p/w1920_and_h800_face/" + popularMovies[thirdSlide].backdrop_path
  
  
    const handleSelect = (selectedIndex, e) => {
      setIndex(selectedIndex);
  
    };

    

  return (

    <div>
      <Carousel activeIndex={index} onSelect={handleSelect}>
        {/* first slide on the cover */}
          <Carousel.Item>
          <MDBView hover zoom>
            <img
              className="img-fluid d-block w-100 hover"
              src={listImage[0]}
              alt="First slide"
            />
            <MDBMask className="text-carousel" overlay="red-light">
              <Carousel.Caption className="info-title-movies">
                <h2 className="white-text">{popularMovies[firstSlide].title}</h2>
                <h1 className="white-text">{popularMovies[firstSlide].original_name}</h1>
                <p className="white-text">{popularMovies[firstSlide].overview}</p>
            
            </Carousel.Caption>
            </MDBMask>
            </MDBView>
           
          </Carousel.Item>
        {/* second slide cover */}
          <Carousel.Item>
          <MDBView hover zoom>
            <img
              className="img-fluid d-block w-100 hover"
              src={listImage[0]}
              alt="First slide"
            />
            <MDBMask overlay="red-slight">
              <Carousel.Caption className="info-title-movies">
                <h2 className="white-text">{popularMovies[secondSlide].title}</h2>
                <h1 className="white-text">{popularMovies[firstSlide].original_name}</h1>
                <p className="white-text">{popularMovies[secondSlide].overview}</p>
            
            </Carousel.Caption>
            </MDBMask>
            </MDBView>
           
          </Carousel.Item>
          {/* third slide cover */}
          <Carousel.Item>
          <MDBView hover zoom>
            <img
              className="img-fluid d-block w-100 hover"
              src={listImage[0]}
              alt="First slide"
            />
            <MDBMask overlay="red-slight">
              <Carousel.Caption className="info-title-movies">
                <h2 className="white-text">{popularMovies[thirdSlide].title}</h2>
                <h1 className="white-text">{popularMovies[firstSlide].original_name}</h1>
                <p className="white-text">{popularMovies[thirdSlide].overview}</p>
            </Carousel.Caption>
            </MDBMask>
            </MDBView>
           
          </Carousel.Item>
      </Carousel>
    </div>
  )
}
}
