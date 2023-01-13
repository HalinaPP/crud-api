import { IUser, IRequestInfo, IUserData } from './../types';
import { methods } from './../constants';
import { IncomingMessage, ServerResponse } from 'http';
import { statusCodes } from '../constants';
import { create, findAll } from './users.repositories';
import { validatePostField } from '../validate/users';

const getUsers = (res: ServerResponse<IncomingMessage>) => {
  const users = findAll();

  res.writeHead(statusCodes.OK, { 'Content-Type': 'application/json' });
  res.write(JSON.stringify(users));
  res.end();
};

const createUser = (body: IUserData, res: ServerResponse<IncomingMessage>) => {
  try {
    validatePostField(body);

    const user: IUser = create(body);

    res.writeHead(statusCodes.CREATED, { 'Content-Type': 'application/json' });
    res.write(JSON.stringify(user));
    res.end();
  } catch (err) {
    res.writeHead(statusCodes.BAD_REQUEST, { 'Content-Type': 'application/json' });
    res.write(JSON.stringify('Create user error:' + err.message));
    res.end();
  }
};

const userRouter = (req: IncomingMessage, res: ServerResponse<IncomingMessage>, reqInfo: IRequestInfo) => {
  const { method, url } = req;
  const { path, params, body } = reqInfo;

  console.log(`Url is ${url} and Method is ${method}`);

  switch (method) {
    case methods.get:
      getUsers(res);
      break;
    case methods.post:
      createUser(body, res);
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
