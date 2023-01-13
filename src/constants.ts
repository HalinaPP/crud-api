import * as dotenv from 'dotenv';
dotenv.config();

export const PORT = process.env.PORT || 3000;
export const HOST_NAME = `http://localhost:{$PORT}/`;
export const API_URL_CHUNK = '/api';
export const USERS_URL_CHUNK = '/users';

export const methods = { get: 'GET', post: 'POST', delete: 'DELETE', push: 'PUSH' };
export const statusCodes = { OK: 200, CREATED: 201, NO_CONTENT: 204, BAD_REQUEST: 400, NOT_FOUND: 404 };
