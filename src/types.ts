import { ParsedUrlQuery } from 'querystring';

export interface IUserData {
  username: string;
  age: number;
  hobbies: string[];
}

export interface IUser extends IUserData {
  id: string;
}

export interface IRequestInfo {
  path: string;
  params: ParsedUrlQuery;
  body: IUser;
}
