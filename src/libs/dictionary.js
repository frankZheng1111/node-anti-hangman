'use strict';
import fs from 'fs';

// 初始化词频表
//
export function initDictionary() {
  let dictionary = [];
  dictionary = fs.readFileSync('config/dictionary.txt').toString().split('\n');
  return dictionary.map((word) => {
    return word.toLowerCase().split('');
  });
}

export function filterDictionary(currentDictionary, wordStr, falseLetter = '') {
  let resultDictionary = [];
  let trueLetters = wordStr.replace(/\*/g, '').split('');
  currentDictionary.forEach((wordArray) => {
    // 滤除长度不同的
    if (wordStr.length !== wordArray.length) { return false; }
    // 滤除包含猜错字符的
    if (wordArray.includes(falseLetter)) { return false; }
    for(let i = 0 ; i < wordArray.length ; i++) {
      if( trueLetters.includes(wordArray[i]) && wordStr.split('')[i] !== wordArray[i]) { return false; }
      if( wordStr.split('')[i] !== '*' && wordStr.split('')[i] !== wordArray[i]) { return false; }
    }
    resultDictionary.push(wordArray);
  });
  return resultDictionary;
}

export function getMostLetter(currentDictionary, wordStr = '') {
  let lettersNums = {};
  currentDictionary.forEach((wordArray) => {
    wordArray.forEach((letter) => {
      if(!lettersNums[letter]) { lettersNums[letter] = 0; }
      if(!wordStr.split('').includes(letter)) { lettersNums[letter]++; }
    });
  });
  let mostLetter = '';
  let mostLetterNum = 0;
  for(let letter in lettersNums) {
    if (mostLetterNum < lettersNums[letter]) {
      mostLetter = letter;
      mostLetterNum = lettersNums[letter];
    }
  }
  return mostLetter;
}
