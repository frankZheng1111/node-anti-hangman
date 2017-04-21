'use strict'
import request from 'request-promise';
import logger from '../libs/logger';
import { hangmanServer } from '../config';

class User {
  constructor(name, password) {
    this.name = name;
    this.password = password;
    this.cookie = "";
  }

  signin() {
    let options = {
      method: 'PUT',
      uri: `${hangmanServer.url}/api/users/signin`,
      form: {
        name: this.name,
        password: this.password
      },
      transform: function (body, response, resolveWithFullResponse) {
        this.cookie = response.caseless.dict["set-cookie"][0];
        body.cookie = this.cookie;
        return body;
      },
      json: true
    }
    return request(options);
  }
}

export default User;

