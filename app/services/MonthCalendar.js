/**
 * Created by lvn on 28/08/16.
 */
'use strict';

angular.module('ngMomentCalendar.service', [])

    .factory('MonthCalendar', function (MonthCalendarUtils) {

        return {
            getInstance: getInstance
        };

        // find date position (row, col) on weeks table
        function locateDate(date) {
            return this.weeksTableDateMap[date];
        }

        function getDate(date) {
            var datePosition = this.locateDate(date);
            return this.momentWeeksTable[datePosition.row][datePosition.col];
        }

        function setMonth(date, format, isStrictMode) {
            date = MonthCalendarUtils.isValidDate(date) ? date : moment();
            angular.extend(this, MonthCalendarUtils.populateWeeksTable(date));
        }

        function setDate(date, prop) {
            return angular.extend(this.getDate(date), prop);
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


    });