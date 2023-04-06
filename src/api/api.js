import axios from 'axios';

const token = 'ZAWVQE8-8NYM6MJ-PA7NDNP-ZFJJAE0';

const api = axios.create({
  baseURL: 'https://api.kinopoisk.dev',
});

api.defaults.headers['X-API-KEY'] = token;

export default api;

// 'X-API-KEY': 'NZQHSRG-3PT4TS1-HF8JZB2-0DZM37P',
// 'X-API-KEY': 'ZAWVQE8-8NYM6MJ-PA7NDNP-ZFJJAE0',
// 'X-API-KEY': 'M1QA7FC-T3DMF44-MWY7CS2-AXHC16N',
