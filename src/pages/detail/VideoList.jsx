import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router';
import tmdbApi from '../../api/tmdbApi';

const VideoList = (props) => {
    const { category } = useParams();
    const [videos, setVideos] = useState([]);

    useEffect(() => {
        const getVideos = async () => {
            const res = await tmdbApi.getVideos(category, props.id);
            setVideos(res.results.slice(0, 5));
        };
        getVideos();
    }, [category, props.id]);

    return (
        <>
            {videos.map((item, i) => (
                <Video key={i} item={item} category={category} />
            ))}
        </>
    );
};

const Video = (props) => {
    const { item, category } = props;
    const iframeRef = useRef(null);

    useEffect(() => {
        const height = iframeRef.current.offsetWidth * 9 / 16 + 'px';
        iframeRef.current.setAttribute('height', height);
    }, []);

    const generateEmbedUrl = () => {
        if (category === 'movie') {
            return `https://vidsrc.xyz/embed/movie?tmdb=${item.id}`;
        } else if (category === 'tv') {
            return `https://vidsrc.xyz/embed/tv?tmdb=${item.id}`;
        }
        return '';
    };

    return (
        <div className="video">
            <div className="video__title">
                <h2>{item.name}</h2>
            </div>
            <iframe
                src={generateEmbedUrl()}
                ref={iframeRef}
                width="100%"
                title="video"
            ></iframe>
        </div>
    );
};

export default VideoList;
