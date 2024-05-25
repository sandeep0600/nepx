import React, { useState, useEffect } from 'react';
import axios from 'axios';
import apiConfig from '../../api/apiConfig'; // Adjust import path for apiConfig
import Button from '../../Button/Button'; // Adjust import path for Button component
import './MovieDetail.scss'; // Import SCSS styles

const MovieDetail = ({ movieId }) => {
    const [movie, setMovie] = useState(null);

    useEffect(() => {
        const fetchMovieDetails = async () => {
            try {
                const response = await axios.get(`${apiConfig.baseUrl}/movie/${movieId}?api_key=${apiConfig.apiKey}`);
                setMovie(response.data);
            } catch (error) {
                console.error("Error fetching movie details:", error);
            }
        };

        fetchMovieDetails();
    }, [movieId]);

    if (!movie) {
        return <div>Loading...</div>;
    }

    const streamingUrl = `https://mov-rho.vercel.app/streams/${movie.id}`;

    const handleWatchNowClick = () => {
        window.location.href = streamingUrl;
    };

    return (
        <div className="movie-detail">
            <h1>{movie.title}</h1>
            <p>{movie.overview}</p>
            <Button className="watch-now-btn" onClick={handleWatchNowClick}>
                Watch Now
            </Button>
        </div>
    );
};

export default MovieDetail;
