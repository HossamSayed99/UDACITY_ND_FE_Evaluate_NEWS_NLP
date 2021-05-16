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

// Handing post requests from the client

app.post('/data', async (req, res) =>{
    let url = req.body.url;
    console.log(url);
    console.log(process.env.BASE_API_URL+process.env.API_KEY+'&url='+url+'&lang=en');
    const response = await fetch(process.env.BASE_API_URL+process.env.API_KEY+'&url='+url+'&lang=en'); // Fetching data from api
    try{
        const data = await response.json();
        console.log('finished');
        if(data.status.code == 0){ // If the analsyis is successful, return data
            const requiredData = {
                text: data.sentence_list[0].text,
                agreement: data.agreement,
                subjectivity: data.subjectivity,
                confidence: data.confidence,
                irony: data.irony,
                score_tag: data.score_tag
            }
            res.send(requiredData);
        }
        else{
            res.send({ // else, notify user
                text: 'Not available, Please try another link',
                agreement: 'Not available',
                subjectivity: 'Not available',
                confidence: 'Not available',
                irony: 'Not available',
                score_tag: 'Not available'
            });
        }
    }catch(err){
        console.log(err);
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
