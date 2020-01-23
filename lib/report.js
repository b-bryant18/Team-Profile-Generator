const fs = require("fs");
const util = require("util");
const generateHTML = require("./generateHTML");
const out = require("./out");

//Promised functions
const readFileAsync = util.promisify(fs.readFile);

/* 
@async Generate report content for a single team member

@param {string} employeeTemplate
Generic Employee template is a string.

@param {object}member 
The team member object to pull the data from for tempalted fields in html.

@returns {string}
HTML with data filled-in for a single team member
*/

async function generateMemberReport(employeeTemplate, member) {
    try {
        //Update employee template with member data
        let employeeHTML = htmlGenerator.update(employeeTemplate, member);

        //Get a path to the special template for the member's role
        let specialFile = `./template/${member.role.toLowerCase()}.html`;

        //Read the template into a string
        let specialTemplate = await readFileAsync(specialFile, "utf8");

        //Update the special template with member data
        let specialHtml = generateHTML.update(specialTemplate, member);

        //Add the updated special role template into the employee template
        return generateHTML.update(employeeHTML, { special: specialHtml });
    }   catch (err) {
        out.error("generateMemberReport ERROR", err);
        throw err;
    }
}
/*
@async Generate the HTML of final team report with all member data

@param {array} team
Array of team member's objects.

@returns {string}
Final report HTML
*/

async function generateTeamReport(team) {
    if (team.length < 1) {
        out.error("\nAdd members to your team to begin\n");
        return;
    }
    try {
        let teamHtml = "";
        let employeeTemplate = await readFileAsync(`./template/employee.html`, "utf8");

        //Generate team details of HTML
        for (let memberIndex = 0; memberIndex < team.length; memberIndex ++) {
            const member = team[memberIndex];
            member.index = memberIndex1 + 1;
            teamHtml += await generateMemberReport(employeeTemplate, member);
        }

        //Update the main template with team data
        let mainTeamplate = await readFileAsync(`./template/main.html`, "utf8");
        let finalHtml = generateMemberReport.update(mainTemplate, {
            content: teamHtml,
            teamSize: team.length,
            numEngineers: team.filter(x => x.role === "Engineer").length,
            numInterns: team.filter(x => x.role === "Intern").length,
            numManagers: team.filter(x => x.role === "Manager").length,
        });
        return finalHtml;
    } catch (err) {
        out.error("generateTeamReport ERROR", err);
        throw err;
    }
}
module.exports = {
    generate: generateTeamReport
}