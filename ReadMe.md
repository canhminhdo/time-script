# Script for the Time Stamping System
Running a script for the time stamping system automatically on every weekday except for holidays as follows:
- start working at 8:15
- end working at 17:20

## Requirements
- nodejs
- npm

## How to install

1. Install dependencies

    `npm install`

2. Set your configuration to access to the time management system

- copy the `.env-temp` file to a new file with the name `.env`

    `cp .env-temp .env`

- change the following information in the `.env` file
    - `USERNAME`
    - `PASSWORD`
    - `EMAIL` - to send a notification to the email whenever the start/end of working

3. Set up holidays without the stamp in the `index.js` file

4. Running the script

    `npm start`