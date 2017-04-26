'use strict';
import { should as _should } from 'chai';
import sinon from 'sinon';
import Hangman from '../../src/models/hangman';
import request from 'request-promise';

// eslint-disable-next-line
const should = _should();

describe('Test Hangman class', () => {
  it('should new hangman and constructor should be run', () => {
    let hangman = new Hangman('cookie', 'k');
    hangman.cookie.should.equal('cookie');
    hangman.nextLetter.should.equal('k');
  });

  describe('Test Method in Hangman', () => {
    let hangman = {};
    let resp = {};
    beforeEach(() => {
      // new Hangman
      //
      hangman = {};
      hangman = new Hangman('cookie');

      // build response data
      //
      resp = {
        data: {
          id: 'testId',
          attributes: {
            hp: 10,
            state: 'init',
            currentWordStr: 'testWord'
          }
        }
      };
    });

    it('should refreshHangmanByResp', () => {
      hangman.refreshHangmanByResp(resp);
      hangman.id.should.equal('testId');
      hangman.hp.should.equal(10);
      hangman.state.should.equal('init');
      hangman.currentWordStr.should.equal('testWord');
    });

    it('should create a newGame', (done) => {
      let stubRequest = sinon.stub(request,'Request').resolves(resp);
      hangman.newGame().then((hangman) => {
        hangman.id.should.equal('testId');
        hangman.hp.should.equal(10);
        hangman.state.should.equal('init');
        hangman.currentWordStr.should.equal('testWord');
        stubRequest.restore();
        done();
      }).catch(done);
    });
  });
});


