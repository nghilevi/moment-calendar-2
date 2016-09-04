/**
 * Created by lvn on 02/09/16.
 */
angular.module('Demo',[])
    .controller('DemoCtrl',function(){
        var vm = this;

        vm.nextMonth = nextMonth;
        vm.previousMonth = previousMonth;

        vm.monthCursor = moment();
        vm.calendar = momentCalendar.getInstance(vm.monthCursor);

        function nextMonth(){
            vm.monthCursor.add(1,'month');
            vm.calendar.setMonth(vm.monthCursor);
        }

        function previousMonth(){
            vm.monthCursor.subtract(1,'month');
            vm.calendar.setMonth(vm.monthCursor);
        }

    });