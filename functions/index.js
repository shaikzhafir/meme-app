const functions = require('firebase-functions');
const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');
var FormData = require('form-data');
const bodyParser = require('body-parser');





const app = express();

app.use(cors({origin:true}));
app.use(express.json()) // for parsing application/json


app.get('/getMemes',async (request,response) => {
    const apiResponse = await fetch("https://api.imgflip.com/get_memes");
    console.log(apiResponse);
    const data = await apiResponse.json();
    const allMemes = data.data.memes;
    response.send({
        status : 'success',
        body : allMemes
    })
})


app.post('/captionMeme',async (request,response) => {
    const data = request.body
    console.log(data);
    let memeID = data.memeID;
    const formData = new FormData();
    formData.append("template_id", memeID);
    formData.append("username", "bobross96");
    formData.append("password", "Mememachine1996");
    response.send({
        status : 'success'
    })
})




exports.app = functions.https.onRequest(app);


