import { IUser } from './../types';
import { v4 as uuidv4 } from 'uuid';
import { users } from './users.data';

export const findAll = (): IUser[] => {
  return users;
};

//find
//update
//create
//const myuuid = uuidv4();
//delete
