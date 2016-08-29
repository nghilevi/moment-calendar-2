/**
 * Created by lvn on 28/08/16.
 */

var cache = {};

function getDaysOfMonth(date) {
    var numberOfDays = moment(date).daysInMonth();
    var daysArray = [];
    for (var i = 1; i <= numberOfDays; i++) {
        daysArray.push(i);
    }
    return daysArray;
}

// Get number of days from previous month overlapping current month
function getPreviousMonthOverlappingDays(date) {
    var firstWeekDay = moment(date).startOf('month').weekday();
    var prevMonthDays = [];
    for (var i = 1; i <= firstWeekDay; i++) {
        prevMonthDays.push('');
    }
    return prevMonthDays;
}

// Get number of days from previous month overlapping current month
function getNextMonthOverlappingDays(date) {
    var lastWeekDay = moment(date).endOf('month').weekday();
    var nextMonthDays = [];
    var howManyNextDays = 6 - lastWeekDay;
    for (var i = 1; i <= howManyNextDays; i += 1) {
        nextMonthDays.push('');
    }
    return nextMonthDays;
}

function initWeeksDay() {
    return [0, 1, 2, 3, 4, 5, 6].map(function (el, index) {
        return moment().weekday(index).format('ddd').charAt(0);
    });
}

// Use memoization here or another service
function populateWeeksTable(date) {
    var cacheKey = moment(date).year()+'-'+moment(date).month();

    if(!cache[cacheKey]){

        var weeksTable = [];
        var momentWeeksTable = [];
        var weeksTableDateMap = {};

        var monthDays = getPreviousMonthOverlappingDays(date).concat(getDaysOfMonth(date)).concat(getNextMonthOverlappingDays(date));
        var weekDays = initWeeksDay();

        weeksTable.push(weekDays);
        momentWeeksTable.push(weekDays);

        for (var j = 0, rowId = 1; j < monthDays.length; j = j + 7) {
            var week = monthDays.slice(j, j + 7);
            week.forEach(function (day, colId) {
                weeksTableDateMap[day] = {row: rowId, col: colId};
            });
            weeksTable.push(week);
            momentWeeksTable.push(week.map(function (d) {
                return moment(date).set('date', d);
            }));
            rowId++;
        }

        cache[cacheKey] =  {
            weeksTableDateMap: weeksTableDateMap,
            weeksTable: weeksTable,
            momentWeeksTable: momentWeeksTable
        };

    }

    return cache[cacheKey]
}

function isValidDate(date, format, isStrictMode) {
    return format ? moment(date,format, isStrictMode).isValid() : moment(date, isStrictMode).isValid();
}

module.exports = {
    isValidDate: isValidDate,
    initWeeksDay: initWeeksDay,
    populateWeeksTable: populateWeeksTable,
    getDaysOfMonth: getDaysOfMonth,
    getPreviousMonthOverlappingDays: getPreviousMonthOverlappingDays,
    getNextMonthOverlappingDays: getNextMonthOverlappingDays
};