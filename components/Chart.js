import React, { useState, useEffect, setState } from 'react';
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

import useStepCounter from './Logics/CounterLogic';
import ExtraSteps from './Logics/DbExtraSteps';
import AddToSteps from './AddToSteps';
import { formatDate, converttoDay, getMonday, getyesterday, get2daybefore, get3daybefore, get4daybefore, get5daybefore, get6daybefore } from './Logics/FormatDate.js';

import logo from '../assets/footz.jpg';
import appname from '../assets/Mozzgogif2.gif';
import DbExtraSteps from './Logics/DbExtraSteps';


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

  // console.log(ExtraSteps());
  const currentTime = new Date();
  const [weeklySteps, setweeklySteps] = useStepCounter();
  // const [weeklyExtraSteps, setweeklyExtraSteps] = DbExtraSteps(props.userData);
  const [weeklyExtraSteps, setweeklyExtraSteps] = useState([1000, 2000, 300, 0, 1000, 0, 500]);

  const [isAddPopupVisible, setisAddPopupVisible] = useState(false);
  // const [sport, setSport] = useState('walking');
  const [day, setDay] = useState(currentTime.toLocaleDateString());
  const [sync, setSync] = useState(false);


  console.log("extra steps static: " + weeklyExtraSteps);
  console.log("extra steps real: " + DbExtraSteps(props.userData));

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

  function addArrayElements(total, num) {
    return total + num;
  }

  console.log("weekly steps Chart: " + weeklySteps);

  var weALL = 0;
  weALL = weeklySteps.reduce(addArrayElements) + weeklyExtraSteps.reduce(addArrayElements);

  return (
    <View style={styles.container}>

      <Text style={{ color: '#148F77', fontSize: 18, fontWeight: '300', marginTop: 20 }}>Steps in a week: {weALL}</Text>

      <Text style={{ color: '#148F77', fontSize: 18, fontWeight: '300', marginTop: 10 }}>Move your ass watch this go up: {weeklySteps[0] + weeklyExtraSteps[0]}</Text>

      <Text style={{ color: '#148F77', fontSize: 18, fontWeight: '300', marginTop: 10 }}>{formatDate(new Date())}</Text>
      <Text></Text>

      <Image source={logo} style={{ width: 100, height: 100, marginBottom: -10 }} />
      <Image source={appname} style={{ width: 150, height: 100, marginBottom: -20 }} />



      <StackedBarChart
        data={{
          labels: [db6_day, db5_day, db4_day, db3_day, db2_day, y_day, t_day],
          // legend: ['Walk', 'Other'],
          data: [
            [weeklySteps[6], weeklyExtraSteps[6]],
            [weeklySteps[5], weeklyExtraSteps[5]],
            [weeklySteps[4], weeklyExtraSteps[4]],
            [weeklySteps[3], weeklyExtraSteps[3]],
            [weeklySteps[2], weeklyExtraSteps[2]],
            [weeklySteps[1], weeklyExtraSteps[1]],
            [weeklySteps[0], weeklyExtraSteps[0]],

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
          shadowColor: '#171717',
          shadowOffset: { width: -2, height: 4 },
          shadowOpacity: 0.2,
          shadowRadius: 3,

        }}
      />
      <View style={styles.inputContainer}>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.buttonView}
            onPress={() => {
              setisAddPopupVisible(true);
            }}>
            <Text style={styles.buttonText}> Add steps </Text>
          </TouchableOpacity>
        </View>
      </View>


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
  buttonContainer: {
    // flexDirection: 'row',
    marginTop: -30,
    width: '100%',
    justifyContent: 'center',
  },
  inputContainer: {
    // paddingTop: '20%',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,

  },
  buttonView: {
    elevation: 8,
    backgroundColor: '#009688',
    borderRadius: 12,
    paddingVertical: 10,
    paddingHorizontal: 12,
    margin: 10,
  },
  buttonText: {
    fontSize: 18,
    color: '#fff',
    fontWeight: '400',
    alignSelf: 'center',
    textTransform: 'uppercase',
  },

});