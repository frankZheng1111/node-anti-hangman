'use strict'
const ENV = process.env.NODE_ENV || 'dev'

export const logger = require('../../config/logger.json');
export const user = require('../../config/user.json')[ENV];
export const hangman = require('../../config/hangmanServer.json')[ENV];
