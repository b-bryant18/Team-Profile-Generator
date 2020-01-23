// const fs = require("fs");
// const path = require("path");

// const templatesDirectory = path.resolve(__dirname,'../Templates');

// const render = (employees)=>{
//     const html = [];

// html.push(employees.filter(employee => employee.getRole() === 'manager').map(mEmployee => renderManager))
// }


/* @param {Object} obj
* An object to get all methods from
*
* @returns {array}
* Array of method names
*/

//Get methods associated with oject
function getMethods(obj) {
    let methods = [];
    let currentObj = obj;

    do {
        Object.getOwnPropertyNames(currentObj)
        .filter(i => i !== "constructor")
        .filter(i => typeof currentObj[i] === "function")
        .map(i => methods.push(i));

        //Set current Object to the protoype
        currentObj = Object.getPrototypeOf(currentObj);

        //Break the loop if the new current object's prototype is null
    } while (Object.getPrototypeOf(currentObj));

    return methods;
}


/*
Update HTML template file with fields in the data object

@param {string} html
HTML template as a string

@param {object} obj
data object used to fill the templated fields

@returns {string} 
Updated HTML string with data fields subsituted in for templated fields
* No support for methods w/ arguments yet
Ex.
A templated field for obj.name would be {{name}}
A templated field for obj.getName() would be {{getName() }}
*/

function updateTemplate(html, obj) {
    let result = html;

    //Replace Methods - get a list of methods on the object and prototypes
    const methods = getMethods(obj);
    for (let key of methods) {
        let re = new RegExp(`{{ ${key}\\(\\)}}`, "g");
        result = result.replace (re, obj[key]());
    }

    for (let key in obj) {
        if (typeof obj[key] === "function") {
            continue;
        } //skip methods
        //Use regex to replace {{ key }} with data[key] (global search)
        const re = new RegExp(`{{ (${key}) }}`, "g");
        result = result.replace(re, obj[key]);
    }
    return result;
}
module.exports = {
    update: updateTemplate
};
