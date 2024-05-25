// components/StreamingOptions.jsx
import React, { useEffect, useState } from 'react';
import fetchStreamingData from '../api/tmdbApi'; // Assuming you have a function to fetch streaming data in tmdbApi.js
import '../scss/_variables.scss'; // Import your SCSS variables

const StreamingOptions = () => {
    const [sources, setSources] = useState([]);

    useEffect(() => {
        const fetchStreamingSources = async () => {
            const data = await fetchStreamingData(); // Fetch streaming data from your API
            setSources(data);
        };

        fetchStreamingSources();
    }, []);

    return (
        <div className="streaming-options">
            <h2>Streaming Options</h2>
            {sources.map((source, index) => (
                <div key={index} className="stream-source">
                    <h3>{source.name}</h3>
                    <ul>
                        {source.data.stream ? (
                            <li>
                                <a href={source.data.stream} target="_blank" rel="noopener noreferrer">
                                    Watch Now
                                </a>
                            </li>
                        ) : (
                            <li>No stream available</li>
                        )}
                        {source.data.subtitle.length > 0 && (
                            <li>
                                Subtitles:
                                <ul>
                                    {source.data.subtitle.map((subtitle, subIndex) => (
                                        <li key={subIndex}>
                                            <a href={subtitle.file} target="_blank" rel="noopener noreferrer">
                                                {subtitle.lang}
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            </li>
                        )}
                    </ul>
                </div>
            ))}
        </div>
    );
};

export default StreamingOptions;
