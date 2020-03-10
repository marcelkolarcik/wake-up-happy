// This script is released to the public domain and may be used, modified and
// distributed without restrictions. Attribution not necessary but appreciated.
// Source: https://weeknumber.net/how-to/javascript

// Returns the ISO week of the date.

//AS MY CALENDAR FOR BOOKING ROOM IS BY THE WEEKS, SO I RESEARCHED HOW TO GET CURRENT WEEK
// FROM Date OBJECT IN JS AND DISCOVERED FUNCTION BELLOW

Date.prototype.getWeek = function() {
	var date = new Date(this.getTime());
	date.setHours(0, 0, 0, 0);
	// Thursday in current week decides the year.
	date.setDate(date.getDate() + 3 - (date.getDay() + 6) % 7);
	// January 4 is always in week 1.
	var week1 = new Date(date.getFullYear(), 0, 4);
	// Adjust to Thursday in week 1 and count number of weeks from date to week1.
	return 1 + Math.round(((date.getTime() - week1.getTime()) / 86400000
		- 3 + (week1.getDay() + 6) % 7) / 7);
};

// Returns the four-digit year corresponding to the ISO week of the date.
Date.prototype.getWeekYear = function() {
	var date = new Date(this.getTime());
	date.setDate(date.getDate() + 3 - (date.getDay() + 6) % 7);
	return date.getFullYear();
};

var current_date = new Date();
var current_year = current_date.getFullYear();
var next_year   =current_year+1;
var weeks_till_end_of_year = [];
var next_year_weeks = [];

var current_week = current_date.getWeek();
var next_year_week = 0;

// CALCULATING WEEKS FOR THE NEXT YEAR TO HAVE FULL 53 WEEKS DISPLAYED
// EXAMPLE: IF CURRENT WEEK IS 13th WEEK OF THE YEAR => NEXT YEAR WEEKS WILL BE [1,2,3,4,5,6,7,8,9,10,11,12]
if(current_week > next_year_week)
{
	while ( current_week > next_year_week ) {
		next_year_weeks.push( next_year_week + 1 );
		next_year_week++;
	}
}
// CALCULATING WEEKS FOR THE CURRENT YEAR
while (current_week < 53) {
	weeks_till_end_of_year.push( current_week + 1 );
	current_week++;
}





