/**
 * Created by lvn on 28/08/16.
 */
describe('MonthCalendar', function() {

    var month;

    beforeEach(module('ngMomentCalendar.service'));

    beforeEach(inject(function (MonthCalendar) {
        month = MonthCalendar;
    }));

    it('should be defined',function () {
        expect(month).toBeDefined();
    });

    describe('MonthCalendar methods',function () {

        var monthView;
        beforeEach(function () {
            monthView = month.getInstance();
        });

        describe('getInstance',function () {
            it('should setMonth by default if argument is a date',function () {
                expect(month.getInstance('2016-07').locateDate(8)).toEqual({row:2,col:5});
                expect(month.getInstance('2016-08').locateDate(8)).toEqual({row:2,col:1});

            });
        });

        describe('locateDate',function () {
            it('should return an obj containing row and col index of the input date on weeksTable',function () {
                monthView.setMonth('2016-08');
                expect(monthView.locateDate(8)).toEqual({row:2,col:1});
            });
        });

        describe('getDate',function () {
            it('should return a moment obj represent the input date',function () {
                monthView.setMonth('2016-08');
                expect(monthView.getDate(8).format('YYYY-MM-DD')).toBe('2016-08-08');
            });
        });

        describe('setMonth',function () {
            it('should populate weeksTable and momentWeeksTable with given date',function () {
                monthView.setMonth('2016-05');
                expect(monthView.weeksTable.length).toBe(monthView.momentWeeksTable.length);
                expect(monthView.weeksTable[2][1]).toBe(9);
                expect(monthView.momentWeeksTable[2][1].format('YYYY-MM-DD')).toBe('2016-05-09');
            });

            it('should populate weeksTable and momentWeeksTable with current date if argument is an invalid date',function () {
                monthView.setMonth('invalid string');
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

                expect(monthView.getDate(1).isSelected).toBe(true);
                expect(monthView.getDate(1).isDisabled).toBe(undefined);

                expect(monthView.getDate(2).isSelected).toBe(undefined);
                expect(monthView.getDate(2).isDisabled).toBe(true);

            });
        });

    });

});