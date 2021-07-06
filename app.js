const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https= require("https");

const app=express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req,res){
  res.sendFile(__dirname+"/signup.html");
});

app.post("/",function(req,res){
  const username=req.body.usernames;
  const name=req.body.names;
  const email=req.body.emails;

  const data={
    members:[
      {
        // email_address: email,
        // status: "subscribed",
        // marge_fields:{
        //   FNAME:username,
        //   LNAME:name
        // }
        email_address: email,
    status: "subscribed",
    merge_fields: {
      FNAME: username,
      LNAME: name
    }
      }
    ]
  };

  const jsonData= JSON.stringify(data);

  const url="https://us1.api.mailchimp.com/3.0/lists/cc5e710b0b";

  const options ={
    method:"post",
    auth:"sammy:c709faa33ff9c1d3ea8a8364c80b74d7-us1"
  }

  const request=https.request(url, options ,function(response){

    if(response.statusCode==200){
      res.sendFile(__dirname+"/success.html");
    }else{
      res.sendFile(__dirname+"/failure.html");
    }
    response.on("data",function(data){
      console.log(JSON.parse(data));
    });
  });

  request.write(jsonData);
  request.end();

});

app.listen(process.env.PORT,function(){
  console.log("server is running on port 3000");
})


// 3024f84bd7da3dea32b9f4adecc694b2-us1

// cc5e710b0b
