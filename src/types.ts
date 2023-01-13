import { ParsedUrlQuery } from 'querystring';

export interface IUser {
  id: string;
  username: string;
  age: number;
  hobbies: string[];
}

export interface IRequestInfo {
  path: string;
  params: ParsedUrlQuery;
  body: IUser;
}
