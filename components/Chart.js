// import all the components we are going to use
import React, { useState, useEffect, setState } from 'react';

import { StatusBar } from 'expo-status-bar';
import { StackedBarChart } from 'react-native-chart-kit';
// import { Pedometer } from 'expo-sensors';
import AddToSteps from './AddToSteps';
import useStepCounter from './CounterLogic';
import { getHistory, getHistoryBySport, getHistoryByDay, saveStepsOnFirebase } from '../database';

import { formatDate, converttoDay, getMonday, getyesterday, get2daybefore, get3daybefore, get4daybefore, get5daybefore, get6daybefore } from './FormatDate.js';

import {
  SafeAreaView,
  Image,
  View,
  Text,
  StyleSheet,
  Dimensions,
  ScrollView,
  Button,
} from 'react-native';

// import assets
import logo from '../assets/footz.jpg';
import appname from '../assets/Mozzgogif2.gif';

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


var t_day = converttoDay(end.getDay());
var y_day = converttoDay(yesterday.getDay());
var db2_day = converttoDay(dbefore2.getDay());
var db3_day = converttoDay(dbefore3.getDay());
var db4_day = converttoDay(dbefore4.getDay());
var db5_day = converttoDay(dbefore5.getDay());
var db6_day = converttoDay(dbefore6.getDay());

export default function Chart(props) {
  const currentTime = new Date();

  const [weeklySteps, setweeklySteps] = useStepCounter();

  const [weeklyStepsALL, setweeklyStepsALL] = useState([]);
  const [isAddPopupVisible, setisAddPopupVisible] = useState(false);
  const [sport, setSport] = useState('walking');
  const [day, setDay] = useState(currentTime.toLocaleDateString());

  // calculate no. of steps for the last 7 days
  var SevendaySteps = 0;
  for (let i = 1; i < 7; i++) {
    SevendaySteps = SevendaySteps + weeklySteps[i];
  }

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

  useEffect(() => {

    // sync db if no data for the last few days within the week
    var checksport = sport;

    (async () => {

      var s = [];
      s = await getHistoryBySport(props.userData.email, checksport);
      // console.log(s);
      // console.log(s[0]);

      if (s.length < 1) {
        for (let j = 1; j < 7; j++) {
          saveStepsOnFirebase(props.userData.email, checksport, week[j], weeklySteps[j]);
        }

      } else {
        // console.log(s[0]);
        // console.log(s[0].day);
        // console.log(week);

        for (let k = 1; k < 7; k++) {
          if (week[k] > s[0].day) {
            // console.log(week[k]);
            saveStepsOnFirebase(props.userData.email, checksport, week[k], weeklySteps[k]);
          }
        }
      };

      console.log("Database updated!")
      // console.log(weeklySteps[0]);

    })();
  }, []);

  useEffect(() => {

    // aggregate data in case of a change

    (async () => {

      // aggregate steps for ALL sports for last 7 days
      var w = [];

      var dailyrecords = [];
      // console.log(week);
      for (let m = 0; m < 7; m++) {
        dailyrecords = await getHistoryByDay(props.userData.email, week[m]);
        // console.log(dailyrecords);

        var a = 0;

        for (let l = 0; l < dailyrecords.length; l++) {
          a = a + parseInt(dailyrecords[l].steps);
        }
        w.push(a);
      };

      w[0] = w[0] + weeklySteps[0];

      console.log("***");
      // console.log(w);
      setweeklyStepsALL(w);
      console.log(weeklyStepsALL);
      console.log(weeklySteps);

    })();
  }, [weeklySteps[1]]);

  var extra = []
  const weALL = 110;
  const we = 10;
  for (let n = 0; n < 7; n++) {
    extra.push((weALL - we) * Math.floor(Math.random() * 10));
  };
  console.log(extra);


  return (
    <View style={styles.container}>
      <Image source={logo} style={{ width: 100, height: 100 }} />
      <Image source={appname} style={{ width: 150, height: 100 }} />

      <Text style={{ color: '#148F77', fontSize: 18, fontWeight: '300' }}>{formatDate(new Date())}</Text>
      <Text></Text>

      <Text style={{ color: '#148F77', fontSize: 18, fontWeight: '300' }}>Steps in a week: {SevendaySteps}</Text>

      <Text></Text>
      <Text style={{ color: '#148F77', fontSize: 18, fontWeight: '300', marginBottom: 10 }}>Move your ass watch this go up: {weeklySteps[0]}</Text>


      <StackedBarChart
        data={{
          labels: [db6_day, db5_day, db4_day, db3_day, db2_day, y_day, t_day],
          // legend: ['Walk', 'Other'],
          data: [
            [weeklySteps[6], extra[6]],
            [weeklySteps[5], extra[5]],
            [weeklySteps[4], extra[4]],
            [weeklySteps[3], extra[3]],
            [weeklySteps[2], extra[2]],
            [weeklySteps[1], extra[1]],
            [weeklySteps[0], extra[0]],

          ],
          barColors: ["#148F77", "#ff794d"],
        }}

        width={Dimensions.get("window").width - 50}
        height={500}
        fromZero={true}
        showValuesOnTopOfBars={false}
        // withCustomBarColorFromData={false}
        // flatColor={true}
        // showBarTops={true}
        decimalPlaces={0}
        marginHorizontal={50}
        // barRadius={10}
        // verticalLabelRotation={0}

        chartConfig={{
          // strokeWidth: 1,
          barPercentage: .7,
          // marginHorizontal: 70,
          // barRadius: 50,
          backgroundColor: '#E8F8F5',
          backgroundGradientFrom: '#E8F8F5',
          backgroundGradientTo: '#E8F8F5',
          labelColor: () => "black",

          color: (opacity = 1) => `rgba(255, 0, 0, ${opacity})`,
        }}

        style={{
          marginTop: 20,
          marginLeft: 0,
          marginHorizontal: 0,
          borderRadius: 20,
          marginBottom: -70,
        }}
      />
      <Button
        title={'Add steps'}
        onPress={() => {
          // window.alert('ez egy popup');

          setisAddPopupVisible(true);
        }}
      />
      <AddToSteps
        userData={props.userData}
        visible={isAddPopupVisible}
        onCancel={() => {
          setisAddPopupVisible(false);
        }}
      />
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