'use strict'
import Promise from 'bluebird';
import logger from './libs/logger';
import { initDictionary, getMostLetter } from './libs/dictionary';
import User from './models/user';
import Hangman from './models/hangman';
import { user as userConfig } from './config';

function playHangman(user) {
  return new Hangman(user.cookie, getMostLetter(initDictionary())).newGame()
    .then((hangman) => {
      return hangman.guessingWord();
    })
  .then((hangman) => {
    logger.info(`STATE: ${hangman.state}, HP: ${hangman.hp}, CURRENTWORD: ${hangman.currentWordStr}`);
    return Promise.resolve({
      state: hangman.state,
      hp: hangman.hp,
      id: hangman.id
    });
  });
}

new User(userConfig.name, userConfig.password).signin()
  .then((user) => {
    let counters = [];
    for(let i = 0 ; i < 100 ; i++) { counters.push(i); }
    Promise.map(counters, (c) => { return playHangman(user); }, { concurrency: 1 })
      .then((results) => {
        let totalCount = results.length;
        let winCount = 0;
        let loseCount = 0;
        results.forEach((result) => {
          if (result.state === 'win') { winCount++; }
          if (result.state === 'lose') { loseCount++; }
        });
        logger.info(`Total: ${totalCount}, Win: ${winCount}, Lose: ${loseCount}, Accuracy: ${(winCount * 100 / totalCount).toFixed(2)}`);
      });
  });

