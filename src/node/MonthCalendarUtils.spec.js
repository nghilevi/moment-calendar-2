/**
 * Created by lvn on 28/08/16.
 */


var monthCalUtils = require("./MonthCalendarUtils.js");

describe('MonthCalendarUtils', function() {

    it('should be defined', function () {
        expect(monthCalUtils).toBeDefined();
    });

    describe('Util', function () {
        describe('initWeeksDay', function () {
            it('should get an array of week days', function () {
                expect(monthCalUtils.initWeeksDay().length).toBe(7);
                expect(monthCalUtils.initWeeksDay()).toEqual(['S', 'M', 'T', 'W', 'T', 'F', 'S']);
            });
        });

        describe('populateWeeksTable', function () {
            it('should get an array of weeks table for 2016-07', function () {
                var monthCalUtilsWeeksTable = monthCalUtils.populateWeeksTable('2016-07');
                expect(monthCalUtilsWeeksTable.weeksTable.length).toBe(7);
                expect(monthCalUtilsWeeksTable.weeksTable).toEqual(
                    [
                        ['S', 'M', 'T', 'W', 'T', 'F', 'S'],
                        ['', '', '', '', '', 1, 2],
                        [3, 4, 5, 6, 7, 8, 9],
                        [10, 11, 12, 13, 14, 15, 16],
                        [17, 18, 19, 20, 21, 22, 23],
                        [24, 25, 26, 27, 28, 29, 30],
                        [31, '', '', '', '', '', '']
                    ]);
            });

            it('should get an array of weeks table for 2016-08', function () {
                var monthCalUtilsWeeksTable = monthCalUtils.populateWeeksTable('2016-08');
                expect(monthCalUtilsWeeksTable.weeksTable.length).toBe(6);
                expect(monthCalUtilsWeeksTable.weeksTable).toEqual(
                    [
                        ['S', 'M', 'T', 'W', 'T', 'F', 'S'],
                        ['', 1, 2, 3, 4, 5, 6],
                        [7, 8, 9, 10, 11, 12, 13],
                        [14, 15, 16, 17, 18, 19, 20],
                        [21, 22, 23, 24, 25, 26, 27],
                        [28, 29, 30, 31, '', '', '']
                    ]);
            });

            it('should generate weeks table date map for 2016-08', function () {
                var monthCalUtilsWeeksTable = monthCalUtils.populateWeeksTable('2016-08');
                expect(Object.keys(monthCalUtilsWeeksTable.weeksTableDateMap).length > 0).toBeTruthy();
                expect(monthCalUtilsWeeksTable.weeksTableDateMap[1].row).toBe(1);
                expect(monthCalUtilsWeeksTable.weeksTableDateMap[1].col).toBe(1);
                expect(monthCalUtilsWeeksTable.weeksTableDateMap[31].row).toBe(5);
                expect(monthCalUtilsWeeksTable.weeksTableDateMap[31].col).toBe(3);
            });

        });

        describe('getDaysOfMonth', function () {
            it('should get an array of days in monthCalUtils', function () {
                expect(monthCalUtils.getDaysOfMonth('2015-02-01').length).toBe(28);
                expect(monthCalUtils.getDaysOfMonth('2016-02-01').length).toBe(29);
                expect(monthCalUtils.getDaysOfMonth('2015-02').length).toBe(28);
                expect(monthCalUtils.getDaysOfMonth('2016-02')).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29]);
            });
        });

        describe('getPreviousMonthOverlappingDays', function () {
            it('should get an array of empty string representing previous overlapping days in monthCalUtils', function () {
                expect(monthCalUtils.getPreviousMonthOverlappingDays('2016-01-01').length).toBe(5);
                expect(monthCalUtils.getPreviousMonthOverlappingDays('2016-02-01').length).toBe(1);
            });
        });

        describe('getNextMonthOverlappingDays', function () {
            it('should get an array of empty string representing next overlapping days in monthCalUtils', function () {
                expect(monthCalUtils.getNextMonthOverlappingDays('2016-01-01').length).toBe(6);
                expect(monthCalUtils.getNextMonthOverlappingDays('2016-02-01').length).toBe(5);
            });
        });

        describe('isValidDate', function () {
            it('should return TRUE if arguments are valid', function () {
                expect(monthCalUtils.isValidDate('2016-01-01')).toBe(true);
            });

            it('should return TRUE if arguments are valid case deprecated warning', function () {
                expect(monthCalUtils.isValidDate('2016-08')).toBe(true);
                //expect(monthCalUtils.isValidDate('2016/08')).toBe(true);
                expect(monthCalUtils.isValidDate('08/16')).toBe(true);
                expect(monthCalUtils.isValidDate('08-08-2016', 'DD-MM-YYYY')).toBe(true);
            });

            it('should return FALSE if arguments are invalid', function () {
                expect(monthCalUtils.isValidDate('2016-01-01', 'MM')).toBe(false);
                expect(monthCalUtils.isValidDate('2016/088')).toBe(false);
            });
        });
    });

});