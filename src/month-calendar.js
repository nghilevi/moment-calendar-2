/**
 * Created by lvn on 28/08/16.
 */

var monthCalendarUtils = require("./utils.js"); //TODO avoid to access variable directly

// find date position (row, col) on weeks table
function locateDate(date) {
    return this.weeksTableDateMap[date];
}

function getDate(date) {
    var datePosition = this.locateDate(date);
    return this.momentWeeksTable[datePosition.row][datePosition.col]; //TODO make a way to provide this variable getDisplayedMonth
}

function _extend(src, dest) {
    for (var i in dest) {
        if (dest.hasOwnProperty(i)) {
            src[i] = dest[i];
        }
    }
}

function setMonth(date, format, isStrictMode) {
    date = monthCalendarUtils.isValidDate(date) ? date : moment();
    _extend(this, monthCalendarUtils.populateWeeksTable(date));
}

function setDate(date, prop) { //TODO change to extendDate
    return _extend(this.getDate(date), prop);
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