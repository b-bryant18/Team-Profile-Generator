const inquirer = require("inquirer");
const Engineer = require("./lib/engineer");
const Intern = require("./lib/intern");
const Manager = require("./lib/manager");
const validate = require("./lib/validate");
const out = require("./lib/out");
const report = require("./lib/report");

// Input commands
const ADD_MEMBER_STR = "Add Member";
const GENERATE_REPORT_STR = "Generate Report";
const QUIT_STR = "Quit";

//Main Menu
const shellPrompt = [
    {
        type: "list",
        message: "What would you like to do?",
        name: "cmd",
        choices: [ADD_MEMBER_STR, GENERATE_REPORT_STR, QUIT_STR]
    }
];

//Questions for ALL employees
const employeePrompt = [
    {
        type: "list",
        message: "Select an employee type",
        name: "role",
        choices: ["Engineer", "Intern"]
    },
    {
        type: "input",
        message: "Employee Name",
        name: "name",
        validate: validate.name
    },
    {
        type: "input",
        message: "Employee ID",
        name: "id",
        validate: validate.int
    },
    {
        type: "input",
        message: "Employee Email",
        name: "email",
        validate: validate.email
    },
];

//Manager Prompt (Skips employee role question)
const managerPrompt = employeePrompt.slice(1);

//Specify role
const specialRoles = {
    Engineer: {
        role: "Engineer",
        special: "Github Name",
        field: "github",
        validate: validate.github
    },
    Manager: {
        role: "Manager",
        special: "Office Number",
        filed: "officerNumber",
        validate: validate.int
    },
    Intern: {
        role: "Intern",
        special: "School",
        field: "school"
    }
};

function getSpecialRoleQuestion(role) {
    const specialRole = specialRoles[role];
    const msg = specialRole.special;
    const name = specialRole.field;
    const val = specialRole.validate;
    return [
        {
            type: "input",
            message: msg,
            name: name,
            validate: val
        }
    ];
}


async function getEmployeeInfo(isManager) {
    //Select the prompts to use based on whether or not user is a manager
    let initialPrompt = isManager ? managerPrompt : employeePrompt;

    if (isManager) {
        out.heading("\n Project Manager Details \n");
    }

    try {
        const responses = await inquirer.prompt(initialPrompt);
        //No prompt for role if user is a manager
        if (isManager) {
            responses.role = "Manager";
        }

        // Get the special question for that specific role
        const questionsSpecial = getSpecialRoleQuestion(responses.role);
        const specialResponse = await inquirer.prompt(questionsSpecial);

        //Save the special role with the employee questions
        const specialRole = Object.keys(specialResponse)[0];
        //Add the special response to our initial responses object
        responses[specialRole] = specialResponse[specialRole];
        return responses;
    } catch (err) {
        out.error("getEmployeeInfo Error", err);
        throw err;
    }
}

/* Create and return a new team member object

@param input
User Input response object with Employee Info responses

@returns a new Employee object(Engineer, Intern, or Manager)

*/
function createTeamMember(input) {
    let employee;

    switch(input.role) {
        case "Engineer":
        employee = new Engineer(input.name, input.id, input.email, input.github);
        break;
            case "Intern":
        employee = new Intern(input.name, input.id, input.email, input.school);
        break;
                case "Manager":
        employee = new Manager(
            input.name,
            input.id,
            input.email,
            input.officeNumber
        );
        break;
                    default:
        out.error(\"nUnknown Employee Role\n");
        break;
    }
    return employee;
}

/*
@async Add a team member to team array

@param team
Team member object array

@param isManager
true if adding a Manager, false otherwise
*/

async function addTeamMember(team, isManager) {
    try {
        //Prompt the user for employee info
        const employeeData = await getEmployeeInfo(isManager);
        //Create an object to represent the employee
        const employee = createTeamMember(employeeData);
        //Add the new object to team array
        team.push(employee);
        out.success("\nTeam Member Added\n");
    } catch (err) {
        out.error("addMember ERROR", err);
        throw err;
    }
}
/*
@async Initialize the application and run it. Generate a series of prompts to allow the user to construct a team and then generate an HTML report of the team */

//function init means initialize. It creates a new object.
async function init() {
    const team = []; //Array to store team members
    let res; //hold the user responses
    let exitWhile = false; //Flag to tell us when to exit

    try {
        //Start the main loop
        out.debug("\nStarting the shell\n");

        //Get Manager details
        await addTeamMember(team, true);

        do {
            //Prompt the user and save responses
            res = await inquirer.prompt(shellPrompt);

            //Check which command was entered
            switch (res.cmd) {
                //cmd = Add a New Team Member
                case ADD_MEMBER_STR:
                    await addTeamMember(team, false);
                    break;

                //cmd = Generate a Report
                case GENERATE_REPORT_STR;
                    await report.generate(team);
                    break;

                //cmd = Quit
                case QUIT_STR:
                    exitWhile = true; //Break the while
                    break;

                //cmd = unknown comman (Should not happen)
                default:
                    out.error("\nUnkown Command\n");
                    break;
            }

            //Remain in this loop until the user tells us to quit
        } while (!exitWhile);
        //Out of main loop - exit
        out.debug("\nEnding the shell\n");
    } catch (err) {
        //Error log
        out.error("Error", err);
    }
}

//Run program
init();

////////////////
//Make a function to create a manager,
//Function that creates a team
// Function that adds an engineer 
//Function that adds an intern
//Function that builds a team
//make a function called app and put all of these other functions within that
//Make create manager function 1st