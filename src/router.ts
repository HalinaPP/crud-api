import { userBaseUrl } from './constants';
import { IncomingMessage, ServerResponse } from 'http';
import userRouter from './users/users.router';
import { IRequestInfo, IUser } from './types';
import { getUrlParams, sendResponse } from './helpers';
import { statusCodes, Messages } from './status_constants';

const router = (req: IncomingMessage, res: ServerResponse<IncomingMessage>) => {
  const { url } = req;
  const urlParams = getUrlParams(url, userBaseUrl);

  const isUsersPath = url === userBaseUrl || url.startsWith(`${userBaseUrl}/`);

  if (isUsersPath) {
    let currentBody = '';

    req.on('data', (data) => {
      currentBody += data;
    });

    req.on('end', () => {
      const body: IUser = JSON.parse(currentBody);
      const reqInfo: IRequestInfo = { path: userBaseUrl, params: urlParams, body };

      try {
        userRouter(req, res, reqInfo);
      } catch (error) {
        sendResponse(statusCodes.INTERNAL_SERVER_ERROR, Messages.INTERNAL_SERVER_ERROR, res);
      }
    });
  } else {
    sendResponse(statusCodes.NOT_FOUND, Messages.PAGE_NOT_EXISTS, res);
  }
};

export default router;
