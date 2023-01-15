import { IncomingMessage, ServerResponse } from 'http';
import { IUser, IUserData } from '../types';
import { statusCodes, Messages } from '../status_constants';
import { validateId, validateUserData } from '../validate/users';
import { sendResponse } from '../helpers';
import { create, deleteUser, find, findAll, update } from './users.repository';

export const methodNotImplemented = (res: ServerResponse<IncomingMessage>) => {
  sendResponse(statusCodes.NOT_FOUND, Messages.NOT_FOUND, res);
};

export const getUserById = (id: string, res: ServerResponse<IncomingMessage>) => {
  try {
    validateId(id);

    const user = find(id);

    if (!user) {
      sendResponse(statusCodes.NOT_FOUND, Messages.NOT_FOUND, res);
      return;
    }

    sendResponse(statusCodes.OK, user, res);
  } catch (err) {
    sendResponse(statusCodes.BAD_REQUEST, err.message, res);
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
    sendResponse(statusCodes.BAD_REQUEST, err.message, res);
  }
};

export const updateUser = (id: string, body: IUserData, res: ServerResponse<IncomingMessage>) => {
  try {
    validateId(id);
    validateUserData(body);

    const isUserUpdated: boolean = update(id, body);

    if (!isUserUpdated) {
      sendResponse(statusCodes.NOT_FOUND, Messages.NOT_FOUND, res);
      return;
    }

    sendResponse(statusCodes.OK, { id, ...body }, res);
  } catch (err) {
    sendResponse(statusCodes.BAD_REQUEST, err.message, res);
  }
};

export const deleteUserById = (id: string, res: ServerResponse<IncomingMessage>) => {
  try {
    validateId(id);

    const isUserDeleted: boolean = deleteUser(id);

    if (!isUserDeleted) {
      sendResponse(statusCodes.NOT_FOUND, Messages.NOT_FOUND, res);
      return;
    }

    sendResponse(statusCodes.NO_CONTENT, '', res);
  } catch (err) {
    sendResponse(statusCodes.BAD_REQUEST, err.message, res);
  }
};
