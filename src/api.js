/**
 * Created by lvn on 28/08/16.
 */

var core = require("./core.js");

// find date position (row, col) on weeks table
function getDatePosition(date) {
    if(!core.isDateInMonth(date) ){
        return undefined;
    }
    date = isNaN(date) ? moment(date).get('date') : date;
    return this.datePositionMap[date];       
}

function getDate(date) {
    if(!core.isDateInMonth(date) ){
        return undefined;
    }
    try{
        var datePosition = this.getDatePosition(date);
        return this.momentWeeksTable[datePosition.row][datePosition.col];
    }catch(err){
        return undefined;
    }
}

function setCurrentDate(date, format, isStrictMode) {
    date = core.isValidDate(date) ? date : moment();
    core.extend(this, core.populateWeeksTable(date));
}

function updateDate(date, prop) {
    return core.extend(this.getDate(date), prop);
}

function getWeeksTable(isPlainWeeksTable) {
    return isPlainWeeksTable ? this.weeksTable : this.momentWeeksTable;
}

function getCurrentDate() {
    return core.currentMonthDate;
}

// Public
function getInstance(date) {
    var monthCalendarInstance = Object.create({
        setCurrentDate: setCurrentDate,
        getCurrentDate:getCurrentDate,
        updateDate: updateDate,
        getDate: getDate,
        getWeeksTable: getWeeksTable,
        getDatePosition: getDatePosition
    });
    monthCalendarInstance.setCurrentDate(date);
    return monthCalendarInstance;
}

module.exports = {
    getInstance: getInstance
};