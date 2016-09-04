/**
 * Created by lvn on 02/09/16.
 */
angular.module('Demo',[])
    .controller('DemoMomentCalendarCtrl',function(){
        var vm = this;

        vm.nextMonth = nextMonth;
        vm.previousMonth = previousMonth;

        vm.monthCursor = moment();
        vm.calendar = MomentCalendarFactory.getInstance(vm.monthCursor);
        vm.weeksTable = vm.calendar.getWeeksTable();
        vm.weekDays = vm.weeksTable[0];

        function nextMonth(){
            vm.monthCursor.add(1,'month');
            vm.calendar.setCurrentMonthDate(vm.monthCursor);
            vm.weeksTable = vm.calendar.getWeeksTable();
        }

        function previousMonth(){
            vm.monthCursor.subtract(1,'month');
            vm.calendar.setCurrentMonthDate(vm.monthCursor);
            vm.weeksTable = vm.calendar.getWeeksTable();
        }

    })
    .directive('demoMomentCalendar',function(){
       return {
           templateUrl: './calendar/index.html',
           controller: 'DemoMomentCalendarCtrl',
           controllerAs: 'vm'
       }
    });