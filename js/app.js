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
