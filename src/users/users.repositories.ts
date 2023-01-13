import { IUser } from './../types';
import { v4 as uuidv4 } from 'uuid';
import { users as initialUsers } from './users.data';

const users = [...initialUsers];

export const findAll = (): IUser[] => {
  return users;
};

export const find = (id: string): IUser => {
  return users.find((user) => user.id === id);
};

export const deleteUser = (id: string): boolean => {
  const userIndex = users.findIndex((user) => user.id === id);

  if (userIndex < 0) {
    return false;
  }

  users.splice(userIndex, 1);

  return true;
};

export const update = (userForUpdate: IUser): boolean => {
  const userIndex = users.findIndex((user) => user.id === userForUpdate.id);

  if (userIndex < 0) {
    return false;
  }

  users[userIndex] = userForUpdate;
  return true;
};

export const create = (userData: Partial<IUser>): IUser => {
  const id = uuidv4();
  const { username, age, hobbies } = userData;

  const newUser: IUser = { id, username, age, hobbies };
  users.push(newUser);

  return newUser;
};
