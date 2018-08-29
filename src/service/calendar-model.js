(() => {
  //
  calendarFactory.$inject = ['app.main.util.Emitter'];
  Core.module('app.main').service('app.main.model.calendar', calendarFactory);
  function calendarFactory() {


  class Calendar {

    constructor(data) {
      this.now = moment();
      this.curDate = this.now.format('M');
      this.year = 2018;
      this.month =  this.curDate;
      this.weeks = [];

      this.currentDate = moment([this.year, this.month - 1]);
    }

    getCurrentDate() {
      return this.currentDate;
    }

    setCurrentMonth(number) {
      this.currentDate.set('month', number);
    }


    getCurrentMonthWeeks() {
      const weeks = [],
            currentDate = this.getCurrentDate(),
            todayDay = parseInt(this.now.format('DMY')),
            yesterDay = parseInt(this.now.subtract(1, 'day').format('DMY')),
            startDay = currentDate.clone().startOf('month').startOf('week'),
            endDay = currentDate.clone().endOf('month').endOf('week'),
            date = startDay.clone().subtract(1, 'day');

      while (date.isBefore(endDay, 'day')) {

        weeks.push(Array(7).fill(0).map(() => {
            const d = date.add(1, 'day').clone(),
            isYesterday = parseInt(d.format('DMY')) === yesterDay,
            isTodayDay = parseInt(d.format('DMY')) === todayDay;

        return {
          dayName: d.format('dddd'),
          date: d.format('D MMMM'),
          day: d.format('D') * 1,
          month: d.format('M') * 1,
          year: d.format('YYYY') * 1,
          isYesterday: isYesterday,
          isCurrentDay: isTodayDay,
          isCurrentMonth: parseInt(d.format('M')) === this.month
        };

      }));

      }

      return weeks;
    }
  }
    return new Calendar;
  }

})();





