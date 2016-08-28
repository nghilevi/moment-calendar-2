/**
 * Created by lvn on 28/08/16.
 */
'use strict';

angular.module('ngCalendar.service', [])

    .factory('MonthCalendar', function () {

        return {
            //Util
            _initWeeksDay: _initWeeksDay,
            _populateWeeksTable: _populateWeeksTable,
            _getDaysOfMonth: _getDaysOfMonth,
            _getPreviousMonthOverlappingDays: _getPreviousMonthOverlappingDays,
            _getNextMonthOverlappingDays: _getNextMonthOverlappingDays,

            //Public
            getInstance: getInstance
        };

        // Util
        // get array of days in month (e.g [1,2,3...31])
        function _getDaysOfMonth(date) {
            var numberOfDays = moment(date).daysInMonth();
            var daysArray = [];
            for (var i = 1; i <= numberOfDays; i++) {
                daysArray.push(i);
            }
            return daysArray;
        }

        // Get number of days from previous month overlapping current month
        function _getPreviousMonthOverlappingDays(date) {
            var firstWeekDay = moment(date).startOf('month').weekday();
            var prevMonthDays = [];
            for (var i = 1; i <= firstWeekDay; i++) {
                prevMonthDays.push('');
            }
            return prevMonthDays;
        }

        // Get number of days from previous month overlapping current month
        function _getNextMonthOverlappingDays(date) {
            var lastWeekDay = moment(date).endOf('month').weekday();
            var nextMonthDays = [];
            var howManyNextDays = 6 - lastWeekDay;
            for (var i = 1; i <= howManyNextDays; i += 1) {
                nextMonthDays.push('');
            }
            return nextMonthDays;
        }

        function _initWeeksDay() {
            return [0, 1, 2, 3, 4, 5, 6].map(function (el, index) {
                return moment().weekday(index).format('ddd').charAt(0);
            });
        }

        function _populateWeeksTable(date) {
            var weeksTable = [];
            var momentWeeksTable = [];
            var weeksTableDateMap = {};

            var monthDays = _getPreviousMonthOverlappingDays(date).concat(_getDaysOfMonth(date)).concat(_getNextMonthOverlappingDays(date));
            var weekDays = _initWeeksDay();

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

            return {
                weeksTableDateMap: weeksTableDateMap,
                weeksTable: weeksTable,
                momentWeeksTable: momentWeeksTable
            }
        }

        // MonthCalendar object methods

        // find date position (row, col) on weeks table
        function findDatePosition(date) {
            return this.weeksTableDateMap[date];
        }

        function getMomentDate(date) {
            var datePosition = this.findDatePosition(date);
            return this.momentWeeksTable[datePosition.row][datePosition.col];
        }

        function setMonth(date) {
            angular.extend(this, _populateWeeksTable(date));
        }

        function setDate(date, prop) {
            return angular.extend(this.getMomentDate(date), prop);
        }

        // Public
        function getInstance() {
            return Object.create({
                setMonth: setMonth,
                setDate: setDate,
                getMomentDate: getMomentDate,
                findDatePosition: findDatePosition
            });
        }


    });