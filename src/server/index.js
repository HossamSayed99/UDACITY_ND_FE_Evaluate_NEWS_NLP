// TODO: Configure the environment variables
var path = require('path')
const express = require('express')
const mockAPIResponse = require('./mockAPI.js')
const fetch = require('node-fetch');

const PORT = 8081

// Configuration to be able to use env variables
require('dotenv').config()
// Create an instance for the server
const app = express()

/* Middleware*/
app.use(express.json());
app.use(express.urlencoded({
  extended: false
}));

const cors = require('cors');

// Configure cors to avoid cors-origin issue
app.use(cors());

// Configure express static directory.
app.use(express.static('dist'))


app.get('/', function (req, res) {
    res.sendFile(path.resolve('dist/index.html'))
})
// a route that handling post request for new URL that coming from the frontend
/* TODO:
    1. GET the url from the request body
    2. Build the URL it should be something like `${BASE_API_URL}?key=${MEAN_CLOUD_API_KEY}&url=${req.body.url}&lang=en`
    3. Fetch Data from API
    4. Send it to the client
    5. REMOVE THIS TODO AFTER DOING IT 😎😎
    server sends only specified data to the client with below codes
     const sample = {
       text: '',
       score_tag : '',
       agreement : '',
       subjectivity : '',
       confidence : '',
       irony : ''
     }
*/

app.post('/data', async (req, res) =>{
    let url = req.body.url;
    console.log(url);
    console.log(process.env.BASE_API_URL+process.env.API_KEY+'&url='+url+'&lang=en');
    const response = await fetch(process.env.BASE_API_URL+process.env.API_KEY+'&url='+url+'&lang=en');
    try{
        const data = await response.json();
        console.log('finished');
        res.send(data);
    }catch(err){
        console.log(error);
    }

});

app.get('/test', function (req, res) {
    res.send(mockAPIResponse)
})

// designates what port the app will listen to for incoming requests
app.listen(PORT, (error) => {
    if (error) throw new Error(error)
    console.log(`Server listening on port ${PORT}!`)
})

// TODO: export app to use it in the unit testing
