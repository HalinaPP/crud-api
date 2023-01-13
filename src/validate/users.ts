import { IUserData } from './../types';

const validateAge = (age) => {
  if (!age || typeof age !== 'number' || age < 1 || age > 120) {
    throw new Error('User age is incorrect!');
  }
};

const validateUsername = (username) => {
  if (!username || typeof username !== 'string' || username === '') {
    throw new Error('Username is incorrect!');
  }
};

const isArrayStrings = (array) => array.every((value) => typeof value === 'string');

const validateHobbies = (hobbies) => {
  if (!hobbies || !Array.isArray(hobbies) || (hobbies.length > 0 && !isArrayStrings(hobbies))) {
    throw new Error('Hobbies data is incorrect!');
  }
};

export const validatePostField = (user: IUserData): void => {
  validateAge(user.age);
  validateUsername(user.username);
  validateHobbies(user.hobbies);
};
