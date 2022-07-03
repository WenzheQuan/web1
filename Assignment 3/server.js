// create an express app
const express = require("express")
const app = express()

const path = require("path")
const fs = require('fs')
const bodyParser = require('body-parser')
let jdata = JSON.parse(fs.readFileSync('public/git.json'));
//jdata.data.push("Hello World"); // to see change

// use the express-static middleware

app.use(bodyParser.json())
app.use(express.static("public"))

// define the first route
app.get("/hello", function (req, res) {
    res.send("<h1>Hello World!</h1>")
})

app.post("/mod",(req,res)=> {
    console.log(">>post ...",req.body,req.header);
    const updateimp = (key,importance)=>{
    jdata.data[key].importance=importance;
     }
    const updatedes = (key,description)=>{
    jdata.data[key].description = description;
     }
    let order = "order" in req.body? req.body.order: 0;
    console.log(jdata.data[order]);
    //let description = "datadescription" in req.body? req.body.datadescription: "git information";
    let importance = "dataimportance" in req.body? req.body.dataimportance: -1;
    if(importance!= -1){
        updateimp(order,importance);
    }
    if("datadescription" in req.body){
        updatedes(order,req.body.datadescription);
    }

    res.json(jdata)
})

app.get('/info', (req,res)=> {
    res.json(jdata)
})
// start the server listening for requests
let listener = app.listen(process.env.PORT || 3000, 
	() => console.log(`Server is running...${listener.address().port}`));
