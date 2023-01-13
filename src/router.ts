import { API_URL_CHUNK, USERS_URL_CHUNK, statusCodes } from './constants';
import { IncomingMessage, ServerResponse } from 'http';
import userRouter from './users/users.router';

const router = (req: IncomingMessage, res: ServerResponse<IncomingMessage>) => {
  const { url } = req;
  const isUsersPath = url.startsWith(`${API_URL_CHUNK}${USERS_URL_CHUNK}`);

  if (isUsersPath) {
    userRouter(req, res);
  } else {
    console.log('error', req.url);
    res.writeHead(statusCodes.NOT_FOUND, { 'Content-Type': 'application/json' });
    res.write(JSON.stringify({ message: 'Error! This page does not exists' }));
    res.end();
  }
};

export default router;
