
# E-Commerce React SPA

This is a single page application for a theoretical E-commerce business that is looked to re-vamp their online presence. Data is retrieved from a black-box API - Atelier.
## Authors

- [@JPBustamante](https://github.com/jpbust)
- [@NicolasLedam](https://github.com/Ledan-bot)
- [@SantiagoVeraNicola](https://github.com/sveranicola)

## Screenshots

![App Screenshot1](https://res.cloudinary.com/jpbust/image/upload/v1633102232/Screen_Shot_2021-10-01_at_10.27.49_qzckfh.jpg)

![App Screenshot2](https://res.cloudinary.com/jpbust/image/upload/v1633102506/Screen_Shot_2021-10-01_at_10.34.57_qbiixi.jpg)

![App Screenshot3](https://res.cloudinary.com/jpbust/image/upload/v1633102232/Screen_Shot_2021-10-01_at_10.28.06_l4xxiv.jpg)


## Installation

Clone repo down onto your local computer. Cd into the location where the repository is located. Once in the repo, run

```bash
  npm install
```
Once npm is installed, we must then build our webpack file -> bundle.js

```bash
  npm run build
  npm run watch
```

After the webpack file has been compiled -> open a server upon a locally hosted port by running

```bash
  npm start
```

This command will utilize nodemon. After running this command "listening on port x" * default port 3737 * should appear within the terminal.
Navigate to the local-host port to open this application in a web browser.
## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`API_KEY` <- Insert Github API token

An example config file is located in /Client/src/env/example-config.js. Please create a new config.js file following the set-up in example-config.js

## Acknowledgements

 - [MommentsJS](https://momentjs.com/)
 - [React](https://reactjs.org/docs/getting-started.html)
 - [MDN](https://developer.mozilla.org/en-US/)
 - [Great Read me](https://readme.so/)
 - [Babel](https://babeljs.io/)
 - [NodeJs](https://nodejs.org/en/)
 - [Express](https://expressjs.com/)

## Feedback

If you have any feedback, please reach out to us at sveranicola12@gmail.com
