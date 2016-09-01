/**
 * Created by lvn on 28/08/16.
 */

var monthCalendarUtils = require("./MonthCalendarUtils.js");

// find date position (row, col) on weeks table
function locateDate(date) {
    return this.weeksTableDateMap[date];
}

function getDate(date) {
    var datePosition = this.locateDate(date);
    return this.momentWeeksTable[datePosition.row][datePosition.col];
}

function setMonth(date, format, isStrictMode) {
    date = monthCalendarUtils.isValidDate(date) ? date : moment();
    _.extend(this, monthCalendarUtils.populateWeeksTable(date));
}

function setDate(date, prop) {
    return _.extend(this.getDate(date), prop);
}

// Public
function getInstance(date) {
    var monthCalendarInstance =  Object.create({
        setMonth: setMonth,
        setDate: setDate,
        getDate: getDate,
        locateDate: locateDate
    });
    monthCalendarInstance.setMonth(date);
    return monthCalendarInstance;
}

module.exports = {
    getInstance: getInstance
};