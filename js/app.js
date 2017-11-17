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
var yourRandomGenerator = function(rangeOfDays){
    var today = new Date(Date.now());
    return new Date(today.getYear()+1900,today.getMonth(), today.getDate()+Math.random() *rangeOfDays);
}

//This can be used to generate a person with the requirements.
var person = function(name, email, creation_date,winner) {
  var num = Math.floor(Math.random() * 10) + 1;
  if( num == 1){
    this.name = "";
  }else {
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
  for (var i = 1; i < n; i++){
      model.people.push(new person());
      model.people2.push(new person());
  }
}
personGenerator();

/********** Convert to CSV and Download **********/
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
function downloadCSV(args, data) {
    var filename, link;

    var csv = convertArrayOfObjectsToCSV({
        data
    });
    if (csv == null) return;

    filename = args.filename || 'export.csv';

    if (!csv.match(/^data:text\/csv/i)) {
        csv = 'data:text/csv;charset=utf-8,' + csv;
    }
    data = encodeURI(csv);

    link = document.createElement('a');
    link.setAttribute('href', data);
    link.setAttribute('download', filename);
    link.click();
}

downloadCSV(model, model.people);
downloadCSV(model, model.people2);
