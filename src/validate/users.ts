import { validate } from 'uuid';
import { IUserData } from './../types';
import { incorrectValueMessages } from './error-messages';

const validateAge = (age) => {
  if (!age || typeof age !== 'number' || age < 1 || age > 120) {
    throw new Error(incorrectValueMessages.age);
  }
};

const validateUsername = (username) => {
  if (!username || typeof username !== 'string' || username === '') {
    throw new Error(incorrectValueMessages.username);
  }
};

const isArrayStrings = (array) => array.every((value) => typeof value === 'string');

const validateHobbies = (hobbies) => {
  if (!hobbies || !Array.isArray(hobbies) || (hobbies.length > 0 && !isArrayStrings(hobbies))) {
    throw new Error(incorrectValueMessages.hobbies);
  }
};

export const validateId = (id) => {
  if (!id || !validate(id) || id === '') {
    throw new Error(incorrectValueMessages.id);
  }
};

export const validateUserData = (user: IUserData): void => {
  validateAge(user.age);
  validateUsername(user.username);
  validateHobbies(user.hobbies);
};
