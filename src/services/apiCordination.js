const axios = require('axios').default;

const api = axios.create({
	baseURL: 'https://api.codenation.dev/v1/challenge/dev-ps',
});

module.exports = api;
