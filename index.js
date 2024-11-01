const cron = require('node-cron');
const express = require('express');
const { timeScript, getDay, getMonth, isWeekend, sleep, getRandomInt } = require("./script.js");

let app = express();

// holidays in a year
const holidays = {
    1: [],
    2: [],
    3: [],
    4: [],
    5: [],
    6: [],
    7: [],
    8: [],
    9: [],
    10: [],
    11: [3, 4, 15, 23],
    12: [21, 24, 31],
};

// Stamp start working at between 8:10 ~ 8:20 everyday
cron.schedule("00 10 8 * * *", function() {
    if (!isWeekend() && !holidays[getMonth()].includes(getDay())) {
        waitTime = async () => {
            let timeout = getRandomInt(10) * 1000;
            await sleep(timeout);
        }
        waitTime();
        timeScript("start");
    }
});

// Stamp end working between 17:16 ~ 17:20 everyday
cron.schedule("00 16 17 * * *", function() {
    if (!isWeekend() && !holidays[getMonth()].includes(getDay())) {
        waitTime = async () => {
            let timeout = getRandomInt(5) * 1000;
            await sleep(timeout);
        }
        waitTime();
        timeScript("end");
    }
});

console.log("<--- RUNNING SCRIPT FOR THE TIME STAMPING SYSTEM --->")
app.listen(3000);
