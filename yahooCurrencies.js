/**
 * Cytonn Technologies
 * @author Ndirangu Wilson <wndirangu@Cytonn.com>
 */


// get  all the currencies and their current status
var http = require("http");
    url = "http://finance.yahoo.com/webservice/v1/symbols/allcurrencies/quote?format=json";

// get is a simple wrapper for request()
// which sets the http method to GET
var request = http.get(url, function (response) {
    // data is streamed in chunks from the server
    // so we have to handle the "data" event
    var buffer = "",
        data,
        Quotes;

    response.on("data", function (chunk) {
        buffer += chunk;
    });

    response.on("end", function (err) {
        // finished transferring data dump the raw data

        data = JSON.parse(buffer);
        Quotes = data.list.resources;
        for (i=0; i<data.list.resources.length; i++ ){
    console.log((Quotes[i].resource.fields.symbol));
}
    });
});
