import supertest from 'supertest';
import { app } from '../server';
import { userBaseUrl } from '../constants';
import { statusCodes, Messages } from '../status_constants';

const fakeUser = {
  username: 'fakeUser',
  age: 20,
  hobbies: ['fakeHobby1', 'fakeHobby2'],
};

const fakeUserForUpdate = {
  username: 'newFakeUser',
  age: 30,
  hobbies: ['fakeHobby2'],
};

const expectedUser = { id: undefined, ...fakeUser };

describe('check all API methods', () => {
  it('should return an empty array ', async () => {
    const emptyUser = [];

    const res = await supertest(app).get(userBaseUrl).send(JSON.stringify(''));

    expect(res.statusCode).toBe(statusCodes.OK);
    expect(res.body).toEqual(emptyUser);
  });

  it('should create a new user', async () => {
    const res = await supertest(app).post(userBaseUrl).send(JSON.stringify(fakeUser));

    expectedUser.id = res.body.id;

    expect(res.statusCode).toBe(statusCodes.CREATED);
    expect(res.body).toEqual(expectedUser);
  });

  it('should return an array with created user', async () => {
    const res = await supertest(app).get(userBaseUrl).send(JSON.stringify(''));

    expect(res.statusCode).toBe(statusCodes.OK);
    expect(res.body.length).toBe(1);
    expect(res.body).toEqual([expectedUser]);
  });

  it('should find created user by id', async () => {
    const userIdUrl = `${userBaseUrl}/${expectedUser.id}`;

    const res = await supertest(app).get(userIdUrl).send(JSON.stringify(''));

    expect(res.statusCode).toBe(statusCodes.OK);
    expect(res.body).toEqual(expectedUser);
  });

  it('should update user', async () => {
    const userIdUrl = `${userBaseUrl}/${expectedUser.id}`;

    const res = await supertest(app).put(userIdUrl).send(JSON.stringify(fakeUserForUpdate));

    const updatedUser = { id: expectedUser.id, ...fakeUserForUpdate };

    expect(res.statusCode).toBe(statusCodes.OK);
    expect(res.body).toEqual(updatedUser);
  });

  it('should delete user', async () => {
    const userIdUrl = `${userBaseUrl}/${expectedUser.id}`;

    const res = await supertest(app).delete(userIdUrl).send(JSON.stringify(''));

    expect(res.statusCode).toBe(statusCodes.NO_CONTENT);
  });

  it('should not find user by id', async () => {
    const userIdUrl = `${userBaseUrl}/${expectedUser.id}`;

    const res = await supertest(app).get(userIdUrl).send(JSON.stringify(''));

    expect(res.statusCode).toBe(statusCodes.NOT_FOUND);
    expect(res.body).toBe(Messages.NOT_FOUND);
  });
});
