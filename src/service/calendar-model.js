(() => {


  Core.module('app.main').service('app.main.model.calendar', CalendarWeek);



  function CalendarWeek() {

      moment.locale('ru');
      const year = 2018,
            month = 1;
            weeks = [],
            todayDay = parseInt(moment().format('DMY')),
            yesterDay = parseInt(moment().subtract(1, 'day').format('DMY')),
            currentDate = moment([year, month - 1]),
            startDay = currentDate.clone().startOf('month').startOf('week'),
            endDay = currentDate.clone().endOf('month').endOf('week'),
            date = startDay.clone().subtract(1, 'day');



    while (date.isBefore(endDay, 'day')) {

      weeks.push(Array(7).fill(0).map(() => {
          const d = date.add(1, 'day').clone();
      const isYesterday = parseInt(d.format('DMY')) === yesterDay;
      const isTodayDay = parseInt(d.format('DMY')) === todayDay;

      return {
        dayName: d.format('dddd'),
        date: d.format('D MMMM'),
        day: d.format('D'),
        month: d.format('M'),
        year: d.format('YYYY'),
        isYesterday: isYesterday,
        isCurrentDay: isTodayDay,
        isCurrentMonth: parseInt(d.format('M')) === month
      };

    }));

    }
    return weeks
  }
})();





