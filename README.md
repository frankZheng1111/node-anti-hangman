# node-anti-hangman

Just for practice：A simple script for play [hangman web](https://github.com/frankZheng1111/hangman-web)  game based on nodejs

## Environment

1. node 6.0.0

## How to play

1. Install package

  ```
  npm install
  ```
2. set user name and password in [config/user.json](config/user.json)
  
  ```json
  {
    "dev": {
      "name": "REPLACE YOUR NAME",
      "password": "RELACE YOUR PASSWORD"
    }
  }
  ```
  
3. Build game

  ```
  npm run build
  ```

4. Start game
 
  ```
  npm run start-game
  ```
  
## How to test

  ```
  npm test
  ```
