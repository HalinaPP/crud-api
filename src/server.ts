import http from 'http';
import { PORT } from './constants';
import router from './router';

export const app = http.createServer((req, res) => {
  console.log('Server started');
  router(req, res);
});

app.on('clientError', (err, socket) => {
  socket.end('HTTP/1.1 400 Bad Request\r\n');
});

app.listen(PORT);
