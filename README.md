# Snippet

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## Description

Snippet is a full-stack app that uses AI to analyze and explain code.  Create a user login to use all features, or simply visit the home page and search via language, title, or author.
This app uses Mongoose, Express.JS, React, Apollo, GraphQL, Langchain, and Node.JS.

## Table of Contents


* [Installation](#Installation)
* [Usage](#Usage)
* [License](#License)
* [Contributing](#Contributing)
* [Tests](#Tests)
* [Questions](#Questions)
 

## <a name="Installation"></a>Installation

This app requires [Node.JS](https://nodejs.org/en/download).  To install locally: run `npm i` to install dependencies and then `npm run build` to build dist folders. To seed data, run `cd server && npm run seed`.

## <a name="Usage"></a>Usage

Follow this link to the [Deployed App](https://snippet-vzjo.onrender.com/)

Login to use all features.  Search for snippets by title, language, or author.  Or create your own.  AI will analyze the code and create a title and summary.  Now all of your code snippets are in one place!!

to run locally:  After installing dependencies and building the dist folders, create a .env file in the server folder.  You need MONGODB_URI, JWT_SECRET_KEY, and OPENAI_API_KEY environment variables.  Then run `npm run start:dev` from the root folder.  The site will be served at http://localhost:3000.  To use GraphQL sandbox, visit http://localhost:3001/graphql.

## <a name="license"></a>License

  [MIT](https://opensource.org/licenses/MIT)

## <a name="contributing"></a>Contributing

Contributors:

* [Ray Hamo](https://github.com/rayhamo98)
* [Matt McGarry](https://github.com/mmcgarry13)
* [Janessa Clark](https://github.com/jclark-bcamp)
* [Isaiah Hansen](https://github.com/KeelerZoroth)
* [Josh Hensley](https://github.com/josh-hensley)


If you wish to contribute, please follow these [guidelines](https://www.contributor-covenant.org/version/2/1/code_of_conduct/).

## <a name="questions"></a>Questions

If you have questions you can reach me at me@joshhensley.com. Add me on [Github](github.com/josh-hensley).
