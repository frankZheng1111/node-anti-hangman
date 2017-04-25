'use strict';
import Promise from 'bluebird';
import logger from './libs/logger';
import User from './models/user';
import Hangman from './models/hangman';
import { user as userConfig } from './config';

new User(userConfig.name, userConfig.password).signin()
  .then((user) => {
    let counters = [];
    for(let i = 0 ; i < 100 ; i++) { counters.push(i); }
    Promise.map(counters, () => { return Hangman.play(user); }, { concurrency: 1 })
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

