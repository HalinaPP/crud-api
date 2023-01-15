import { userBaseUrl } from './constants';
import { IncomingMessage, ServerResponse } from 'http';
import userRouter from './users/users.router';
import { IRequestInfo, IUser } from './types';
import { sendResponse } from './helpers';
import { statusCodes, Messages } from './status_constants';

const getUrlParams = (url: string, userPathname: string) => {
  const paramsString: string = url.slice(userPathname.length + 1);
  const params = paramsString.split('/');

  return params;
};

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

      userRouter(req, res, reqInfo);
    });
  } else {
    sendResponse(statusCodes.NOT_FOUND, Messages.PAGE_NOT_EXISTS, res);
  }
};

export default router;
