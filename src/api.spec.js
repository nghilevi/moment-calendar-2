/**
 * Created by lvn on 28/08/16.
 */

var month = require("./api.js");

describe('MonthCalendar', function () {

    function lo(l, o) {
        console.log(l, JSON.stringify(o, undefined, 2));
    }

    it('should be defined', function () {
        expect(month).toBeDefined();
    });

    describe('MonthCalendar methods', function () {

        var monthView;
        beforeEach(function () {
            monthView = month.getInstance();
        });

        describe('getInstance', function () {
            it('should return a monthCalendar object', function () {
                var monthCalendar = month.getInstance();
                expect(monthCalendar).toBeDefined();
            });

            it('should return a monthCalendar object where its current date is set by default', function () {
                var monthCalendar = month.getInstance();
                expect(monthCalendar.getCurrentDate().format('YYYY-MM-DD')).toEqual(moment().format('YYYY-MM-DD'));
            });

            it('should return a monthCalendar object where its current date is set manually', function () {
                var monthCalendar = month.getInstance('2019-09-19');
                expect(monthCalendar.getCurrentDate().format('YYYY-MM-DD')).toEqual(moment('2019-09-19').format('YYYY-MM-DD'));
            });
        });

        describe('getDatePosition', function () {
            it('should return an obj containing row and col index of the input date on weeksTable', function () {
                monthView.setCurrentDate('2016-08');
                expect(monthView.getDatePosition(8)).toEqual({row: 2, col: 1});
                expect(monthView.getDatePosition('2016-08-08')).toEqual({row: 2, col: 1});
            });
        });

        describe('getDate', function () {
            it('should return a moment obj represent the input date', function () {
                monthView.setCurrentDate('2016-08');
                expect(monthView.getDate(8).format('YYYY-MM-DD')).toBe('2016-08-08');
                expect(monthView.getDate('2016-08-09').get('date')).toBe(9);
            });
            
            it('should return undefined if input is invalid', function () {
                monthView.setCurrentDate('2016-08');
                expect(monthView.getDate(128)).toBeUndefined();
            });
        });

        describe('setCurrentDate', function () {
            it('should populate weeksTable and momentWeeksTable with given date', function () {
                monthView.setCurrentDate('2016-05');
                expect(monthView.weeksTable.length).toBe(monthView.momentWeeksTable.length);
                expect(monthView.weeksTable[2][1]).toBe(9);
                expect(monthView.momentWeeksTable[2][1].format('YYYY-MM-DD')).toBe('2016-05-09');
            });

            xit('should populate weeksTable and momentWeeksTable with current date if argument is an invalid date', function () {
                monthView.setCurrentDate('invalid string');
                expect(monthView.weeksTable.length).toBe(monthView.momentWeeksTable.length);
                expect(monthView.weeksTable[2][1]).toBe(5);
                expect(monthView.momentWeeksTable[2][1].format('YYYY-MM-DD')).toBe('2016-09-05');
            });
        });

        describe('updateDate', function () {
            it('should add/override property of a date', function () {
                monthView.setCurrentDate('2016-08');
                monthView.updateDate(1, {isSelected: true});
                monthView.updateDate(2, {isDisabled: true});

                expect(monthView.getDate(1).isSelected).toBe(true);
                expect(monthView.getDate(1).isDisabled).toBe(undefined);

                expect(monthView.getDate(2).isSelected).toBe(undefined);
                expect(monthView.getDate(2).isDisabled).toBe(true);

            });
        });

        describe('getWeeksTable', function () {
            /*[
             ['S', 'M', 'T', 'W', 'T', 'F', 'S'],
             ['', 1, 2, 3, 4, 5, 6],
             [7, 8, 9, 10, 11, 12, 13],
             [14, 15, 16, 17, 18, 19, 20],
             [21, 22, 23, 24, 25, 26, 27],
             [28, 29, 30, 31, '', '', '']
             */

            beforeEach(function () {
                monthView.setCurrentDate('2016-08');
            });

            it('should return week table where each date item is a moment date object', function () {
                var weeksTable = monthView.getWeeksTable();
                var datePos = monthView.getDatePosition(1);
                expect(weeksTable[datePos.row][datePos.col].format('YYYY-MM-DD')).toBe('2016-08-01');
            });

            it('should return week table where each date item is a number if arguments is true', function () {
                var weeksTable = monthView.getWeeksTable(true);
                var datePos = monthView.getDatePosition(1);
                expect(weeksTable[datePos.row][datePos.col]).toBe(1);
            });
        });

    });

});