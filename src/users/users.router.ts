import { methods } from './../constants';
import { IncomingMessage, ServerResponse } from 'http';
import { statusCodes } from '../constants';
import { findAll } from './users.repositories';

const getUsers = (res: ServerResponse<IncomingMessage>) => {
  const users = findAll();

  res.writeHead(statusCodes.OK, { 'Content-Type': 'application/json' });
  res.write(JSON.stringify(users));
  res.end();
};

const userRouter = (req: IncomingMessage, res: ServerResponse<IncomingMessage>) => {
  const { method, url } = req;
  console.log(`Url is ${url} and Method is ${method}`);

  switch (method) {
    case methods.get:
      getUsers(res);
      break;
    case methods.post:
      console.log('post', req.url);
      break;
    case methods.push:
      console.log('put', req.url);
      break;
    case methods.delete:
      console.log('delete', req.url);
      break;
    default:
      break;
  }
};

export default userRouter;
