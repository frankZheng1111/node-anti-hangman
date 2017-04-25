'use strict';
import request from 'request-promise';
import { hangmanServer } from '../config';

class User {
  constructor(name, password) {
    this.name = name;
    this.password = password;
    this.cookie = '';
    this.loginState = {};
  }

  signin() {
    let options = {
      method: 'PUT',
      uri: `${hangmanServer.url}/api/users/signin`,
      form: {
        name: this.name,
        password: this.password
      },
      transform: function (body, response) {
        let cookie = response.caseless.dict['set-cookie'][0];
        return [body, cookie];
      },
      json: true
    };
    return request(options)
      .then(([body, cookie]) => {
        this.loginState = body;
        this.cookie = cookie;
        return Promise.resolve(this);
      });
  }
}

export default User;

