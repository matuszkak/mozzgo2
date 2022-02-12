import React, { useState, useEffect, setState } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import {
  SafeAreaView,
  Image,
  View,
  Text,
  StyleSheet,
  Dimensions,
  ScrollView,
  Button,
  TouchableOpacity,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { StackedBarChart } from 'react-native-chart-kit';
import AppLoading from 'expo-app-loading';

import AddToSteps from './AddToSteps';
import { formatDate, converttoDay, getMonday, getnDayBefore } from './Logics/FormatDate.js';

import logo from '../assets/footz.jpg';
import appname from '../assets/Mozzgogif2.gif';
import DbExtraSteps from './Logics/DbExtraSteps';
import DbSync from './Logics/DbSync';
import { getHistory } from '../database';

import { storeStepData, getStepData } from '../localStorage';

export default function Monthly_chart(props) {

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

  const [stepHistory, setStepHistory] = useState(null);
  const [downloaded, setDownloaded] = useState(false);
  const [noofdays, setnoofdays] = useState(null);
  const [noofalldays, setnoofalldays] = useState(null);
  var stepssss = 0;

  const [monthlysteps, setMonthlysteps] = useState(null);
  const [allsteps, setAllsteps] = useState(null);

  useEffect(() => {
    (async () => {
      // console.log(props.userData.email);
      const historyFromFirebase = await getHistory(props.userData.email);
      setStepHistory(historyFromFirebase);
      // console.log("Step history:\n");
      // console.log(historyFromFirebase);

      var date = new Date(historyFromFirebase[0].day);
      console.log("Last day in db: " + historyFromFirebase[0].day);
      var firstdate = new Date(historyFromFirebase[historyFromFirebase.length - 1].day);
      console.log("First day in db: " + historyFromFirebase[historyFromFirebase.length - 1].day);

      var napokall = (date - firstdate) / 24 / 60 / 60 / 1000;
      console.log(date);
      console.log(firstdate);
      setnoofalldays(napokall);
      console.log("napokall: " + napokall)

      var firstDayOfMonth = new Date(date.getFullYear(), date.getMonth(), 1);
      var napok = date.getDate() - firstDayOfMonth.getDate() + 2;
      console.log(napok);
      setnoofdays(napok);
      var lastDayOfMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0);

      console.log(dateyyyymmdd(date), dateyyyymmdd(firstDayOfMonth), dateyyyymmdd(lastDayOfMonth));
      storeStepData(historyFromFirebase);
      console.log(historyFromFirebase.length);

      monthlyvalues = {};
      monthlyvalue = [];
      var mm = 0;
      var aa = 0;
      // filter down records for last month

      // aggregate steps for different sports for a certain day
      for (let l = 0; l < historyFromFirebase.length; l++) {
        if (historyFromFirebase[l].day > dateyyyymmdd(firstDayOfMonth)) {
          mm = mm + parseInt(historyFromFirebase[l].steps);
        }
        if (true) {
          aa = aa + parseInt(historyFromFirebase[l].steps);
        }
      };
      setMonthlysteps(mm);
      setAllsteps(aa);
      monthlyvalue[0] = dateyyyymmdd(firstDayOfMonth);
      monthlyvalue[1] = mm;
      console.log(monthlyvalue);
      console.log(aa);
    })().then(
      (async () => {

        stepssss = await getStepData();
        // setStepHistory(stepssss);
        console.log(stepssss[0]);
        setDownloaded(true);

      })());
  }, []);

  // if (downloaded) {
  //   console.log("Steps from async storage:\n");
  //   console.log(stepssss);

  // };


  return (
    <View style={styles.container}>

      <Text style={{ color: '#148F77', fontSize: 18, fontFamily: 'AvenirNextDemiItalic', fontWeight: '300', marginTop: 20 }}>Steps since start / daily average: {allsteps + props.weeklySteps[0]} / {Math.round((allsteps + props.weeklySteps[0]) / noofalldays)}</Text>

      <Text style={{ color: '#148F77', fontSize: 18, fontFamily: 'AvenirNextDemiItalic', fontWeight: '300', marginTop: 10 }}>Steps in {new Date().getFullYear() + "/" + (new Date().getMonth() + 1)} / daily average: {monthlysteps + props.weeklySteps[0]} / {Math.round((monthlysteps + props.weeklySteps[0]) / noofdays)}</Text>

      <Text style={{ color: '#148F77', fontSize: 18, fontFamily: 'AvenirNextDemiItalic', fontWeight: '300', marginTop: 10, marginBottom: 20 }}>Steps today: {props.weeklySteps[0] + 0}</Text>

      <Image source={logo} style={{ width: 100, height: 100, marginBottom: -10 }} />
      <Image source={appname} style={{ width: 150, height: 100, marginBottom: -20 }} />
    </View >
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 0,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white'
  },
});
