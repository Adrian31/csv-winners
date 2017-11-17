/*********** INSTRUCTIONS **********/
/*Develop a program in a language of your choice to generate and select winners from a CSV file.
It should be callable from a shell/command line with no GUI required.
Track all of your changes and progress via git.
You may use any relevant third-party packages/libraries. Ideally the program should only rely on libraries from the same programming language/environment.

1. Create a script to generate and save a CSV file of 100 entries, with the following columns: name, email, creation_date
	- creation_date should be a random date between now and 2 months ago
	- Make name have a 10% chance of being blank
2. Create a script to select 5 “winners” from the CSV, matching the following criteria:
	- Exclude rows with no name
	- Exclude rows with a creation date within the last week
	- Winners must be unique - a row should not be selected twice
3. Generate a second spreadsheet, and allow your winner selection script to take multiple CSVs as input.
4. Update the criteria to only allow for a single winner per week.
5. Review and refactor your code if any improvements can be made.
*/
//Allows user to get the week in the year from a date.
Date.prototype.getWeek = function() {
    return $.datepicker.iso8601Week(this);
}

var model = {
    people: [
        //Example of format
        /*{
          name: chance.name(),
          email: chance.email(),
          creation_date: yourRandomGenerator(-60),
          winner: "no"
        },*/
    ],

    people2: [
        //Example of format
        /*{
          name: chance.name(),
          email: chance.email(),
          creation_date: yourRandomGenerator(-60),
          winner: "no"
        },*/
    ]
};

//Function to generate a random date.
var yourRandomGenerator = function(rangeOfDays) {
    var today = new Date(Date.now());
    return new Date(today.getYear() + 1900, today.getMonth(), today.getDate() + Math.random() * rangeOfDays);
}

//This can be used to generate a person with the requirements.
var person = function(name, email, creation_date, winner) {
    //This makes person have a 1 in 10 chance of having a blank name
    var num = Math.floor(Math.random() * 10) + 1;
    if (num == 1) {
        this.name = "";
    } else {
        this.name = chance.name();
    }
    this.email = chance.email();
    //Gets a random date between now and two months ago.
    this.creation_date = yourRandomGenerator(-60);
    this.winner = "no";
}

//Create 100 people using person function
var personGenerator = function() {
    var n = 100;
    for (var i = 1; i < n; i++) {
        model.people.push(new person());
        model.people2.push(new person());
    }
}
personGenerator();

//This function takes data and checks it over to pick 5 winners
var listNumber = 0;
var winners = function(data) {
    var d = new Date();
    d.setDate(d.getDate());
    console.log("The current week of the year is " + d.getWeek());
    listNumber++;
    var creationWeek = [0, 0, 0, 0];
    var count = 0;
    var winningNumber = 5;
    console.log("********** " + "Winners from list number " + listNumber + " **********");
    while (count < 5) {
        for (var i = 0; i <= 98; i++) {
            var randomNumber = Math.floor(Math.random() * 100) + 1;
            var weekNumber = data[i].creation_date.getWeek();
            if ( //If the number matches, a winner is declared
                (randomNumber == winningNumber) &&
                //Checks to see if a person is already a winner
                (data[i].winner !== "winner") &&
                //Checks to see if name is blank
                (data[i].name != "") &&
                //Checks if winner has a creation date within the last week
                (weekNumber < d.getWeek()) &&
                //Checks to see if there are 5 winners already
                (count != 5) &&
                //This block checks if a creation week has already been taken.
                //There is a better way to do this I'm sure but I haven't thought of it yet.
                //I will come back to this when I think of a better solution.
                (weekNumber != creationWeek[0]) &&
                (weekNumber != creationWeek[1]) &&
                (weekNumber != creationWeek[2]) &&
                (weekNumber != creationWeek[3]) &&
                (weekNumber != creationWeek[4])) {
                //When a winner is found, the number of winners count goes up
                count++;
                creationWeek.unshift(data[i].creation_date.getWeek());
                //Declare the person as a winner.
                data[i].winner = "winner";
                //Log the winner to the console.
                console.log(data[i].name + "is a " + data[i].winner);
            }
        }
    }
    console.log("The winners weeks of creation are " + creationWeek);
}

//Run these arrays through the winners function.
winners(model.people);
winners(model.people2);

/********** Convert to CSV and Download **********/
// https://halistechnology.com/2015/05/28/use-javascript-to-export-your-data-as-csv/
function convertArrayOfObjectsToCSV(args) {
    var result, ctr, keys, columnDelimiter, lineDelimiter, data;

    data = args.data || null;
    if (data == null || !data.length) {
        return null;
    }

    columnDelimiter = args.columnDelimiter || ',';
    lineDelimiter = args.lineDelimiter || '\n';

    keys = Object.keys(data[0]);

    result = '';
    result += keys.join(columnDelimiter);
    result += lineDelimiter;

    data.forEach(function(item) {
        ctr = 0;
        keys.forEach(function(key) {
            if (ctr > 0) result += columnDelimiter;

            result += item[key];
            ctr++;
        });
        result += lineDelimiter;
    });

    return result;
}

function downloadCSV(data) {
    var filename, link;
    var csv = convertArrayOfObjectsToCSV({
        data
    });
    if (csv == null)
        return;

    filename = 'file.csv';

    var blob = new Blob([csv], {
        type: "text/csv;charset=utf-8;"
    });

    if (navigator.msSaveBlob) { // IE 10+
        navigator.msSaveBlob(blob, filename)
    } else {
        var link = document.createElement("a");
        if (link.download !== undefined) {

            // feature detection, Browsers that support HTML5 download attribute
            var url = URL.createObjectURL(blob);
            link.setAttribute("href", url);
            link.setAttribute("download", filename);
            link.style = "visibility:hidden";
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }
    }
}
downloadCSV(model.people);
downloadCSV(model.people2);
