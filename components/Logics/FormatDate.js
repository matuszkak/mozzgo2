// date setting and formatting
function formatDate(date) {
  var d = new Date(date),
    month = '' + (d.getMonth() + 1),
    day = '' + d.getDate(),
    year = d.getFullYear(),
    hour = d.getHours(),
    minute = d.getMinutes(),
    second = d.getSeconds();
  if (month.length < 2)
    month = '0' + month;
  if (day.length < 2)
    day = '0' + day;
  if (hour < 10)
    hour = '0' + hour;
  if (minute < 10)
    minute = '0' + minute;
  if (second < 10)
    second = '0' + second;
  return ([year, month, day].join('-') + ' ' + [hour, minute, second].join(':'));
}

function formatDate2(date) {
  var d = new Date(date),
    month = '' + (d.getMonth() + 1),
    day = '' + d.getDate(),
    year = d.getFullYear();
  if (month.length < 2)
    month = '0' + month;
  if (day.length < 2)
    day = '0' + day;
  return ([year, month, day].join('/'));
}

function getMonday(d) {
  d = new Date(d);
  var day = d.getDay(),
    diff = d.getDate() - day + (day == 0 ? -6 : 1); // adjust when day is sunday
  return new Date(d.setDate(diff));
}

function getnDayBefore(d, n) {
  var day = new Date(d);
  day.setDate(day.getDate() - n);
  return new Date(day);
}

function converttoDay(n) {
  var day = ""
  if (n == 1) {
    day = 'Mon'
  }
  if (n == 2) {
    day = 'Tue'
  }
  if (n == 3) {
    day = 'Wed'
  }
  if (n == 4) {
    day = 'Thu'
  }
  if (n == 5) {
    day = 'Fri'
  }
  if (n == 6) {
    day = 'Sat'
  }
  if (n == 0) {
    day = 'Sun'
  }
  return day
}

export { getMonday, formatDate, formatDate2, getnDayBefore, converttoDay };
