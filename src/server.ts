import http from 'http';
import { PORT } from './constants';
import { sendResponse } from './helpers';
import router from './router';
import { statusCodes, Messages } from './status_constants';

export const app = http.createServer((req, res) => {
  try {
    console.log('Server started');
    router(req, res);
  } catch (error) {
    sendResponse(statusCodes.INTERNAL_SERVER_ERROR, Messages.INTERNAL_SERVER_ERROR, res);
  }
});

process.on('uncaughtException', (error: Error) => {
  console.error(error.stack);
  process.exit(1);
});

app.listen(PORT);
