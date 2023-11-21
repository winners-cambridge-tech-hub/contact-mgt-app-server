const cron = require("node-cron");
const process = require("process");
const fs = require("fs");
const os = require("os");
const nodemailer = require("nodemailer");

cron.schedule("*/3 * * * * *", function () {
    mailService();
});

function logSystemStatus() {
    let heap = process.memoryUsage().heapUsed / 1024 / 1024;
    let date = new Date().toISOString();
    const freeMemory = Math.round((os.freemem() * 100) / os.totalmem()) + "%";

    //date | heap used | free memory
    let csv = `${date}, ${heap}, ${freeMemory}\n`;

    // storing log In .csv file
    fs.appendFile("demo.csv", csv, function (err) {
        if (err) throw err;
        console.log("server details logged!");
    });
}

function mailService() {
    let mailTransporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: "abayomi@sprintell.org",
            pass: "googleDotCom1$#+",
        },
    });

    // setting credentials
    let mailDetails = {
        from: "abayomi@sprintell.org",
        to: "sprintellglobal@yahoo.com",
        subject: "Test Mail using Cron Job",
        text: "Node.js Cron Job Email Demo Test from Reflectoring Blog",
    };

    // sending email
    mailTransporter.sendMail(mailDetails, function (err, data) {
        if (err) {
            console.log("error occurred", err.message);
        } else {
            console.log("---------------------");
            console.log("email sent successfully");
        }
    });
}
