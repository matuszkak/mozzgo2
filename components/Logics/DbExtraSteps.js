import React, { useState, useEffect, setState } from 'react';
import { getnDayBefore, converttoDay, getMonday } from './FormatDate.js';
import { StatusBar } from 'expo-status-bar';
import { getHistory, getHistoryBySport, getHistoryByDay, saveStepsOnFirebase } from '../../database';


const currentTime = new Date();
const sport = 'walking';

// apply date format yyyy/mm/dd
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
const lastMonday = getMonday(new Date().setHours(0, 0, 0, 0));
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
var zs = [];

// AGGREGATE STEPS OTHER THAN WALKING FROM DB FOR LAST 7 DAYS
export default async function DbExtraSteps(user) {

  const sport = 'walking';
  var dailyrecords = []; // records for ALL sport for a given day
  var allrecords = []; // list of records for last 7 days - list of objects
  var recordswowalking = []; // list of records for ALL sports EXCEPT WALKING for last 7 days - list of objects
  var allsteps = []; // list of steps for ALL sports for last 7 days - list of num
  var nonWalkingRecordsForADay = [];
  var dailyStepsWoWalking = 0;

  // records for last seven days
  for (let m = 0; m < 7; m++) {
    dailyrecords = await getHistoryByDay(user.email, week[m]);

    // aggregate steps for different sports for a certain day
    // and collect all records for last 7 days
    var a = 0;
    for (let l = 0; l < dailyrecords.length; l++) {
      a = a + parseInt(dailyrecords[l].steps);
      allrecords.push(dailyrecords[l]);
    }
    allsteps.push(a);
  };

  // exclude walking
  recordswowalking = allrecords.filter(record => record.sport != 'walking');

  // non-walking steps for last 7 days
  zs = [];
  for (let r = 0; r < 7; r++) {
    nonWalkingRecordsForADay = recordswowalking.filter(record => record.day == week[r]);
    dailyStepsWoWalking = 0;
    for (let q = 0; q < nonWalkingRecordsForADay.length; q++) {
      dailyStepsWoWalking = dailyStepsWoWalking + nonWalkingRecordsForADay[q].steps;
    };
    zs.push((parseInt(dailyStepsWoWalking)));
  };

  return [zs];
}