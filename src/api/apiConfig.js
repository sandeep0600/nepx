const apiConfig = {
    baseUrl: 'https://your-cloudflare-worker-url',
    originalImage: (imgPath) => `https://image.tmdb.org/t/p/original/${imgPath}`,
    w500Image: (imgPath) => `https://image.tmdb.org/t/p/w500/${imgPath}`
};

export default apiConfig;
