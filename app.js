
var express = require('express');
var app = express();
var cors = require('cors');
var server = require('http').createServer(app);
var io = require('socket.io')(server,{log:false, origins:'*:*'});

// var whitelist = ['http://very.ink/#/', 'http://very.ink', 'very.ink', 'localhost:8000'];

// var corsOptions = {
//     origin: function (origin, callback) {
//         var originIsWhitelisted = whitelist.indexOf(origin) !== -1;
//         callback(null, originIsWhitelisted);
//     }
// };
// app.use(cors());
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Headers", "Content-Type");
    res.header("Access-Control-Allow-Methods", "PUT, GET, POST, DELETE, OPTIONS");
    next();
});
io.set('origins', 'http://v10589.danskenet.net:8100,http://localhost:8100/');

io.sockets.on('connection', function (socket) {
    console.log('socket connected');

    socket.on('disconnect', function () {
        console.log('socket disconnected');
    });
    socket.on('message', function (data) {
        console.log('data recieved ' + data.message);
        io.in(data.room).emit('new message', data);
    });
    socket.on('join', function (data) {
        //joining
        socket.join(data.room);

        console.log('joined the room : ' + data.room);

        //socket.broadcast.to(data.room).emit('new user joined', {user:data.user, message:'has joined this room.'});
    });
   // socket.emit('text', 'wow. such event. very real time.');
});

server.listen(3000);




// var express = require('express');
// var app = express();
// var cors = require('cors');
// var bodyParser = require('body-parser');
// var morgan = require('morgan');
// var port = process.env.PORT || 8080;

// // Attaching socket.io
// var server = require('http').createServer(app);
// var io = require('socket.io')(server);
// app.set('socketio', io);
// app.set('server', server);
// var whitelist = ['http://very.ink/#/', 'http://very.ink', 'very.ink', 'localhost:8000'];
// var corsOptions = {
//     origin: function (origin, callback) {
//         var originIsWhitelisted = whitelist.indexOf(origin) !== -1;
//         callback(null, originIsWhitelisted);
//     }
// };

// app.use(cors(corsOptions));
// // configure body parser
// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(bodyParser.json());

// app.get('server').listen(port);


// var server = http.createServer(app);

// var io = require('socket.io').listen(server);

// io.on('connection',(socket)=>{

//     console.log('new connection made.');


//     socket.on('join', function(data){
//       //joining
//       socket.join(data.room);

//       console.log(data.user + 'joined the room : ' + data.room);

//       socket.broadcast.to(data.room).emit('new user joined', {user:data.user, message:'has joined this room.'});
//     });


//     socket.on('leave', function(data){

//       console.log(data.user + 'left the room : ' + data.room);

//       socket.broadcast.to(data.room).emit('left room', {user:data.user, message:'has left this room.'});

//       socket.leave(data.room);
//     });

//     socket.on('message',function(data){

//       io.in(data.room).emit('new message', {user:data.user, message:data.message});
//     })
// });

// /**
//  * Listen on provided port, on all network interfaces.
//  */

// server.listen(port);
// server.on('error', onError);
// server.on('listening', onListening);

// /**
//  * Normalize a port into a number, string, or false.
//  */

// function normalizePort(val) {
//   var port = parseInt(val, 10);

//   if (isNaN(port)) {
//     // named pipe
//     return val;
//   }

//   if (port >= 0) {
//     // port number
//     return port;
//   }

//   return false;
// }

// /**
//  * Event listener for HTTP server "error" event.
//  */

// function onError(error) {
//   if (error.syscall !== 'listen') {
//     throw error;
//   }

//   var bind = typeof port === 'string'
//     ? 'Pipe ' + port
//     : 'Port ' + port;

//   // handle specific listen errors with friendly messages
//   switch (error.code) {
//     case 'EACCES':
//       console.error(bind + ' requires elevated privileges');
//       process.exit(1);
//       break;
//     case 'EADDRINUSE':
//       console.error(bind + ' is already in use');
//       process.exit(1);
//       break;
//     default:
//       throw error;
//   }
// }

// /**
//  * Event listener for HTTP server "listening" event.
//  */

// function onListening() {
//   var addr = server.address();
//   var bind = typeof addr === 'string'
//     ? 'pipe ' + addr
//     : 'port ' + addr.port;
//   debug('Listening on ' + bind);
// }