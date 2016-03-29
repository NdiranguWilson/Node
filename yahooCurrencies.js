/**
 * Cytonn Technologies
 * @author Ndirangu Wilson <wndirangu@Cytonn.com>
 */


// get  all the currencies and their current status
var http = require("http");
var fs = require("fs");


fs.readFile('Index.html', function(err, html) {
  if (err) {
    throw err;
  }
  http.createServer(function(request, res) {
    res.writeHeader(200, {
      "Content-Type": "text/html"
    });
    res.write(html);


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


        for (i = 0; i < 10; i++) {

          console.log((Quotes[i].resource.fields));

        }

      });
    });

    res.end();
  }).listen(3000); // Activates this server, listening on port 8080.

});
