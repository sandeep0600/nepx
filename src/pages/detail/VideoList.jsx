import React, { useState, useEffect, useRef } from 'react';
import tmdbApi from '../../api/tmdbApi';

const VideoList = () => {
    const [videos, setVideos] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch video details from the provided URL
                const response = await fetch('https://mov-rho.vercel.app/streams');
                const data = await response.json();
                const videoSources = data.sources || [];

                // Get the TMDB ID from tmdbApi
                const tmdbIds = await tmdbApi.getTMDBIds();

                // Combine the data
                const combinedVideos = videoSources.map((video, index) => ({
                    ...video,
                    tmdbId: tmdbIds[index] || null,
                }));

                setVideos(combinedVideos);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    return (
        <>
            {videos.map((video, index) => (
                <Video key={index} video={video} />
            ))}
        </>
    );
};

const Video = ({ video }) => {
    const { name, data, tmdbId } = video;
    const streamUrl = data.stream;

    const iframeRef = useRef(null);

    useEffect(() => {
        const setIframeHeight = () => {
            if (iframeRef.current) {
                const height = iframeRef.current.offsetWidth * 9 / 16 + 'px';
                iframeRef.current.setAttribute('height', height);
            }
        };
        setIframeHeight();
        window.addEventListener('resize', setIframeHeight);
        return () => {
            window.removeEventListener('resize', setIframeHeight);
        };
    }, []);

    return (
        <div className="video">
            <div className="video__title">
                <h2>{name}</h2>
                <p>TMDB ID: {tmdbId}</p>
            </div>
            <iframe
                src={streamUrl}
                ref={iframeRef}
                width="100%"
                title="video"
            ></iframe>
            {/* Render subtitles if available */}
            {data.subtitle && data.subtitle.length > 0 && (
                <ul className="subtitles">
                    {data.subtitle.map((subtitle, index) => (
                        <li key={index}>
                            <a href={subtitle.file} target="_blank" rel="noreferrer">{subtitle.lang}</a>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default VideoList;

