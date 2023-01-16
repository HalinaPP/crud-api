import { IncomingMessage, ServerResponse } from 'http';

export const sendResponse = (statusCode: number, body: any, res: ServerResponse<IncomingMessage>) => {
  res.writeHead(statusCode, { 'Content-Type': 'application/json' });
  res.write(JSON.stringify(body));
  res.end();
};

export const getUrlParams = (url: string, pathname: string) => {
  const paramsString: string = url.slice(pathname.length + 1);
  const params = paramsString.split('/');

  return params;
};
