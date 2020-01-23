/* Validate user input for numberic values

@param {string} input
User input for an integer value to be validated

@returns {string|true}
String describing failure, or true if valid
*/

function validateNumber(input) {
    if (!input.match(/^[0-9]+$/)) {
        return "Input must be an integer";
    } else {
        return true;
    }
}

/*
Validate user input for email address

@param {string} input
User input for an email address to be validated

@returns {string|true}
String describing failure, or true if valid
*/

function validateEmail(input) {
    if (!input.match(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i)) {
        return "Please enter a valid email address";
    } else {
        return true;
    }
}

/* Validate User input for Github profile name

@param {string} input
User input for a github profile name to be validated

@returns {string|true}
String describing failure, or true if valid
*/
function validateGithub(input) {
    if (!input.match(/^[A-Z0-9_]{3,}$/i)) {
        return "Input must be a valid Github name";
    }
    return true;
}

/* Validate user input for employee name

@param {string} input
User input for employee name to be validated

@returns {string|true}
String describing failure, or true if valid
 */

function validateName(input) {
    if (!input.match(/^[A-Z][A-Z]{0,}$/i)) {
        return "Name must contain at least 1 character and no invalid characters";
    } else {
        return true;
    }
}

module.exports = {
    int: validateNumber,
    email: validateEmail,
    github: validateGithub,
    name: validateName
};