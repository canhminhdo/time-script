const cron = require('node-cron');
const express = require('express');
const { timeScript, getDay, getMonth, isWeekend } = require("./script.js");

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

// Stamp start working at 8:15:00 everyday
cron.schedule("00 15 8 * * *", function() {
    if (!isWeekend() && !holidays[getMonth()].includes(getDay())) {
        timeScript("start");
    }
});

// Stamp end working at 17:20:00 everyday
cron.schedule("00 20 17 * * *", function() {
    if (!isWeekend() && !holidays[getMonth()].includes(getDay())) {
        timeScript("end");
    }
});

console.log("<--- RUNNING SCRIPT FOR THE TIME STAMPING SYSTEM --->")
app.listen(3000);
