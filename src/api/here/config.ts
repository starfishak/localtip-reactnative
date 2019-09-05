import axios from 'axios';
import Cred from './cred';

const here_service = axios.create({
    browse_url : 'https://places.cit.api.here.com/places/v1/browse',
    lookup_url : 'https://places.cit.api.here.com/places/v1/places/lookup',
    apiCode : Cred.apiCode,
    apiKey : Cred.apiKey,
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json'
    }
});

// singleton instance
export default here_service;