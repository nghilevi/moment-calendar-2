(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.momentCalendar = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
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
},{"./utils.js":2}],2:[function(require,module,exports){
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
},{}]},{},[1])(1)
});