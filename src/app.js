'use strict'
import User from './models/user';
import Hangman from './models/hangman';
import { user as userConfig } from './config';

let user = new User(userConfig.name, userConfig.password).signin()
  .then((data) => {
    new Hangman(data.cookie).newGame()
    .then((data) => {
      console.log(data);
    });
  });
