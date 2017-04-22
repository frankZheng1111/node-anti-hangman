'use strict'
import logger from './libs/logger';
import User from './models/user';
import Hangman from './models/hangman';
import { user as userConfig } from './config';

new User(userConfig.name, userConfig.password).signin()
  .then((user) => {
    new Hangman(user.cookie).newGame()
    .then((hangman) => {
      return hangman.guessingWord();
    })
    .then((hangman) => {
      logger.info(`STATE: ${hangman.state}, HP: ${hangman.hp}, CURRENTWORD: ${hangman.currentWordStr}`);
    });
  });
