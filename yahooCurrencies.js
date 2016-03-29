/**
 * Cytonn Technologies
 * @author Ndirangu Wilson <wndirangu@Cytonn.com>
 */



var http = require('http'),
  fs = require('fs'),
  url = require('url');
//variable for holding data that is to be printed on the webpage
var dat;

http.createServer(function(request, response) {

  var path = require('url').parse(request.url).pathname;
  if (path == "/getstring") {
    console.log("request recieved");
    url = "http://finance.yahoo.com/webservice/v1/symbols/allcurrencies/quote?format=json";


    // get is a simple wrapper for request()
    // which sets the http method to GET

    request = http.get(url, function(response) {
      // data is streamed in chunks from the server
      // so we have to handle the "data" event
      var buffer = "",
        data,
        Quotes;

      response.on("data", function(chunk) {
        buffer += chunk;

      });

      response.on("end", function(err) {
        // finished transferring data dump the raw data

        data = JSON.parse(buffer);
        Quotes = data.list.resources;
        //data.list.resources.length
        dat = JSON.stringify(data);



        console.log((Quotes[0].resource.fields));




      });
    });
    response.writeHead(200, {
      "Content-Type": "text/plain"
    });
    response.end(dat);
    console.log("Data logged");
  } else {
    fs.readFile('Index.html', function(err, file) {
      if (err) {
        // write an error response or nothing here
        return;
      }
      response.writeHead(200, {
        'Content-Type': 'text/html',

      });
      response.end(file, "utf-8");
    });
  }
}).listen(8001);
console.log("server initialized");
