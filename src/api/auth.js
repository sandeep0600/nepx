import apiConfig from './apiConfig';
import axios from 'axios';

async function getAuthToken(username, password) {
    try {
        const response = await axios.post(`${apiConfig.baseUrl}/user/auth-token`, {
            username: username,
            password: password
        }, {
            headers: {
                'Content-Type': 'application/json'
            }
        });

        return response.data;
    } catch (error) {
        console.error('Error:', error.response ? error.response.data : error.message);
        throw error;
    }
}

// Usage Example
getAuthToken('hriks', 'gt4043@1')
    .then(data => console.log('Auth Token:', data))
    .catch(error => console.error('Error:', error));

export { getAuthToken };

