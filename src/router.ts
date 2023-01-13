import { API_URL_CHUNK, USERS_URL_CHUNK, statusCodes } from './constants';
import { IncomingMessage, ServerResponse } from 'http';
import userRouter from './users/users.router';
import { IRequestInfo, IUser } from './types';
import url from 'url';

const router = (req: IncomingMessage, res: ServerResponse<IncomingMessage>) => {
  const urlParts = url.parse(req.url, true);
  const urlParams = urlParts.query;
  const urlPathname = urlParts.pathname;

  const isUsersPath = urlPathname === `${API_URL_CHUNK}${USERS_URL_CHUNK}`;

  if (isUsersPath) {
    let currentBody = '';

    req.on('data', (data) => {
      currentBody += data;
    });

    req.on('end', () => {
      const body: IUser = JSON.parse(currentBody);
      const reqInfo: IRequestInfo = { path: urlPathname, params: urlParams, body };

      userRouter(req, res, reqInfo);
    });
  } else {
    console.log('error', req.url);
    res.writeHead(statusCodes.NOT_FOUND, { 'Content-Type': 'application/json' });
    res.write(JSON.stringify({ message: 'Error! This page does not exists' }));
    res.end();
  }
};

export default router;
