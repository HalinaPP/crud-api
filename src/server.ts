import http from 'http';
import { PORT } from './constants';
import router from './router';

const server = http.createServer((req, res) => {
  console.log('Server started');
  router(req, res);
});

server.listen(PORT);
