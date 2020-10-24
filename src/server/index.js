const dotenv = require("dotenv");
dotenv.config();

var path = require("path");
const express = require("express");
const mockAPIResponse = require("./mockAPI.js");
const cors = require("cors");
const bodyParser = require("body-parser");
const { text } = require("body-parser");

let appKey = process.env.API_KEY;
let textMsg = "I love programming";
var options = {
  method: "POST",
  hostname: "api.meaningcloud.com",
  path:
    "/sentiment-2.1?key=" +
    appKey +
    "&lang=en&txt=" +
    textMsg +
    " &model=general",
  headers: {},
  maxRedirects: 20,
};

const app = express();
// Cors for cross origin allowance
app.use(cors());

//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.static("dist"));

console.log(__dirname);

/* const getTextAnalysis = async () => {
  console.log(options.hostname + options.path);
  const res = await fetch(options.hostname + options.path);
  try {
    const data = await res.json();
    console.log(data);
    return data;
  } catch (error) {
    console.log("error", error);
  }
}; */

//const getTextAnalysis = async () => 
async function getTextAnalysis(req, res) 
{
  console.log("Inside of getTextAnalysis");
  const back = await fetch("http://api.meaningcloud.com/sentiment-2.1?key=a659f0e5e928bdc70da5a045bdbdd3b4&lang=en&txt=I%20love%20programming%20&model=general");

  try {
    const info = await back.json();
    console.log("info = " + info);
    //return info;
  } catch (error) {
    console.log("error getting info");
    //return "error getting info";
  }
  res.json(info);
};

app.get("/", function (req, res) {
  // res.sendFile('dist/index.html')
  res.sendFile(path.resolve("src/client/views/index.html"));
});

// designates what port the app will listen to for incoming requests
app.listen(8081, function () {
  console.log("Example app listening on port 8081!");
});

let jTest = {
  title: "test json response",
  message: "this is a message",
  time: "now",
};

/* app.get("/test", function (req, res) {
  console.log("Inside Test");
  //res.send(getTextAnalysis());
  res.json(jTest);
}); */

app.post("/test", getTextAnalysis);

async function test(req, res) {
  console.log("Inside Test ");
  textMsg = req.body.message;
  console.log("body = " + textMsg);
  try {
    const info = await getTextAnalysis();
  } catch (error) {
    console.log("error inside test");
  }
  res.json(jTest);
}
