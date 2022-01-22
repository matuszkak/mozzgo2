import React, { useState, useEffect, setState } from 'react';
import { getnDayBefore, converttoDay } from './FormatDate.js';
import { StatusBar } from 'expo-status-bar';
import { getHistory, getHistoryBySport, getHistoryByDay, saveStepsOnFirebase } from '../../database';
// import useStepCounter from './CounterLogic';

function dateyyyymmdd(date) {
  var d = new Date(date),
    month = '' + (d.getMonth() + 1),
    day = '' + d.getDate(),
    year = d.getFullYear();
  if (month.length < 2)
    month = '0' + month;
  if (day.length < 2)
    day = '0' + day;
  return [year, month, day].join('/');
}

function addArrayElements(total, num) {
  return total + num;
}

// defining days
const end = new Date();
const start = new Date(new Date().setHours(0, 0, 0, 0));
// const lastMonday = getMonday(new Date().setHours(0, 0, 0, 0));
const yesterday = getnDayBefore(new Date().setHours(0, 0, 0, 0), 1);
const dbefore2 = getnDayBefore(new Date().setHours(0, 0, 0, 0), 2);
const dbefore3 = getnDayBefore(new Date().setHours(0, 0, 0, 0), 3);
const dbefore4 = getnDayBefore(new Date().setHours(0, 0, 0, 0), 4);
const dbefore5 = getnDayBefore(new Date().setHours(0, 0, 0, 0), 5);
const dbefore6 = getnDayBefore(new Date().setHours(0, 0, 0, 0), 6);

// identify dates for last 7 days
var week = [];
week[0] = dateyyyymmdd(start);
week[1] = dateyyyymmdd(yesterday);
week[2] = dateyyyymmdd(dbefore2);
week[3] = dateyyyymmdd(dbefore3);
week[4] = dateyyyymmdd(dbefore4);
week[5] = dateyyyymmdd(dbefore5);
week[6] = dateyyyymmdd(dbefore6);
// console.log(week);

// SYNC DB (save daily walking steps) IF NO DATA FOR THE LAST (FEW) DAYS - FOR MAX. 7 DAYS
async function DbSync(user, weeklySteps) {

  var checksport = 'walking';
  var s = [];
  s = await getHistoryBySport(user.email, checksport);

  if (s.length < 1) {
    for (let j = 1; j < 7; j++) {
      saveStepsOnFirebase(user.email, checksport, week[j], weeklySteps[j]);
    }
  } else {
    for (let k = 1; k < 7; k++) {
      if (week[k] > s[0].day) {
        saveStepsOnFirebase(user.email, checksport, week[k], weeklySteps[k]);
      }
    }
  };
  console.log("DB synced");
}

export default DbSync;