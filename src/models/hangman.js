'use strict';
import request from 'request-promise';
import logger from '../libs/logger';
import { initDictionary, filterDictionary, getMostLetter } from '../libs/dictionary';
import { hangmanServer } from '../config';

const HANGMAN_FINSIHED_STATES = [ 'win', 'lose', 'giveup' ];

class Hangman {
  constructor(cookie, firstLetter = 'e') {
    this.cookie = cookie;
    this.id = '';
    this.hp = -1;
    this.state = '';
    this.currentWordStr = '';
    this.dictionary = initDictionary();
    this.nextLetter = firstLetter;
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
      headers: {
        Cookie: this.cookie
      },
      json: true
    };
    return request(options)
      .then((hangman) => {
        this.refreshHangmanByResp(hangman);
        logger.info(`START NEW GAME: ${this.id}`);
        return Promise.resolve(this);
      });
  }

  guessingWord() {
    if (HANGMAN_FINSIHED_STATES.includes(this.state)) {
      return Promise.resolve(this);
    } else {
      return this.guess(this.nextLetter)
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
    };
    return request(options).then((hangman) => {
      let falseLetter = '';
      if (this.hp > hangman.data.attributes.hp) {
        falseLetter = letter;
      }
      this.refreshHangmanByResp(hangman);
      this.dictionary = filterDictionary(this.dictionary, this.currentWordStr, falseLetter);
      this.nextLetter = getMostLetter(this.dictionary, this.currentWordStr);
      logger.info(`ID: ${this.id}, GUESS: ${letter}, HP: ${this.hp}, CURRENTWORD: ${this.currentWordStr}`);
      return Promise.resolve(this);
    });
  }

  static play(user) {
    return new this(user.cookie, getMostLetter(initDictionary())).newGame()
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
}

export default Hangman;

