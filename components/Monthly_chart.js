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
import { StackedBarChart, ProgressChart } from 'react-native-chart-kit';
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
  var maxstepssss = 0;

  const [max, setMax] = useState(null);

  const [m7, setM7] = useState(null);
  const [m30, setM30] = useState(null);
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
      console.log("# of days: " + napokall)

      var firstDayOfMonth = new Date(date.getFullYear(), date.getMonth(), 1);
      var napok = date.getDate() - firstDayOfMonth.getDate() + 2;
      console.log("# of days in this month: " + napok);
      setnoofdays(napok);
      var lastDayOfMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0);

      console.log(dateyyyymmdd(date), dateyyyymmdd(firstDayOfMonth), dateyyyymmdd(lastDayOfMonth));
      storeStepData(historyFromFirebase);
      console.log("# of all records in DB: " + historyFromFirebase.length);

      // monthlyvalues = {};
      // monthlyvalue = [];
      var mm = 0;
      var mm7 = 0;
      var mm30 = 0;
      var aa = 0;
      var maxxxx = 0;
      // var dd = [];
      // filter down records for last month

      // aggregate steps for different sports for a certain day
      for (let l = 0; l < historyFromFirebase.length; l++) {

        // calculate steps for actual month
        if (historyFromFirebase[l].day > dateyyyymmdd(firstDayOfMonth)) {
          mm = mm + parseInt(historyFromFirebase[l].steps);
        };

        // calculate steps for last 30 days
        if (historyFromFirebase[l].day > dateyyyymmdd(new Date(date - 30 * 60 * 60 * 24 * 1000))) {
          mm30 = mm30 + parseInt(historyFromFirebase[l].steps);
        };

        // calculate steps for last 7 days
        if (historyFromFirebase[l].day > dateyyyymmdd(new Date(date - 7 * 60 * 60 * 24 * 1000))) {
          mm7 = mm7 + parseInt(historyFromFirebase[l].steps);
          console.log(historyFromFirebase[l].steps)
        };

        // calculate all-time steps
        if (true) {
          aa = aa + parseInt(historyFromFirebase[l].steps);
        };

        // calculate max
        if (parseInt(historyFromFirebase[l].steps) > maxxxx) {
          maxxxx = parseInt(historyFromFirebase[l].steps);
        };
        // for (let e = 0; e < napokall; e++) {
        //   var nap = date - e;
        //   console.log(nap);
        //   if (new Date(historyFromFirebase[l].day) == new Date(nap)) {
        //     dd[e] = dd[e] + parseInt(historyFromFirebase[l].steps)
        //   };
        // }
      };
      setMax(maxxxx);
      setM7(mm7);
      setM30(mm30);
      setMonthlysteps(mm);
      setAllsteps(aa);
      // monthlyvalue[0] = dateyyyymmdd(firstDayOfMonth);
      // monthlyvalue[1] = mm;
      // console.log("Monthly value: " + monthlyvalue);
      console.log("All-time value: ", aa);
      console.log("7-day value: ", mm7);
      console.log("30-day value: ", mm30);

      // console.log(dd);
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

  const data = {
    labels: ["All-time", "30-day", "7-day", "Today"], // optional
    data: [Math.min(allsteps / noofalldays / 10000, 1), Math.min(m30 / 30 / 10000, 1), Math.min(m7 / 7 / 10000, 1), Math.min(props.weeklySteps[0] / 10000, 1)],
    colors: [
      "rgba(20, 143, 119, 0.4)",
      "rgba(20, 143, 119, 0.7)",
      "rgba(20, 143, 119, 1)",
      "rgba(143, 57, 20, 0.8)",
    ],
  };

  return (

    <View style={styles.container} >

      <Text style={{ color: '#148F77', fontSize: 18, fontFamily: 'AvenirNextDemiItalic', fontWeight: '300', marginTop: -50 }}>All-time / daily average: {allsteps + props.weeklySteps[0]} / {Math.round((allsteps + props.weeklySteps[0]) / noofalldays)}</Text>

      <Text style={{ color: '#148F77', fontSize: 18, fontFamily: 'AvenirNextDemiItalic', fontWeight: '300', marginTop: 10, marginBottom: 10 }}>RECORD: {max}</Text>

      <Text style={{ color: '#148F77', fontSize: 18, fontFamily: 'AvenirNextDemiItalic', fontWeight: '300', marginTop: 10 }}>Steps in 30 days / daily average: {m30} / {Math.round(m30 / 30)}</Text>

      <Text style={{ color: '#148F77', fontSize: 18, fontFamily: 'AvenirNextDemiItalic', fontWeight: '300', marginTop: 10 }}>Steps in 7 days / daily average: {m7} / {Math.round(m7 / 7)}</Text>

      {/* <Text style={{ color: '#148F77', fontSize: 18, fontFamily: 'AvenirNextDemiItalic', fontWeight: '300', marginTop: 10 }}>Steps in {new Date().getFullYear() + "/" + (new Date().getMonth() + 1)} / daily average: {monthlysteps + props.weeklySteps[0]} / {Math.round((monthlysteps + props.weeklySteps[0]) / noofdays)}</Text> */}

      <Text style={{ color: '#148F77', fontSize: 18, fontFamily: 'AvenirNextDemiItalic', fontWeight: '300', marginTop: 10, marginBottom: 20 }}>Steps today: {props.weeklySteps[0]}</Text>

      <Image source={logo} style={{ width: '18%', height: '12%', marginBottom: '-3%' }} />
      <Image source={appname} style={{ width: '30%', height: '15%', marginBottom: '-3%' }} />


      {/* // each value represents a goal ring in Progress chart */}


      <ProgressChart
        data={data}
        width={Dimensions.get("window").width - 50}
        height={Dimensions.get("window").width - 150}
        strokeWidth={17}
        // radius={15}
        hasLegend={false}
        withCustomBarColorFromData={true}
        // hideLegend={true}
        chartConfig={{
          backgroundColor: '#E8F8F5',
          backgroundGradientFrom: '#E8F8F5',
          backgroundGradientTo: '#E8F8F5',
          //decimalPlaces: 2,
          color: (opacity = 1) => `rgba(20, 143, 119, ${opacity})`,
          // labelColor: (opacity = 1) => `rgba(143, 57, 20, ${opacity})`,
        }}
        style={{
          marginVertical: 0,
          borderRadius: 15,
          shadowColor: '#171717',
          shadowOffset: { width: -2, height: 4 },
          shadowOpacity: 0.2,
          shadowRadius: 3,
        }}
      />

    </View>

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
  MainContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },

});
