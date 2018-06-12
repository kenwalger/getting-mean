const http = require('http');
const port = process.env.PORT || 3000;

const requestHandler = (request, response) => {
    console.log(request.url);
    response.end('Hello Node.js Server!');
};

const server = http.createServer(requestHandler);

server.listen(port, (err) => {
    if (err) {
        return console.log('Doh! Something went wrong: ', err);
    }

    console.log(`Node.js server is running on ${port}`);
});
