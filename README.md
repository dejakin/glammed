# Glammed

A social network for beauticians to be used by member of the Southampton University beauty society, 
to connect with students and potential customers within the Southampton area.
---
## Requirements

To run this project, you will only need Node.js and a node global package manager, npm, installed in your environement.

### Node
- #### Node installation on all operating systems

  Just go on [official Node.js website](https://nodejs.org/) and download the installer.
---

## Install

    $ git clone https://github.com/dejakin/glammed
    $ cd glammed

## Amend config/default.json file with the following:

{
  "mongoURI": "<your_mongoDB_Atlas_uri_with_credentials>",
  "jwtSecret": "secret",
  "githubToken": "<yoursecrectaccesstoken>"
}

## Install server dependencies 

    $ npm install

## Install client dependencies

    $ cd client
    $ npm install

The 'npm install' commands will be used to install all of the dependencies required by the server and client, as defined in the two package.json files.

## Running the project (from root) 

    $ npm run dev (both Express and React servers are run simutaneously. Possible through dev-dependency 'concurrently')
