# moment-calendar-2
[![npm version](https://badge.fury.io/js/moment-calendar-2.svg)](http://badge.fury.io/js/moment-calendar-2)

A Node module to create month calendar where each date is a moment date.

This [`Demo`](https://vinhnghi223.github.io/moment-calendar-2/) demonstrates how to use moment-calendar-2 together with angular to build a date picker component.


## Getting Started

NPM install moment-calendar 2

```
    npm install moment-calendar-2
```

Include the script in your html:

    <script src="node_modules/moment-calendar-2/dist/moment-calendar-2.js"></script>

You can also include 'moment-calendar-2' by using 'require':

    var MomentCalendarFactory = require('./node_modules/moment-calendar-2/dist/moment-calendar-2');

In your JS, use 'moment-calendar' like so:

```
   var calendar = MomentCalendarFactory.getInstance();
   calendar.getWeeksTable();
```


## API

Calling MomentCalendarFactory.getInstance(); will return an instance of momentCalendar of which methods are as following:

| Methods             | Arguments                                         | Description                                                                                                                                                                                                                                                                                                                                                                          |
|---------------------|---------------------------------------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| setCurrentDate      | a date (eg. '2017-01-01')                         | Set the current date for month calendar. If argument is left blank or is an invalid date then current time being will be used                                                                                                                                                                                                                                                        |
| getCurrentMonthDate |                                                   | Get the current date of month calendar. Return will be a moment object.                                                                                                                                                                                                                                                                                                              |
| getDate             | a number or date (eg. '1', '2017-01-01' etc.)     | Get a moment object corresponding to the date you want to get from month calendar.                                                                                                                                                                                                                                                                                                   |
| updateDate          | (date, obj) (eg. ('2017-01-01',{isHoliday: true}) | Extend a date object of calendar with a object defined by your own. This is good when you need to attached a certain customized properties/methods that are not defined by momentJS. If you need to override those properties, just simply pass another object with same property keys again. Later when you call getDate, you can access those properties from the returned object. |
| getWeeksTable       | boolean (false by default if argument is missing) | Return an array of weeks table, the one that is similar like a month calendar view in date picker (with first element is an array of weeksday ('S','M','T' etc.) ). Each date is a moment date. If you want a simplified version of weeks table where each date is an integer (eg. from 1 to 31), pass in true as the argument.                                                      |
| getDatePosition     | a number or date (eg. '1', '2017-01-01' etc.)     | Get back date position in the weeks table mentioned above. The returned object has 2 properties 'row' and 'column' that indicate where the date is located in the weeks table.                                                                                                                                                                                                       |


## Feedback

If you have found a bug or have another issue with the library —
please [create an issue][new-issue].

If you have a question regarding the library or it's integration with your project —
consider asking a question at [StackOverflow][so-ask].

Have any ideas or propositions? Feel free to contact me by [E-Mail][email].

Cheers!


## Developer guide

Fork, clone, create a feature branch, implement your feature, cover it with tests, commit, create a PR.

Run:

- `npm i` to initialize the project
- `gulp` to re-build the dist files and run the demo server
- `npm test` to test the code

Do not add dist files to the PR itself.
We will re-compile the module manually each time before releasing.


## Support

If you like this library consider to add star on [GitHub repository][repo-gh].

Thank you!
