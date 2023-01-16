import * as dotenv from 'dotenv';
dotenv.config();

export const PORT = process.env.PORT || 3000;
export const HOST_NAME = `http://localhost:{$PORT}/`;
export const API_URL_CHUNK = '/api';
export const USERS_URL_CHUNK = '/users';
export const userBaseUrl = `${API_URL_CHUNK}${USERS_URL_CHUNK}`;

export const methods = { get: 'GET', post: 'POST', delete: 'DELETE', put: 'PUT' };
