import React, { useEffect, useState } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from './components/Navbar'
import MovieBoard from './components/MovieBoard'
import CoverSection from './components/Header'
import Pagination from "react-js-pagination";


const apikey = process.env.REACT_APP_APIKEY


function App() {
  const [movieList, setMovieList] = useState(null)
  const [originalList, setOriginalList] = useState(null)
  const [imageListTemp, setImageList] = useState([1])
  const [activePage, setActivePage] = useState(1);
  // const [popularMovies, setPopularMovies] = useState([])

  const handlePageChange = (pageNum) => {
    callMovie(pageNum);
    setActivePage(pageNum);
  };

 
  
  const callMovie = async (page) => {
    let url = `https://api.themoviedb.org/3/movie/popular?api_key=${apikey}&language=en-US&page=${page}`;
    let result = await fetch(url)
    let data = await result.json()
  
    // console.log("data", data)
    setOriginalList(data.results)
    setMovieList(data.results)
  }


  useEffect(() => {
    callMovie(activePage)

  }, []);


 

  // Get cover img slide 

  const getImage = (img) => {
    console.log('App.getImage.img:',img)
    imageListTemp.push(img)
    setImageList(imageListTemp)
    // console.log('imageList:',imageList)

  }



  if (movieList === null) {
    return <h2>loading ...</h2>
  }


  return (

    <div>
      
      <Navbar originalList={originalList} setMovieList={setMovieList}/>   
      <CoverSection />
      <Pagination
        activePage={activePage}
        itemsCountPerPage={20}
        totalItemsCount={450}
        pageRangeDisplayed={5}
        onChange={(pageNum) => handlePageChange(pageNum)}
        itemClass="page-item"
        linkClass="page-link"
      />
      <MovieBoard getImage={getImage} movieList={movieList} />
    </div>

  )


}

export default App;
