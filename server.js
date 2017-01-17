var http = require('http'),
    fs = require('fs'),
    url = require('url'),
    port = 8080;

/* Global variables */
var listingData, server;

var requestHandler = function(request, response) {
    var parsedUrl = url.parse(request.url);
    // console.log("in requestHandler================================");
    /*
     Your request handler should send listingData in the JSON format if a GET request
     is sent to the '/listings' path. Otherwise, it should send a 404 error.

     HINT: explore the request object and its properties
     http://stackoverflow.com/questions/17251553/nodejs-request-object-documentation
     */
    if( request.method == 'GET' && parsedUrl.pathname == '/listings'){ //request.method == 'GET' &&
        // console.log(listingData);
        response.writeHead(200, {"Content-Type": "application/json"});  // needs JSON
        response.write(listingData);
        // fs.createReadStream("./listings.json").pipe(response);

        response.end();
    }else //if (request.method == 'GET')
    {
        response.writeHead(404, {"Content-Type": "text/plain"});
        response.write('Bad gateway error');//"Bad gateway error.  Error 404: Page not found!"

    }
    response.end();
    // done();
};

fs.readFile('listings.json', 'utf8', function(err, data) {
    /*
     This callback function should save the data in the listingData variable,
     then start the server.
     */

    if(err){
        throw err;
        //return console.log(err);
    }
    listingData = data;

    http.createServer(requestHandler).listen(port);
    console.log('Server listening on: http://localhost:' + port);

});
