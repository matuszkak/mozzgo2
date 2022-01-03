// import all the components we are going to use
import React, { useState, useEffect, setState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { BarChart } from 'react-native-chart-kit';
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

  const [totalStepCount, settotalStepCount] = useStepCounter()[0];
  const [weeklySteps, setweeklySteps] = useStepCounter();
  const [extra, setextra] = useState('0');
  const [isAddPopupVisible, setisAddPopupVisible] = useState(false);
  const [sport, setSport] = useState('foci');
  const [day, setDay] = useState(currentTime.toLocaleDateString());


  var SevendaySteps = 0;
  for (let i = 1; i < 7; i++) {
    SevendaySteps = SevendaySteps + weeklySteps[i];
  }

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
    var checksport = "Swiming";
    (async () => {

      var s = [];
      s = await getHistoryBySport(props.userData.email, checksport);
      // console.log(s);
      // console.log(s[0]);
      if (s.length < 1) {
        for (let j = 0; j < 7; j++) {
          saveStepsOnFirebase(props.userData.email, checksport, week[j], weeklySteps[j]);
        }

      } else {
        // console.log(s[0]);
        // console.log(s[0].day);
        // console.log(week);

        for (let k = 0; k < 7; k++) {
          if (week[k] > s[0].day) {
            // console.log(week[k]);
            saveStepsOnFirebase(props.userData.email, checksport, week[k], weeklySteps[k]);
          }
        }
      }

      // aggregate steps for last 7 days
      var weeklyStepsAll = [];
      for (let m = 0; m < 7; m++) {
        dailyrecords = await getHistoryByDay(props.userData.email, week[m]);
        aggr = 0;
        for (let l = 0; l < dailyrecords.length; l++) {
          aggr = aggr + parseInt(dailyrecords[l].steps);
          weeklyStepsAll[m] = aggr;
        }
      }
      console.log(weeklyStepsAll);
      console.log(weeklySteps);

    })();
  }, []);



  function AddSteps(steps) {
    console.log(steps);
    setextra(steps);
  }


  return (
    <View style={styles.container}>
      <Image source={logo} style={{ width: 100, height: 100 }} />
      <Image source={appname} style={{ width: 150, height: 100 }} />

      <Text style={{ color: 'green', fontSize: 18 }}>{formatDate(new Date())}</Text>
      <Text></Text>

      <Text style={{ color: 'green', fontSize: 18 }}>Steps taken in a week: {SevendaySteps + parseInt(extra)}</Text>

      <Text></Text>
      <Text style={{ color: 'green', fontSize: 18, marginBottom: 10 }}>Move your ass watch this go up: {weeklySteps[0]}</Text>


      <BarChart
        data={{
          labels: [db6_day, db5_day, db4_day, db3_day, db2_day, y_day, t_day],
          datasets: [
            {
              data: [weeklySteps[6], weeklySteps[5], weeklySteps[4], weeklySteps[3], weeklySteps[2], weeklySteps[1], weeklySteps[0]],
              colors: [
                (opacity = 1) => `#008000`,
                (opacity = 1) => `#008000`,
                (opacity = 1) => `#008000`,
                (opacity = 1) => `#008000`,
                (opacity = 1) => `#008000`,
                (opacity = 1) => `#008000`,
                (opacity = 1) => `#ff794d`],
            }
          ]
        }}

        width={Dimensions.get('window').width - 30}
        height={320}
        fromZero={true}
        showValuesOnTopOfBars={true}
        withCustomBarColorFromData={true}
        flatColor={false}
        showBarTops={false}

        verticalLabelRotation={0}

        chartConfig={{
          barPercentage: .7,

          backgroundColor: '#f2f2f2',
          backgroundGradientFrom: '#f2f2f2',
          backgroundGradientTo: '#f2f2f2',
          labelColor: () => "black",


          decimalPlaces: 0,
          color: (opacity = 1) => `rgba(255, 0, 0, ${opacity})`,
        }}

        style={{
          marginVertical: 58,
          marginHorizontal: 8,
          borderRadius: 6,
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
        onAdd={AddSteps}
        userData={props.userData}
        visible={isAddPopupVisible}
        extra={extra}
        onCancel={() => {
          setisAddPopupVisible(false);
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

});