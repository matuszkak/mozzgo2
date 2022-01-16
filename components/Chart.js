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
import AppLoading from 'expo-app-loading';

import AddToSteps from './AddToSteps';
import { formatDate, converttoDay, getMonday, getnDayBefore } from './Logics/FormatDate.js';

import logo from '../assets/footz.jpg';
import appname from '../assets/Mozzgogif2.gif';
import DbExtraSteps from './Logics/DbExtraSteps';
import DbSync from './Logics/DbSync';


export default function Chart(props) {

  const [weeklyExtraSteps, setWeeklyExtraSteps] = useState([0, 0, 0, 0, 0, 0, 0]);
  const [weALL, setWeALL] = useState();
  const [isAddPopupVisible, setisAddPopupVisible] = useState(false);
  const [week, setWeek] = useState([]);
  const [sync, setSync] = useState(false);
  const [screenUpdateNeeded, setScreenUpdateNeeded] = useState(true);

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

  // add values in an array
  function addArrayElements(array) {
    var sum = 0;
    for (let j = 0; j < array.length; j++) {
      sum = sum + array[j];
    }
    return sum;
  }

  // download extra steps from DB
  async function downloadExtraSteps() {
    let tt = await DbExtraSteps(props.userData);
    setWeeklyExtraSteps(tt[0]);
    return weeklyExtraSteps;
    ;
  }

  // call overall steps for last a week (normal + extra)
  function calcStepsAll() {
    setWeALL(addArrayElements(props.weeklySteps) + addArrayElements(weeklyExtraSteps));
    return
  }

  useEffect(() => {

    // identify dates for last 7 days
    var w = [];
    for (i = 0; i < 7; i++) {
      var d = new Date();
      d.setDate(d.getDate() - i);
      w[i] = dateyyyymmdd(new Date(d));
    }
    setWeek(w);
    console.log(week);

    if (screenUpdateNeeded) {

      downloadExtraSteps().then(calcStepsAll).then(setSync(true)).then(console.log(weeklyExtraSteps)).then(setScreenUpdateNeeded(false)).then(console.log(sync));
    };

  }, [weeklyExtraSteps]);

  if (!sync) {
    return <AppLoading />;

  } else {

    DbSync(props.userData, props.weeklySteps);

    return (
      <View style={styles.container}>

        <Text style={{ color: '#148F77', fontSize: 18, fontFamily: 'AvenirNextDemiItalic', fontWeight: '300', marginTop: 20 }}>Steps in a week / daily average: {weALL} / {Math.round(weALL / 7)}</Text>

        <Text style={{ color: '#148F77', fontSize: 18, fontFamily: 'AvenirNextDemiItalic', fontWeight: '300', marginTop: 10, marginBottom: 20 }}>Move your ass watch this go up: {props.weeklySteps[0] + 0}</Text>

        <Image source={logo} style={{ width: 100, height: 100, marginBottom: -10 }} />
        <Image source={appname} style={{ width: 150, height: 100, marginBottom: -20 }} />

        <StackedBarChart
          data={{
            labels: [converttoDay(new Date(week[6]).getDay()), converttoDay(new Date(week[5]).getDay()), converttoDay(new Date(week[4]).getDay()), converttoDay(new Date(week[3]).getDay()), converttoDay(new Date(week[2]).getDay()), converttoDay(new Date(week[1]).getDay()), converttoDay(new Date(week[0]).getDay())],
            // legend: ['Walk', 'Other'],
            data: [
              [props.weeklySteps[6], weeklyExtraSteps[6]],
              [props.weeklySteps[5], weeklyExtraSteps[5]],
              [props.weeklySteps[4], weeklyExtraSteps[4]],
              [props.weeklySteps[3], weeklyExtraSteps[3]],
              [props.weeklySteps[2], weeklyExtraSteps[2]],
              [props.weeklySteps[1], weeklyExtraSteps[1]],
              [props.weeklySteps[0], weeklyExtraSteps[0]],
            ],
            barColors: ["#148F77", "#8f3914"],
          }}

          width={Dimensions.get("window").width - 50}
          height={400}
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
        <Text style={{ color: '#148F77', fontSize: 14, fontFamily: 'AvenirNextULtltalic', fontWeight: '300', marginTop: 90 }}> Updated at {formatDate(new Date())}</Text>
        <Text></Text>
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
          onAdd={() => { setScreenUpdateNeeded(true); }}
          visible={isAddPopupVisible}
          onCancel={() => {
            setisAddPopupVisible(false);
          }}
        />
      </View >
    );
  };
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
    marginTop: -50,
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