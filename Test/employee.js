const fs = require("fs");
const inquirer = require("inquirer");
console.log(name, Id, email);

fs.appendFile("main.html", function (err) {
    // Do I need to include process.argv (after main.html) to ask names?
    if (err) {
        return console.log(err)
    } console.log("Success");
});

class Employee {
    default(name, Id, email) { 
        this.name = ${ 'name' };
        this.id = ${ 'Id' };
        this.email = ${ 'email' };
}};

const engineer = new Employee();
const intern = new Employee();
const manager =  new Employee();

getName(Employee) {
    return ${this.name}
}

getId(Employee) {
    return ${this.Id }
}

getEmail(Employee) {
    return ${ this.email }
}

getRole(Employee) {
    return ('Employee')
}

inquirer
    .prompt([
        {
            type: "input",
            message: "What is your name?",
            name: "name"
        },
        {
            type: "input",
            message: "What is your email address?",
            name: "Email"
        },
        {
            type: "input",
            message: "What is your employee ID number?",
            name: "Id"
        },
    ])
    .then (function (response) {
// Put user responses into proper html files
    });