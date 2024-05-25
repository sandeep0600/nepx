import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router';
import tmdbApi from '../../api/tmdbApi';

const VideoList = props => {
    const { category } = useParams();
    const [videos, setVideos] = useState([]);

    useEffect(() => {
        const getVideos = async () => {
            try {
                const res = await tmdbApi.getVideos(category, props.id);
                const parsedData = parseVideoData(res);
                setVideos(parsedData);
            } catch (error) {
                console.error('Error fetching videos:', error);
            }
        };
        getVideos();
    }, [category, props.id]);

    const parseVideoData = responseData => {
        // Check if responseData exists and has sources
        if (responseData && responseData.sources && responseData.sources.length > 0) {
            // Extract relevant data from sources array
            return responseData.sources.map(source => {
                return {
                    name: source.name,
                    streamUrl: source.data.stream,
                    subtitles: source.data.subtitle,
                };
            });
        } else {
            return [];
        }
    };

    return (
        <>
            {videos.map((video, index) => (
                <Video key={index} video={video} />
            ))}
        </>
    );
};

const Video = ({ video }) => {
    const { name, streamUrl, subtitles } = video;
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
            </div>
            <iframe
                src={streamUrl}
                ref={iframeRef}
                width="100%"
                title="video"
            ></iframe>
            {/* Render subtitles if available */}
            {subtitles && subtitles.length > 0 && (
                <ul className="subtitles">
                    {subtitles.map((subtitle, index) => (
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
