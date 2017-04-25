'use strict';
import { should as _should } from 'chai';
// import sinon from 'sinon';
import Hangman from '../../src/models/hangman.js';

// eslint-disable-next-line
const should = _should();

describe('Test Hangman class', () => {
  it('should new hangman and constructor should be run', () => {
    let hangman = new Hangman('cookie', 'k');
    hangman.cookie.should.equal('cookie');
    hangman.nextLetter.should.equal('k');
  });
});


