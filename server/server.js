let http = require("http");
let url = require('url');
let fs = require('fs');
let io = require('socket.io');

let server = http.createServer(function(request, response){
  let path = url.parse(request.url).pathname;

  switch(path){
    case '/':
      fs.readFile(__dirname + path, function(error, data){
        if (error){
          response.writeHead(404);
          response.write("Error - 404");
          response.end();
        }
        else{
          response.writeHead(200, {"Content-Type": "text/html"});
          response.write(data, "utf8");
          response.end();
        }
      });
      break;
    default:
      response.writeHead(404);
      response.write("Page not found - 404");
      response.end();
      break;
  }
});

generateNumber = () => {
  return Math.floor(Math.random()*899999999 + 100000000);
};

generateRating = () => {
  return Math.floor((Math.random()*4) + 1);
};

server.listen(8001);

io.listen(server);

let listener = io.listen(server);

listener.sockets.on('connection', (socket)=>{
  let index = 1;
  setInterval(()=> {
    let newOrder = {order_id: index, driver_phone: generateNumber(), pass_phone: generateNumber(), rating: generateRating()};
    index = index + 1;
    socket.emit('order', newOrder);
  }, 10000);
});
