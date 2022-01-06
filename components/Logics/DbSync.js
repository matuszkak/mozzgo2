import React, { useState, useEffect, setState } from 'react';
import { getyesterday, get2daybefore, get3daybefore, get4daybefore, get5daybefore, get6daybefore, converttoDay } from './FormatDate.js';
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
const yesterday = getyesterday(new Date().setHours(0, 0, 0, 0));
const dbefore2 = get2daybefore(new Date().setHours(0, 0, 0, 0));
const dbefore3 = get3daybefore(new Date().setHours(0, 0, 0, 0));
const dbefore4 = get4daybefore(new Date().setHours(0, 0, 0, 0));
const dbefore5 = get5daybefore(new Date().setHours(0, 0, 0, 0));
const dbefore6 = get6daybefore(new Date().setHours(0, 0, 0, 0));

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


async function DbSync(user, weeklySteps) {

  // const currentTime = new Date();
  // const [weeklyStepsWoWalking, setweeklyStepsWoWalking] = Extrasteps();
  // const [sevendaySteps, setSevendaySteps] = useState(0);
  // const [isAddPopupVisible, setisAddPopupVisible] = useState(false);
  // const [sport, setSport] = useState('walking');
  // const [day, setDay] = useState(currentTime.toLocaleDateString());
  // SYNC DB IF NO DATA FOR THE LAST (FEW) DAYS - FOR MAX. 7 DAYS
  var checksport = 'walking';
  // const [weeklySteps, setweeklySteps] = useStepCounter();

  var s = [];
  s = await getHistoryBySport(user.email, checksport);
  // console.log(s);


  if (s.length < 1) {
    for (let j = 1; j < 7; j++) {
      saveStepsOnFirebase(user.email, checksport, week[j], weeklySteps[j]);
      console.log("Database updated!");
    }
  } else {
    // console.log(s[0]);
    // console.log(s[0].day);
    // console.log(week);
    for (let k = 1; k < 7; k++) {
      if (week[k] > s[0].day) {
        // console.log(week[k]);
        saveStepsOnFirebase(user.email, checksport, week[k], weeklySteps[k]);
        console.log("Database updated!");
      }
    }
  };

  // console.log(weeklySteps[0]);
  // setweeklyStepsWoWalking(ExtraSteps());

}

export default DbSync;