export class Weeks {

  const  params = {year: '2018', month: '1'};

  constructor(params) {
    moment.locale('ru');
    this.weeks = [];
    this.todayDay = parseInt(moment().format('DMY'));
    this.yesterDay = parseInt(moment().subtract(1, 'day').format('DMY'));
    this.year = +params.year;
    this.month = +params.month;
    this.currentDate = moment([year, month - 1]);
    this.startDay = currentDate.clone().startOf('month').startOf('week');
    this.endDay = currentDate.clone().endOf('month').endOf('week');
    this.date = startDay.clone().subtract(1, 'day');

  }

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

console.log(weeks);


}



