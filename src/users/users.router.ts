import { IUser, IRequestInfo, IUserData } from './../types';
import { methods } from './../constants';
import { IncomingMessage, ServerResponse } from 'http';
import { statusCodes } from '../constants';
import { create, deleteUser, find, findAll, update } from './users.repositories';
import { validateId, validateUserData } from '../validate/users';

const sendResponse = (statusCode: number, body: any, res: ServerResponse<IncomingMessage>) => {
  res.writeHead(statusCode, { 'Content-Type': 'application/json' });
  res.write(JSON.stringify(body));
  res.end();
};

const getUserById = (id: string, res: ServerResponse<IncomingMessage>) => {
  try {
    validateId(id);

    const user = find(id);

    if (!user) {
      sendResponse(statusCodes.NOT_FOUND, 'User not found', res);
      return;
    }

    sendResponse(statusCodes.OK, user, res);
  } catch (err) {
    sendResponse(statusCodes.BAD_REQUEST, 'Get user error:' + err.message, res);
  }
};

const getUsers = (res: ServerResponse<IncomingMessage>) => {
  const users = findAll();

  sendResponse(statusCodes.OK, users, res);
};

const createUser = (body: IUserData, res: ServerResponse<IncomingMessage>) => {
  try {
    validateUserData(body);

    const user: IUser = create(body);

    sendResponse(statusCodes.CREATED, user, res);
  } catch (err) {
    sendResponse(statusCodes.BAD_REQUEST, 'Create user error:' + err.message, res);
  }
};

const updateUser = (id: string, body: IUserData, res: ServerResponse<IncomingMessage>) => {
  try {
    validateId(id);
    validateUserData(body);

    const isUserUpdated: boolean = update(id, body);

    if (!isUserUpdated) {
      sendResponse(statusCodes.NOT_FOUND, 'User not found', res);
      return;
    }

    sendResponse(statusCodes.OK, { id, ...body }, res);
  } catch (err) {
    sendResponse(statusCodes.BAD_REQUEST, 'Create user error:' + err.message, res);
  }
};

const deleteUserById = (id: string, res: ServerResponse<IncomingMessage>) => {
  try {
    validateId(id);

    const isUserDeleted: boolean = deleteUser(id);

    if (!isUserDeleted) {
      sendResponse(statusCodes.NOT_FOUND, 'User not found', res);
      return;
    }

    sendResponse(statusCodes.NO_CONTENT, '', res);
  } catch (err) {
    sendResponse(statusCodes.BAD_REQUEST, 'Delete user error:' + err.message, res);
  }
};

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
