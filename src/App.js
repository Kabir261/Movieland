import { useEffect, useState } from "react";

import "./App.css";
import Searchicon from "./search.svg";

import MovieCard from "./MovieCard";

const API_URL = "https://imdb-api.com/en/API/SearchMovie/k_4n3a3p09/";

const App = () => {

    const [movies, setMovies] = useState([]);

    const [searchTerm, setSearchTerm] = useState(' ');

    const searchMovies = async (title) => {
        const response = await fetch(`${API_URL}&s= ${title} `);

        const data = await response.json();

        setMovies(data.results);
    };

    useEffect(() => {
        searchMovies("Superman");
    }, []);

    return (
        <div className="app">
            <h1>Movieland</h1>

            <div className="search">
                <input
                    type="text"
                    placeholder="Search for movies"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <img src={Searchicon} alt="Search" onClick={() => searchMovies(searchTerm)} />
            </div>

            {
                movies?.length > 0
                    ? (
                        <div className="container">
                            {
                                movies.map((movie) => (
                                    <MovieCard movie={movie} />
                                ))
                            }
                        </div>
                    ) : (
                        <div className="empty">
                            <h2>No movies found</h2>
                        </div>
                    )
            }


        </div>
    );
};

export default App;
