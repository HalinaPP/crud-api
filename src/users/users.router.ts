import { IRequestInfo } from '../types';
import { methods } from '../constants';
import { IncomingMessage, ServerResponse } from 'http';
import {
  createUser,
  deleteUserById,
  getUserById,
  getUsers,
  methodNotImplemented,
  updateUser,
} from './users.controller';

const userRouter = (req: IncomingMessage, res: ServerResponse<IncomingMessage>, reqInfo: IRequestInfo) => {
  const { method } = req;
  const { params, body } = reqInfo;
  const id = params[0];

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
      methodNotImplemented(res);
      break;
  }
};

export default userRouter;
