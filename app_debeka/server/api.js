'use strict;'
const DEBUG = true;

if (!process.env.NODE_URL) {
    throw new Error("process.env.NODE_URL not set")
}

if (!process.env.PW) {
    throw new Error("process.env.PW not set")
}

const Blockchain = require("./Blockchain.js");
const blockchain = new Blockchain(process.env.NODE_URL, process.env.PW);

const PERIOD_LENGTH = 120000;
const DISTANCE_PER_PERIOD = 10;
const REWARD_IN_ETHER_PER_PERIOD = 0.001;

let start_Time;
let distance_In_Current_Period;

/* ############## exposed function */

module.exports = function init(_user_Account) {
    connect(process.env.NODE_URL, process.env.PW);
    blockchain.set_User_Account(_user_Account);
}

module.exports = function sende_Bewegungsdaten(_data) {

    if (distance_In_Current_Period > DISTANCE_PER_PERIOD || DEBUG) {
        blockchain.send_Ether(REWARD_IN_ETHER_PER_PERIOD)
    } else {
        distance_In_Current_Period += _data.distance;
    }
}

/* ############## internal functions */

setInterval(reset, PERIOD_LENGTH);

function reset() {
    distance_In_Current_Period = 0;
}