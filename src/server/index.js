const dotenv = require("dotenv");
dotenv.config();

const fetch = require('node-fetch');

var path = require("path");
const express = require("express");
const mockAPIResponse = require("./mockAPI.js");
const cors = require("cors");
const bodyParser = require("body-parser");
const { text } = require("body-parser");



const app = express();
// Cors for cross origin allowance
app.use(cors());

//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.static("dist"));

console.log(__dirname);


let appKey = process.env.API_KEY;
let textMsg = "";



async function getTextAnalysis(req, res) 
{
  textMsg = req.body.message;
  var options = "https://api.meaningcloud.com/sentiment-2.1?key=" + appKey + "&lang=en&txt=" + textMsg + "&model=general";
  console.log("Inside of getTextAnalysis");
  console.log(options);


  const back = await fetch( options,{
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      credentials: "same-origin", // include, *same-origin, omit
      headers: {
      "Content-Type": "text/plain",
    },
    body: null, //JSON.stringify(options),
  
  });

  try {
    const info = await back.json();
    console.log("info  below= " );
    console.log(info);
    res.json(info);
    //return info;
  } catch (error) {
    console.log("error getting info");
    //return "error getting info";
  }
  //res.json(info);
}

app.get("/", function (req, res) {
  // res.sendFile('dist/index.html')
  res.sendFile(path.resolve("src/client/views/index.html"));
});

// designates what port the app will listen to for incoming requests
app.listen(8081, function () {
  console.log("Example app listening on port 8081!");
});


app.post("/getInfo", getTextAnalysis);


