/**
 * Created by lvn on 28/08/16.
 */
'use strict';

describe('MonthCalendar', function() {

    var month;

    beforeEach(module('ngCalendar.service'));

    beforeEach(inject(function (MonthCalendar) {
        month = MonthCalendar;
    }));

    it('should be defined',function () {
        expect(month).toBeDefined();
    });

    describe('Util',function () {
        describe('_initWeeksDay',function () {
            it('should get an array of week days',function () {
                expect(month._initWeeksDay().length).toBe(7);
                expect(month._initWeeksDay()).toEqual([ 'S', 'M', 'T', 'W', 'T', 'F', 'S' ]);
            });
        });

        describe('_populateWeeksTable',function () {
            it('should get an array of weeks table for 2016-07',function () {
                var monthWeeksTable = month._populateWeeksTable('2016-07');
                expect(monthWeeksTable.weeksTable.length).toBe(7);
                expect(monthWeeksTable.weeksTable).toEqual(
                    [
                        [ 'S', 'M', 'T', 'W', 'T', 'F', 'S' ],
                        [ '', '', '', '', '', 1, 2 ],
                        [ 3, 4, 5, 6, 7, 8, 9 ],
                        [ 10, 11, 12, 13, 14, 15, 16 ],
                        [ 17, 18, 19, 20, 21, 22, 23 ],
                        [ 24, 25, 26, 27, 28, 29, 30 ],
                        [ 31, '', '', '', '', '', '' ]
                    ]);
            });

            it('should get an array of weeks table for 2016-08',function () {
                var monthWeeksTable = month._populateWeeksTable('2016-08');
                expect(monthWeeksTable.weeksTable.length).toBe(6);
                expect(monthWeeksTable.weeksTable).toEqual(
                    [
                        [ 'S', 'M', 'T', 'W', 'T', 'F', 'S' ],
                        [ '', 1, 2, 3, 4, 5, 6 ],
                        [ 7, 8, 9, 10, 11, 12, 13 ],
                        [ 14, 15, 16, 17, 18, 19, 20 ],
                        [ 21, 22, 23, 24, 25, 26, 27 ],
                        [ 28, 29, 30, 31, '', '', '' ]
                    ]);
            });

            it('should generate weeks table date map for 2016-08',function () {
                var monthWeeksTable = month._populateWeeksTable('2016-08');
                expect(Object.keys(monthWeeksTable.weeksTableDateMap).length > 0).toBeTruthy();
                expect(monthWeeksTable.weeksTableDateMap[1].row).toBe(1);
                expect(monthWeeksTable.weeksTableDateMap[1].col).toBe(1);
                expect(monthWeeksTable.weeksTableDateMap[31].row).toBe(5);
                expect(monthWeeksTable.weeksTableDateMap[31].col).toBe(3);
            });

        });

        describe('_getDaysOfMonth',function () {
            it('should get an array of days in month',function () {
                expect(month._getDaysOfMonth('2015-02-01').length).toBe(28);
                expect(month._getDaysOfMonth('2016-02-01').length).toBe(29);
                expect(month._getDaysOfMonth('2015-02').length).toBe(28);
                expect(month._getDaysOfMonth('2016-02')).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29]);
            });
        });

        describe('_getPreviousMonthOverlappingDays',function () {
            it('should get an array of empty string representing previous overlapping days in month',function () {
                expect(month._getPreviousMonthOverlappingDays('2016-01-01').length).toBe(5);
                expect(month._getPreviousMonthOverlappingDays('2016-02-01').length).toBe(1);
            });
        });

        describe('_getNextMonthOverlappingDays',function () {
            it('should get an array of empty string representing next overlapping days in month',function () {
                expect(month._getNextMonthOverlappingDays('2016-01-01').length).toBe(6);
                expect(month._getNextMonthOverlappingDays('2016-02-01').length).toBe(5);
            });
        });
    });


    describe('MonthCalendar methods',function () {

        var monthView;
        beforeEach(function () {
            monthView = month.getInstance();
        });

        describe('findDatePosition',function () {
            it('should return an obj containing row and col index of the input date on weeksTable',function () {
                monthView.setMonth('2016-08');
                expect(monthView.findDatePosition(8)).toEqual({row:2,col:1});
            });
        });

        describe('getMomentDate',function () {
            it('should return a moment obj represent the input date',function () {
                monthView.setMonth('2016-08');
                expect(monthView.getMomentDate(8).format('YYYY-MM-DD')).toBe('2016-08-08');
            });
        });

        describe('setMonth',function () {
            it('should populate weeksTable and momentWeeksTable',function () {
                monthView.setMonth('2016-08');
                expect(monthView.weeksTable.length).toBe(monthView.momentWeeksTable.length);
                expect(monthView.weeksTable[2][1]).toBe(8);
                expect(monthView.momentWeeksTable[2][1].format('YYYY-MM-DD')).toBe('2016-08-08');
            });
        });

        describe('setDate',function () {
            it('should add/override property of a date',function () {
                monthView.setMonth('2016-08');
                monthView.setDate(1,{isSelected: true});
                monthView.setDate(2,{isDisabled: true});

                expect(monthView.getMomentDate(1).isSelected).toBe(true);
                expect(monthView.getMomentDate(1).isDisabled).toBe(undefined);

                expect(monthView.getMomentDate(2).isSelected).toBe(undefined);
                expect(monthView.getMomentDate(2).isDisabled).toBe(true);

            });
        });

    });

});