


// date formatting
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
  if (hour.length < 2)
    hour = '0' + hour;
  if (minute.length < 2)
    minute = '0' + minute;
  if (second.length < 2)
    second = '0' + second;

  return ([year, month, day].join('-') + ' ' + [hour, minute, second].join(':'));
}

function getMonday(d) {
  d = new Date(d);
  var day = d.getDay(),
    diff = d.getDate() - day + (day == 0 ? -6 : 1); // adjust when day is sunday
  return new Date(d.setDate(diff));
}

function getyesterday(d) {
  d = new Date(d);
  d.setDate(d.getDate() - 1);
  return new Date(d);
}

function get2daybefore(d) {
  d = new Date(d);
  d.setDate(d.getDate() - 2);
  return new Date(d);
}

function get3daybefore(d) {
  d = new Date(d);
  d.setDate(d.getDate() - 3);
  return new Date(d);
}

function get4daybefore(d) {
  d = new Date(d);
  d.setDate(d.getDate() - 4);
  return new Date(d);
}

function get5daybefore(d) {
  d = new Date(d);
  d.setDate(d.getDate() - 5);
  return new Date(d);
}

function get6daybefore(d) {
  d = new Date(d);
  d.setDate(d.getDate() - 6);
  return new Date(d);
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

