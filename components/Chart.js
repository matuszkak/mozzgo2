// import all the components we are going to use
import React, { useState, useEffect, setState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { BarChart } from 'react-native-chart-kit';
// import { Pedometer } from 'expo-sensors';
import AddToSteps from './AddToSteps';
import useStepCounter from './CounterLogic';

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

  const [totalStepCount, settotalStepCount] = useStepCounter();
  const [extra, setextra] = useState('0');
  const [isAddPopupVisible, setisAddPopupVisible] = useState(false);

  function AddSteps(steps) {
    console.log(steps);
    setextra(steps);
  }

  // var extra = this.state.extra;
  // var vis = this.state.isAddPopupVisible;
  //   var db6 = this.state.daybefore6StepCount;
  //   var db5 = this.state.daybefore5StepCount;
  //   var db4 = this.state.daybefore4StepCount;
  //   var db3 = this.state.daybefore3StepCount;
  //   var db2 = this.state.daybefore2StepCount;
  //   var db = this.state.daybeforeStepCount;
  //   var y = this.state.yesterdayStepCount;
  //   var t = this.state.pastStepCount + this.state.currentStepCount + extra;

  return (
    <View style={styles.container}>
      <Image source={logo} style={{ width: 100, height: 100 }} />
      <Image source={appname} style={{ width: 150, height: 100 }} />

      <Text style={{ color: 'green', fontSize: 18 }}>{formatDate(new Date())}</Text>
      <Text></Text>

      <Text style={{ color: 'green', fontSize: 18 }}>Steps taken this week: {0 + totalStepCount}</Text>

      <Text></Text>
      <Text style={{ color: 'green', fontSize: 18, marginBottom: 10 }}>Move your ass watch this go up: {totalStepCount + parseInt(extra)}</Text>


      <BarChart
        data={{
          labels: [db6_day, db5_day, db4_day, db3_day, db2_day, y_day, t_day],
          datasets: [
            {
              data: [0, 0, 0, 0, 0, 0, totalStepCount + parseInt(extra)],
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


