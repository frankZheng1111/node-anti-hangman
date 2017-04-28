'use strict';
import { should as _should } from 'chai';
import sinon from 'sinon';
import User from '../../src/models/user';
import request from 'request-promise';

const should = _should();

describe('Test Hangman class', () => {
  describe('Test Method in Hangman', () => {
    let resp = {};
    let stubRequest = {};
    beforeEach(() => {
      // build response data
      //
      resp = [
        {
          state: 'success'
        },
        'cookie'
      ];
      // stub request
      //
      stubRequest = sinon.stub(request,'Request').resolves(resp);
    });

    afterEach(() => {
      stubRequest.restore();
    });

    it('should signin user', (done) => {
      new User().signin()
        .then((user) => {
          user.loginState.state.should.equal('success');
          user.cookie.should.equal('cookie');
          done();
        })
        .catch(done);
    });
  });

});

