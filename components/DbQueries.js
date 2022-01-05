import React, { useState, useEffect, setState } from 'react';
import { getyesterday, get2daybefore, get3daybefore, get4daybefore, get5daybefore, get6daybefore, converttoDay } from './FormatDate.js';
import { StatusBar } from 'expo-status-bar';
import { getHistory, getHistoryBySport, getHistoryByDay, saveStepsOnFirebase } from '../database';
import { dateyyyymmdd, addArrayElements } from './Chart';


const currentTime = new Date();
const [weeklyStepsWoWalking, setweeklyStepsWoWalking] = useState([]);
const [sport, setSport] = useState('walking');
const [day, setDay] = useState(currentTime.toLocaleDateString());

// defining days
const end = new Date();
const start = new Date(new Date().setHours(0, 0, 0, 0));
const lastMonday = getMonday(new Date().setHours(0, 0, 0, 0));
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


export default function ExtraSteps() {


  // AGGREGATE STEPS OTHER THAN WALKING FROM DB FOR LAST 7 DAYS

  var dailyrecords = []; // records for ALL sport for a given day
  var allrecords = []; // list of records for last 7 days - list of objects
  var recordswowalking = []; // list of records for ALL sports EXCEPT WALKING for last 7 days - list of objects
  var allsteps = []; // list of steps for ALL sports for last 7 days - list of num
  var nonWalkingRecordsForADay = [];
  var dailyStepsWoWalking = 0;


  // console.log(week);
  // records for last seven days
  for (let m = 0; m < 7; m++) {
    dailyrecords = await getHistoryByDay(props.userData.email, week[m]);
    // console.log(dailyrecords);

    // aggregate steps for different sports for a certain day
    // and collect all records for last 7 days
    var a = 0;
    for (let l = 0; l < dailyrecords.length; l++) {
      a = a + parseInt(dailyrecords[l].steps);
      allrecords.push(dailyrecords[l]);
    }
    allsteps.push(a);

  };
  // console.log(allrecords);
  // console.log(allsteps);

  // exclude walking
  recordswowalking = allrecords.filter(record => record.sport != 'walking');
  // console.log(recordswowalking);

  // non-walking steps for last 7 days
  var zs = [];
  for (let r = 0; r < 7; r++) {
    nonWalkingRecordsForADay = recordswowalking.filter(record => record.day == week[r]);
    dailyStepsWoWalking = 0;
    for (let q = 0; q < nonWalkingRecordsForADay.length; q++) {
      dailyStepsWoWalking = dailyStepsWoWalking + nonWalkingRecordsForADay[q].steps;
    };
    // console.log(week[r] + " - " + dailyStepsWoWalking);
    zs.push(dailyStepsWoWalking);
  };

  setweeklyStepsWoWalking(zs);

  console.log("***");
  console.log(weeklyStepsWoWalking);

  return [weeklyStepsWoWalking];

}