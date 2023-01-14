import http from 'http';
import { PORT } from './constants';
import router from './router';

const server = http.createServer((req, res) => {
  console.log('Server started');
  router(req, res);
});

server.on('clientError', (err, socket) => {
  socket.end('HTTP/1.1 400 Bad Request\r\n');
});

server.listen(PORT);
