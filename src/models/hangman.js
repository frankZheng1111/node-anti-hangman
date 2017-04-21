'use strict'
import request from 'request-promise';
import logger from '../libs/logger';
import { hangmanServer } from '../config';

class Hangman {
  constructor(cookie) {
    console.log(cookie)
    this.cookie = cookie;
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
    return request(options);
  }
}

export default Hangman;

