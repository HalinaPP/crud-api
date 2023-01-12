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
    res.writeHead(statusCodes.BAD_REQUEST, { 'Content-Type': 'application/json' });
    res.write(JSON.stringify({ message: 'Error' }));
    res.end();
  }
};

export default router;
