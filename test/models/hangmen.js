'use strict';
import { should as _should } from 'chai';
import sinon from 'sinon';
import Hangman from '../../src/models/hangman';
import request from 'request-promise';

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
    let stubRequest = {};
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
      // stub request
      //
      stubRequest = sinon.stub(request,'Request').resolves(resp);
    });

    afterEach(() => {
      stubRequest.restore();
    });

    it('should refreshHangmanByResp', () => {
      hangman.refreshHangmanByResp(resp);
      hangman.id.should.equal('testId');
      hangman.hp.should.equal(10);
      hangman.state.should.equal('init');
      hangman.currentWordStr.should.equal('testWord');
    });

    it('should create a newGame', (done) => {
      hangman.newGame()
        .then((hangman) => {
          hangman.id.should.equal('testId');
          hangman.hp.should.equal(10);
          hangman.state.should.equal('init');
          hangman.currentWordStr.should.equal('testWord');
          stubRequest.restore();
          done();
        })
        .catch(done);
    });

    it('should guess letter false', (done) => {
      hangman.newGame()
        .then(() => {
          stubRequest.restore();
          resp.data.attributes.hp = 10;
          resp.data.attributes.state = 'guessing';
          resp.data.attributes.currentWordStr = '***c**';
          stubRequest = sinon.stub(request,'Request').resolves(resp);
          return hangman.guess(hangman.nextLetter);
        })
        .then((hangman) => {
          hangman.id.should.equal('testId');
          hangman.hp.should.equal(10);
          hangman.state.should.equal('guessing');
          hangman.currentWordStr.should.equal('***c**');
          hangman.nextLetter.should.equal('a');
          done();
        })
        .catch(done);
    });

    it('should guess letter false', (done) => {
      hangman.newGame()
        .then(() => {
          stubRequest.restore();
          resp.data.attributes.hp = 9;
          resp.data.attributes.state = 'guessing';
          resp.data.attributes.currentWordStr = '***c**';
          stubRequest = sinon.stub(request,'Request').resolves(resp);
          return hangman.guess(hangman.nextLetter);
        })
        .then((hangman) => {
          hangman.id.should.equal('testId');
          hangman.hp.should.equal(9);
          hangman.state.should.equal('guessing');
          hangman.currentWordStr.should.equal('***c**');
          hangman.nextLetter.should.equal('a');
          done();
        })
        .catch(done);
    });

    it('should guessingWord', (done) => {
      hangman.newGame()
        .then(() => {
          stubRequest.restore();
          resp.data.attributes.hp = 10;
          resp.data.attributes.state = 'win';
          resp.data.attributes.currentWordStr = 'e';
          stubRequest = sinon.stub(request,'Request').resolves(resp);
          return hangman.guessingWord(hangman.nextLetter);
        })
        .then((hangman) => {
          hangman.id.should.equal('testId');
          hangman.hp.should.equal(10);
          hangman.state.should.equal('win');
          hangman.currentWordStr.should.equal('e');
          done();
        })
        .catch(done);
    });

    it('should play once game', (done) => {
      stubRequest.restore();
      resp.data.attributes.hp = 10;
      resp.data.attributes.state = 'win';
      resp.data.attributes.currentWordStr = 'e';
      stubRequest = sinon.stub(request,'Request').resolves(resp);
      Hangman.play({cookie: 'cookie'})
        .then((result) => {
          result.id.should.equal('testId');
          result.hp.should.equal(10);
          result.state.should.equal('win');
          done();
        })
        .catch(done);
    });

  });

});

