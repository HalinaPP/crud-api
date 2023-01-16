import supertest from 'supertest';
import { app } from '../server';
import { userBaseUrl } from '../constants';
import { statusCodes, Messages } from '../status_constants';
import { incorrectValueMessages } from '../validate/error-messages';

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

describe('All API methods work correctly', () => {
  afterAll(() => {
    app.close();
  });

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

describe('Return error when user does not exist', () => {
  let expectedId;

  afterAll(() => {
    app.close();
  });

  it('should create a new user', async () => {
    const res = await supertest(app).post(userBaseUrl).send(JSON.stringify(fakeUser));

    expectedId = res.body.id;
    expectedUser.id = expectedId;

    expect(res.statusCode).toBe(statusCodes.CREATED);
    expect(res.body).toEqual(expectedUser);
  });

  it('should return created user', async () => {
    const userIdUrl = `${userBaseUrl}/${expectedId}`;
    const res = await supertest(app).get(userIdUrl).send(JSON.stringify(''));

    expect(res.statusCode).toBe(statusCodes.OK);
    expect(res.body).toEqual(expectedUser);
  });

  it('should delete user', async () => {
    const userIdUrl = `${userBaseUrl}/${expectedId}`;

    const res = await supertest(app).delete(userIdUrl).send(JSON.stringify(''));

    expect(res.statusCode).toBe(statusCodes.NO_CONTENT);
  });

  it('should return 404 error when get user', async () => {
    const userIdUrl = `${userBaseUrl}/${expectedId}`;
    const res = await supertest(app).get(userIdUrl).send(JSON.stringify(''));

    expect(res.statusCode).toBe(statusCodes.NOT_FOUND);
    expect(res.body).toEqual(Messages.NOT_FOUND);
  });

  it('should return 404 error when update', async () => {
    const userIdUrl = `${userBaseUrl}/${expectedId}`;
    const res = await supertest(app).put(userIdUrl).send(JSON.stringify(fakeUserForUpdate));

    expect(res.statusCode).toBe(statusCodes.NOT_FOUND);
    expect(res.body).toEqual(Messages.NOT_FOUND);
  });

  it('should return 404 error when delete', async () => {
    const userIdUrl = `${userBaseUrl}/${expectedId}`;
    const res = await supertest(app).delete(userIdUrl).send(JSON.stringify(''));

    expect(res.statusCode).toBe(statusCodes.NOT_FOUND);
  });
});

describe('Check API with bad data', () => {
  const badId = '123';

  afterAll(() => {
    app.close();
  });

  it('should return error when age is not set', async () => {
    const badAgeFakeUser = { ...fakeUser };
    delete badAgeFakeUser.age;

    const res = await supertest(app).post(userBaseUrl).send(JSON.stringify(badAgeFakeUser));

    expect(res.statusCode).toBe(statusCodes.BAD_REQUEST);
    expect(res.body).toEqual(incorrectValueMessages.age);
  });

  it('should return error when age is not number', async () => {
    const badAgeFakeUser = { ...fakeUser, age: 'text' };

    const res = await supertest(app).post(userBaseUrl).send(JSON.stringify(badAgeFakeUser));

    expect(res.statusCode).toBe(statusCodes.BAD_REQUEST);
    expect(res.body).toEqual(incorrectValueMessages.age);
  });

  it('should return error when age is less than 1', async () => {
    const badAgeFakeUser = { ...fakeUser, age: 0 };

    const res = await supertest(app).post(userBaseUrl).send(JSON.stringify(badAgeFakeUser));

    expect(res.statusCode).toBe(statusCodes.BAD_REQUEST);
    expect(res.body).toEqual(incorrectValueMessages.age);
  });

  it('should return error when age is more than 120', async () => {
    const badAgeFakeUser = { ...fakeUser, age: 121 };

    const res = await supertest(app).post(userBaseUrl).send(JSON.stringify(badAgeFakeUser));

    expect(res.statusCode).toBe(statusCodes.BAD_REQUEST);
    expect(res.body).toEqual(incorrectValueMessages.age);
  });

  it('should return error when username is not set', async () => {
    const badAgeFakeUser = { ...fakeUser };
    delete badAgeFakeUser.username;

    const res = await supertest(app).post(userBaseUrl).send(JSON.stringify(badAgeFakeUser));

    expect(res.statusCode).toBe(statusCodes.BAD_REQUEST);
    expect(res.body).toEqual(incorrectValueMessages.username);
  });

  it('should return error when username is empty', async () => {
    const badAgeFakeUser = { ...fakeUser, username: '' };

    const res = await supertest(app).post(userBaseUrl).send(JSON.stringify(badAgeFakeUser));

    expect(res.statusCode).toBe(statusCodes.BAD_REQUEST);
    expect(res.body).toEqual(incorrectValueMessages.username);
  });

  it('should return error when username is not string', async () => {
    const badAgeFakeUser = { ...fakeUser, username: 34 };

    const res = await supertest(app).post(userBaseUrl).send(JSON.stringify(badAgeFakeUser));

    expect(res.statusCode).toBe(statusCodes.BAD_REQUEST);
    expect(res.body).toEqual(incorrectValueMessages.username);
  });

  it('should return error when hobbies is not set', async () => {
    const badAgeFakeUser = { ...fakeUser };
    delete badAgeFakeUser.hobbies;

    const res = await supertest(app).post(userBaseUrl).send(JSON.stringify(badAgeFakeUser));

    expect(res.statusCode).toBe(statusCodes.BAD_REQUEST);
    expect(res.body).toEqual(incorrectValueMessages.hobbies);
  });

  it('should return error when hobbies is not an array', async () => {
    const badAgeFakeUser = { ...fakeUser, hobbies: 'one hobby' };

    const res = await supertest(app).post(userBaseUrl).send(JSON.stringify(badAgeFakeUser));

    expect(res.statusCode).toBe(statusCodes.BAD_REQUEST);
    expect(res.body).toEqual(incorrectValueMessages.hobbies);
  });

  it('should return error when hobby values is not string', async () => {
    const badAgeFakeUser = { ...fakeUser, hobbies: ['one hobby', 23] };

    const res = await supertest(app).post(userBaseUrl).send(JSON.stringify(badAgeFakeUser));

    expect(res.statusCode).toBe(statusCodes.BAD_REQUEST);
    expect(res.body).toEqual(incorrectValueMessages.hobbies);
  });

  it('get method should return error when wrong id format', async () => {
    const userIdUrl = `${userBaseUrl}/${badId}`;
    const res = await supertest(app).get(userIdUrl).send(JSON.stringify(''));

    expect(res.statusCode).toBe(statusCodes.BAD_REQUEST);
    expect(res.body).toEqual(incorrectValueMessages.id);
  });

  it('put method should return error when wrong id format', async () => {
    const userIdUrl = `${userBaseUrl}/${badId}`;
    const res = await supertest(app).put(userIdUrl).send(JSON.stringify(''));

    expect(res.statusCode).toBe(statusCodes.BAD_REQUEST);
    expect(res.body).toEqual(incorrectValueMessages.id);
  });

  it('delete method should return error when wrong id format', async () => {
    const userIdUrl = `${userBaseUrl}/${badId}`;
    const res = await supertest(app).get(userIdUrl).send(JSON.stringify(''));

    expect(res.statusCode).toBe(statusCodes.BAD_REQUEST);
    expect(res.body).toEqual(incorrectValueMessages.id);
  });
});
