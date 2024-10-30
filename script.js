const {By, Builder, Browser} = require('selenium-webdriver');
const assert = require('assert');
const moment = require('moment');
const nodemailer = require('nodemailer');
require('dotenv').config();

const username = process.env.USERNAME;
const password = process.env.PASSWORD;
const email = process.env.EMAIL;

async function sleep(timeOut = 500) {
    return new Promise(resolve => setTimeout(resolve, timeOut));
}

async function sendMail(type='start') {
    let currentTime = moment().format('YYYY/MM/DD h:mm:ss a');
    let transporter = nodemailer.createTransport({
        host: 'smtp.jaist.ac.jp',
        port: 587,
        secure: false,
        auth: {
            user: username,
            pass: password
        }
    });
    let mailOptions = {
        from: email,
        to: email,
        subject: (type == "start" ? "Started working at " : "Ended working at ") + currentTime,
    }
    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        }
    });
};

 async function timeScript(type='start') {
    let driver;
    try {
        // access the login page
        driver = await new Builder().forBrowser(Browser.CHROME).build();
        await driver.get("https://syugyo-new.jaist.ac.jp/package/auth/view/Login.html");
        await sleep();
        
        // try to login
        await driver.manage().setTimeouts({implicit: 1000});
        let accountBox = await driver.findElement(By.id('txtAccount'));
        let passwordBox = await driver.findElement(By.id('txtPassword'));
        let submitBtn = await driver.findElement(By.id('fm:idLoginButton'));
        await accountBox.sendKeys(username);
        await passwordBox.sendKeys(password);
        await submitBtn.click();
        await sleep();
    
        // navigate to the start/end stamping page
        await driver.findElement(By.css('.PS_siteLink > a')).click();
        const iframe = await driver.findElement(By.css('body iframe#V3iFrame'));
        await driver.switchTo().frame(iframe);
        // click on start working button
        if (type == "start") {
            let startWorkBtn = await driver.findElement(By.css('#timeOpenButton > input'));
            let value = await startWorkBtn.getAttribute("value");
            assert.equal("始業打刻", value);
            await startWorkBtn.click();
            await sleep();
            await sendMail(type);
            console.log("Started working at " + moment().format('YYYY/MM/DD h:mm:ss a'));
        }
        // click on end working button
        if (type == "end") {
            let startWorkBtn = await driver.findElement(By.css('#timeCloseButton > input'));
            let value = await startWorkBtn.getAttribute("value");
            assert.equal("終業打刻", value);
            await startWorkBtn.click();
            await sleep();
            await sendMail(type);
            console.log("Ended working at " + moment().format('YYYY/MM/DD h:mm:ss a'));
        }
    } catch (e) {
        console.log(e);
    } finally {
        await driver.quit();
    }
}

function getDay() {
    return parseInt(moment().format("D"));
}
function getMonth() {
    return parseInt(moment().format("M"));
}

function isWeekend() {
    return parseInt(moment().format("d")) % 6 == 0;
}

module.exports =  { timeScript, getDay, getMonth, isWeekend };