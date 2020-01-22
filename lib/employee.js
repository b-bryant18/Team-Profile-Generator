class Employee {
    constructor(name, id, Email) {
        this.name = name;
        this.id = id;
        this.Email = Email;
    }
    getName() {
        return this.name;
    }
    getId() {
        return this.id;
    }
    getRole() {
        return "employee";
    }
}
module.exports = Employee;


//Goes in app.js
// inquirer
//     .prompt([
//         {
//             type: "input",
//             message: "What is your name?",
//             name: "name"
//         },
//         {
//             type: "input",
//             message: "What is your email address?",
//             name: "Email"
//         },
//         {
//             type: "input",
//             message: "What is your employee ID number?",
//             name: "Id"
//         },
//     ])
//     .then (function (response) {
// // Put user responses into proper html files
    // });