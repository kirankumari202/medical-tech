# output
![Screenshot 2023-08-16 193458](https://github.com/kirankumari202/medical-tech/assets/108936589/121edce4-89cb-4247-87a5-47f53ae491a9)

# Accessing the Numbers API
You can access the /numbers endpoint by sending a GET request to the  URL
# Defining the /numbers Endpoint
The /numbers endpoint is defined as an asynchronous route handler. It expects the url query parameter to be an array of URLs from which numbers will be fetched.

app.get('/numbers', async (req, res) => {
  // ...
});

# Fetching Data from URLs
const urls = req.query.url;
const validUrls = urls.filter(url => validUrl.isUri(url));

Requests to each URL are made concurrently using the axios library, with a timeout of 500 milliseconds.

const requests = validUrls.map(async url => {
  try {
    const response = await axios.get(url, { timeout: 500 });
    return response.data.numbers;
  } catch (error) {
    console.log(error);
    return [];
  }
});

# Handling Responses and Aggregating Numbers

try {
  const responses = await Promise.all(requests);
  const numbers = Array.from(new Set(responses.flat())).sort((a, b) => a - b);
  res.json({ numbers: numbers });
} catch (error) {
  console.log(error);
  res.status(500).json({ error: 'An error occurred' });
}


