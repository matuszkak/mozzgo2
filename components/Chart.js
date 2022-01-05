import React, { useState, useEffect, setState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StackedBarChart } from 'react-native-chart-kit';
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
  TouchableOpacity,
} from 'react-native';
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
  const [weeklyStepsWoWalking, setweeklyStepsWoWalking] = useState([]);
  const [sevendaySteps, setSevendaySteps] = useState(0);
  const [isAddPopupVisible, setisAddPopupVisible] = useState(false);
  const [sport, setSport] = useState('walking');
  const [day, setDay] = useState(currentTime.toLocaleDateString());

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

  useEffect(() => {

    // SYNC DB IF NO DATA FOR THE LAST (FEW) DAYS - FOR MAX. 7 DAYS
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

    // calculate no. of steps for the last 7 days

    var sds = weeklySteps.reduce(addArrayElements);
    setSevendaySteps(sds);
    // console.log(sds);

    // aggregate data in case of a change

    (async () => {

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
      console.log(weeklySteps);

    })();
  }, [weeklySteps[1]]);




  var extra = [];
  var weALL = 0;
  const we = 110;
  for (let n = 0; n < 7; n++) {
    extra.push(we * Math.floor(Math.random() * 10));
  };
  weALL = extra.reduce(addArrayElements);


  return (
    <View style={styles.container}>

      <Text style={{ color: '#148F77', fontSize: 18, fontWeight: '300', marginTop: 20 }}>Steps in a week: {sevendaySteps + weALL}</Text>

      <Text style={{ color: '#148F77', fontSize: 18, fontWeight: '300', marginTop: 10 }}>Move your ass watch this go up: {weeklySteps[0] + extra[0]}</Text>

      <Text style={{ color: '#148F77', fontSize: 18, fontWeight: '300', marginTop: 10 }}>{formatDate(new Date())}</Text>
      <Text></Text>

      <Image source={logo} style={{ width: 100, height: 100, marginBottom: -10 }} />
      <Image source={appname} style={{ width: 150, height: 100, marginBottom: -20 }} />



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