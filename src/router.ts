import { API_URL_CHUNK, USERS_URL_CHUNK, statusCodes } from './constants';
import { IncomingMessage, ServerResponse } from 'http';
import userRouter from './users/users.router';
import { IRequestInfo, IUser } from './types';
import { sendResponse } from './helpers';

const getUrlParams = (url: string, userPathname: string) => {
  const paramsString: string = url.slice(userPathname.length + 1);
  const params = paramsString.split('/');

  return params;
};

const router = (req: IncomingMessage, res: ServerResponse<IncomingMessage>) => {
  const { url } = req;
  const userPathname = `${API_URL_CHUNK}${USERS_URL_CHUNK}`;
  const urlParams = getUrlParams(url, userPathname);

  const isUsersPath = url === userPathname || url.startsWith(`${userPathname}/`);

  if (isUsersPath) {
    let currentBody = '';

    req.on('data', (data) => {
      currentBody += data;
    });

    req.on('end', () => {
      const body: IUser = JSON.parse(currentBody);
      const reqInfo: IRequestInfo = { path: userPathname, params: urlParams, body };

      userRouter(req, res, reqInfo);
    });
  } else {
    sendResponse(statusCodes.NOT_FOUND, 'Error! This page does not exists', res);
  }
};

export default router;
