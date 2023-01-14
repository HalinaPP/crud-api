import { IUser, IUserData } from '../types';
import { IncomingMessage, ServerResponse } from 'http';
import { statusCodes } from '../constants';
import { create, deleteUser, find, findAll, update } from './users.repository';
import { validateId, validateUserData } from '../validate/users';

const sendResponse = (statusCode: number, body: any, res: ServerResponse<IncomingMessage>) => {
  res.writeHead(statusCode, { 'Content-Type': 'application/json' });
  res.write(JSON.stringify(body));
  res.end();
};

export const getUserById = (id: string, res: ServerResponse<IncomingMessage>) => {
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

export const getUsers = (res: ServerResponse<IncomingMessage>) => {
  const users = findAll();

  sendResponse(statusCodes.OK, users, res);
};

export const createUser = (body: IUserData, res: ServerResponse<IncomingMessage>) => {
  try {
    validateUserData(body);

    const user: IUser = create(body);

    sendResponse(statusCodes.CREATED, user, res);
  } catch (err) {
    sendResponse(statusCodes.BAD_REQUEST, 'Create user error:' + err.message, res);
  }
};

export const updateUser = (id: string, body: IUserData, res: ServerResponse<IncomingMessage>) => {
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

export const deleteUserById = (id: string, res: ServerResponse<IncomingMessage>) => {
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
