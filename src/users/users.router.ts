import { IRequestInfo } from '../types';
import { methods } from '../constants';
import { IncomingMessage, ServerResponse } from 'http';
import { createUser, deleteUserById, getUserById, getUsers, updateUser } from './users.controller';

const userRouter = (req: IncomingMessage, res: ServerResponse<IncomingMessage>, reqInfo: IRequestInfo) => {
  const { method, url } = req;
  const { params, body } = reqInfo;
  const id = params[0];

  console.log(`Url is ${url} and Method is ${method} params is `, id);

  switch (method) {
    case methods.get:
      if (!id) {
        getUsers(res);
      } else {
        getUserById(id, res);
      }
      break;
    case methods.post:
      createUser(body, res);
      break;
    case methods.put:
      updateUser(id, body, res);
      break;
    case methods.delete:
      deleteUserById(id, res);
      break;
    default:
      break;
  }
};

export default userRouter;
