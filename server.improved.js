const http = require("http"),
  fs = require("fs"),
  // IMPORTANT: you must run `npm install` in the directory for this assignment
  // to install the mime library if you're testing this on your local machine.
  // However, Glitch will install it automatically by looking in your package.json
  // file.
  mime = require("mime"),
  dir = "public/",
  port = 3000;

let appdata = [];

const server = http.createServer(function (request, response) {
  if (request.method === "GET") {
    handleGet(request, response);
  } else if (request.method === "POST") {
    handlePost(request, response);
  }
});

/*const handleDelete = function (request, response) {
  let data1;
  request.on("data", function (data) {
    data1 += data;
  });
  const data2= JSON.parse(data1);
  const dataDel=data2.number;
  if(request.url==="/delete"){
  if(dataDel>=0){
  appdata.splice(dataDel,1);
  response.writeHead(200, "OK", { "Content-Type": "text/plain" });
  response.end(JSON.stringify({sucess: "Deletion completed"}));
  }
  else{
  response.writeHead(400, "Bad Request", { "Content-Type": "text/plain" });
  response.end(JSON.stringify({ error: "Deletion has failed" }));
  }
  }
};*/

const handleGet = function (request, response) {
  const filename = dir + request.url.slice(1);

  if (request.url === "/") {
    sendFile(response, "public/index.html");
  }
  if (request.url === "/display") {
    response.writeHead(200, "OK", { "Content-Type": "text/plain" });
    response.end(JSON.stringify(appdata));
  } else {
    sendFile(response, filename);
  }
};


const handlePost = function (request, response) {
  let dataString = "";

  request.on("data", function (data) {
    dataString += data;
  });

  request.on("end", function () {
    if (request.url === '/submit') {
      appdata.push(JSON.parse(dataString));
      response.writeHead(200, "OK", { "Content-Type": "text/plain" });
      response.end(JSON.stringify(appdata));
    } else if (request.url === '/delete'){
      let dataDel = JSON.parse(dataString)
      if(dataDel.number >= 0){
        appdata.splice(dataDel.number,1);
       response.writeHead(200, "OK", { "Content-Type": "text/plain" });
      response.end(JSON.stringify({sucess: "Deletion completed"}));
      }
     
    }
  });
};

const sendFile = function (response, filename) {
  const type = mime.getType(filename);

  fs.readFile(filename, function (err, content) {
    // if the error = null, then we've loaded the file successfully

    if (err === null) {
      // status code: https://httpstatuses.com
      response.writeHeader(200, { "Content-Type": type });
      response.end(content);
    } else {
      // file not found, error code 404
      response.writeHeader(404);
      response.end("404 Error: File Not Found");
    }
  });
};

server.listen(process.env.PORT || port);
