import React, { useEffect, useState } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "./components/Navbar";
import MovieBoard from "./components/MovieBoard";
import CoverSection from "./components/Header";
import Pagination from "react-js-pagination";
import FilterBoard from "./components/FilterBoard";
import "react-input-range/lib/css/index.css";

const apikey = process.env.REACT_APP_APIKEY;

function App() {
  const [movieList, setMovieList] = useState(null);
  const [originalList, setOriginalList] = useState(null);
  const [imageListTemp, setImageList] = useState([1]);
  const [activePage, setActivePage] = useState(1);
  let [year, setYear] = useState({ min: 1980, max: 2020 });
  let [rating, setRating] = useState({ min: 0, max: 10 });
  let [totalResult, setTotalResults] = useState(0);
  const [genreList, setGenreList] = useState(null);

  const handlePageChange = (pageNum) => {
    callMovie(pageNum);
    setActivePage(pageNum);
  };

  const getGenreList = async () => {
    let url = `https://api.themoviedb.org/3/genre/movie/list?api_key=${apikey}&language=en-US`;
    let result = await fetch(url);
    let data = await result.json();
    setGenreList(data.genres);
    console.log("genre", data.genres);
    callMovie();
  };

  const handleSelect = async (e) => {
    console.log("dropdown value", e);
    let url = `https://api.themoviedb.org/3/discover/movie?api_key=${apikey}&language=en-US&with_genres=${e}`;
    console.log(url);
    let result = await fetch(url);
    let data = await result.json();
    console.log("dropdown value", data.results);
    setMovieList(data.results);
  };

  const callMovie = async (page) => {
    let url = `https://api.themoviedb.org/3/movie/popular?api_key=${apikey}&language=en-US&page=${page}`;
    let result = await fetch(url);
    let data = await result.json();
    console.log("data", data);
    setOriginalList(data.results);
    setMovieList(data.results);
    setTotalResults(data.total_results);
  };

  useEffect(() => {
    getGenreList();
    // eslint-disable-next-line
  }, []);

  // Get cover img slide

  const getImage = (img) => {
    console.log("App.getImage.img:", img);
    imageListTemp.push(img);
    setImageList(imageListTemp);
    // console.log('imageList:',imageList)
  };

  if (movieList === null) {
    return (
      <h2>
        Loading... <img src="./favicon.gif" alt="loading" width="1700px"></img>{" "}
      </h2>
    );
  }

  const filterByYear = (value) => {
    let filteredList = originalList.filter((movie) => {
      let year = parseInt(movie.release_date.split("-")[0]);
      return year > value.min && year < value.max;
    });
    setYear(value);
    setMovieList(filteredList);
  };

  const filterByRate = (value) => {
    let filteredList = originalList.filter((movie) => {
      let rating = parseInt(movie.vote.average.split("-")[0]);
      return rating > value.min && rating < value.max;
    });
    setRating(value);
    setMovieList(filteredList);
  };

  const sortByRate = (direction) => {
    let sortedList;
    if (direction === "asc") {
      sortedList = movieList.sort((a, b) => a.vote_average - b.vote_average);
    } else {
      sortedList = movieList.sort((a, b) => b.vote_average - a.vote_average);
    }
    console.log("Sort", sortedList);
    setMovieList([...sortedList]);
  };

  const sortByPopular = (direction) => {
    let sortedList;
    if (direction === "asc") {
      sortedList = movieList.sort((a, b) => a.popularity - b.popularity);
    } else {
      sortedList = movieList.sort((a, b) => b.popularity - a.popularity);
    }
    console.log("Sort", sortedList);
    setMovieList([...sortedList]);
  };

  const searchByTopRated = async () => {
    let url = `https://api.themoviedb.org/3/movie/top_rated?api_key=${apikey}&language=en-US`;
    let result = await fetch(url);
    let data = await result.json();
    setMovieList(data.results);
    setOriginalList(data.results);
    setTotalResults(data.total_results);
  };

  return (
    <>
      <div>
        <Navbar
          originalList={originalList}
          setMovieList={setMovieList}
          handleSelect={handleSelect}
          searchByTopRated={searchByTopRated}
          genreList={genreList}
        />
        <CoverSection />
      </div>
      <div className="d-flex movieboardAndPagination">
        <MovieBoard getImage={getImage} movieList={movieList} />

        <div className=" paginationAndFilter  text-center">
          <Pagination
            style={{ margin: "40px" }}
            activePage={activePage}
            itemsCountPerPage={20}
            totalItemsCount={totalResult}
            pageRangeDisplayed={5}
            onChange={(pageNum) => handlePageChange(pageNum)}
            itemClass="page-item"
            linkClass="page-link"
          />

          <FilterBoard
            filteByRate={filterByRate}
            rating={rating}
            filterByYear={filterByYear}
            year={year}
            sortByPopular={sortByPopular}
            sortByRate={sortByRate}
          />
        </div>
      </div>
    </>
  );
}

export default App;
