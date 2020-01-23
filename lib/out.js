const chalk = require("chalk");
const debug = process.argv[2] === "debug";

/*
Debug output will appear if debug flag is enabled

@param {any[]} str
what to display
*/

function debugOut(...str) {
    if (debug) {
        console.log(chalk.grey(...str));
    }
}

/*
Error output. Add formatting to error messages

@param {any[]} str
what to display
*/

function errorOut(...str) {
    console.log(chalk.bold.red(...str));
}

/*

Success output. Add formatting to output messages

@param {any[]} str
what to display
*/

function successOut(...str) {
    console.log(chalk.bold.green(...str));
}

/*

Heading output. Green background with black text

@param {any[]} str
what to display
*/

function headingOut(...str) {
    console.log(chalk.bgGreen,black(...str));
}

module.exports = {
    error: errorOut,
    debug: debugOut,
    success: successOut,
    heading: headingOut
  };