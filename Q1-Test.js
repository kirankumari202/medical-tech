const express = require('express');
const app = express();
const axios = require('axios');
const validUrl = require('valid-url');

app.get('/numbers', async (req, res) => {
	const urls = req.query.url;
	const requests = urls.map(async url => {
	    if (validUrl.isUri(url)) {
		try {
		    const response = await axios.get(url, { timeout: 500 });
		    return response.data.numbers;
		} catch (error) {
		    console.log(error);
		    return [];
		}
	    }
	});
    
	try {
	    const responses = await Promise.all(requests);
	    const numbers = Array.from(new Set(responses.flat())).sort((a, b) => a - b);
	    res.json({ numbers: numbers });
	} catch (error) {
	    console.log(error);
	    res.status(500).json({ error: 'An error occurred' });
	}
    });
    

app.listen(8008, () => {
    console.log('Server started on port 8008');
});
