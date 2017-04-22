'use strict'
import request from 'request-promise';
import logger from '../libs/logger';
import { hangmanServer } from '../config';

const HANGMAN_FINSIHED_STATES = [ 'win', 'lose', 'giveup' ];
let letters = 'abcdefghijklmnopqrstuvwxyz'.split('')

class Hangman {
  constructor(cookie) {
    console.log(cookie)
    this.cookie = cookie;
    this.id = "";
    this.hp = -1;
    this.state = "";
    this.currentWordStr = "";
  }

  refreshHangmanByResp(hangman) {
    this.id = hangman.data.id;
    this.hp = hangman.data.attributes.hp;
    this.state = hangman.data.attributes.state;
    this.currentWordStr = hangman.data.attributes.currentWordStr;
    return this;
  }

  newGame() {
    let options = {
      method: 'POST',
      uri: `${hangmanServer.url}/api/hangmen`,
      form: {
      },
      headers: {
        Cookie: this.cookie
      },
      json: true
    }
    return request(options)
      .then((hangman) => {
        this.refreshHangmanByResp(hangman);
        logger.info(`START NEW GAME: ${this.id}`);
        return Promise.resolve(this);
      });
  }
  
  guessingWord() {
    letters.pop();
    if (HANGMAN_FINSIHED_STATES.includes(this.state)) {
      return Promise.resolve(this);
    } else {
      return this.guess(letters[letters.length - 1])
        .then(() => {
          return this.guessingWord();
        });
    }
  }

  guess(letter) {
    let options = {
      method: 'patch',
      uri: `${hangmanServer.url}/api/hangmen/${this.id}`,
      form: {
        letter: letter
      },
      headers: {
        Cookie: this.cookie
      },
      json: true
    }
    return request(options).then((hangman) => {
      this.refreshHangmanByResp(hangman);
      logger.info(`ID: ${this.id}, GUESS: ${letter}, HP: ${this.hp}, CURRENTWORD: ${this.currentWordStr}`);
      return Promise.resolve(this);
    });
  }
}

export default Hangman;

