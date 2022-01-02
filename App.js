// import all the components we are going to use
import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { BarChart } from 'react-native-chart-kit';
import { Pedometer } from 'expo-sensors';
import AddToSteps from './components/AddToSteps';
// import { formatDate, converttoDay, getMonday, getyesterday, get2daybefore, get3daybefore, get4daybefore, get5daybefore, get6daybefore } from './components/FormatDate.js';


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
import logo from './assets/footz.jpg';
import appname from './assets/Mozzgogif2.gif';


// date formatting
function formatDate(date) {
  var d = new Date(date),
    month = '' + (d.getMonth() + 1),
    day = '' + d.getDate(),
    year = d.getFullYear(),
    hour = d.getHours(),
    minute = d.getMinutes(),
    second = d.getSeconds();

  if (month.length < 2)
    month = '0' + month;
  if (day.length < 2)
    day = '0' + day;
  if (hour.length < 2)
    hour = '0' + hour;
  if (minute.length < 2)
    minute = '0' + minute;
  if (second.length < 2)
    second = '0' + second;

  return ([year, month, day].join('-') + ' ' + [hour, minute, second].join(':'));
}

function getMonday(d) {
  d = new Date(d);
  var day = d.getDay(),
    diff = d.getDate() - day + (day == 0 ? -6 : 1); // adjust when day is sunday
  return new Date(d.setDate(diff));
}

function getyesterday(d) {
  d = new Date(d);
  d.setDate(d.getDate() - 1);
  return new Date(d);
}

function get2daybefore(d) {
  d = new Date(d);
  d.setDate(d.getDate() - 2);
  return new Date(d);
}

function get3daybefore(d) {
  d = new Date(d);
  d.setDate(d.getDate() - 3);
  return new Date(d);
}

function get4daybefore(d) {
  d = new Date(d);
  d.setDate(d.getDate() - 4);
  return new Date(d);
}

function get5daybefore(d) {
  d = new Date(d);
  d.setDate(d.getDate() - 5);
  return new Date(d);
}

function get6daybefore(d) {
  d = new Date(d);
  d.setDate(d.getDate() - 6);
  return new Date(d);
}

function converttoDay(n) {
  var day = ""
  if (n == 1) {
    day = 'Mon'
  }
  if (n == 2) {
    day = 'Tue'
  }
  if (n == 3) {
    day = 'Wed'
  }
  if (n == 4) {
    day = 'Thu'
  }
  if (n == 5) {
    day = 'Fri'
  }
  if (n == 6) {
    day = 'Sat'
  }
  if (n == 0) {
    day = 'Sun'
  }
  return day
}


function AddSteps(extraSteps) {
  console.log(extraSteps);
  return extraSteps;
}

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



export default class App extends React.Component {

  state = {
    isPedometerAvailable: 'checking',
    weekStepCount: 0,
    daybefore2StepCount: 0,
    daybefore3StepCount: 0,
    daybefore4StepCount: 0,
    daybefore5StepCount: 0,
    daybefore6StepCount: 0,
    yesterdayStepCount: 0,
    pastStepCount: 0,
    currentStepCount: 0,
    isAddPopupVisible: false,
    extra: 0,
  };



  componentDidMount() {
    this._subscribe();
  }

  componentWillUnmount() {
    this._unsubscribe();
  }

  _subscribe = () => {
    this._subscription = Pedometer.watchStepCount(result => {
      this.setState({
        currentStepCount: result.steps,
      });
    });

    Pedometer.isAvailableAsync().then(
      result => {
        this.setState({
          isPedometerAvailable: String(result),
        });
      },
      error => {
        this.setState({
          isPedometerAvailable: 'Could not get isPedometerAvailable: ' + error,
        });
      }
    );

    Pedometer.getStepCountAsync(start, end).then(
      result => {
        this.setState({ pastStepCount: result.steps });
      },
      error => {
        this.setState({
          pastStepCount: 'Could not get stepCount: ' + error,
        });
      }
    );

    Pedometer.getStepCountAsync(yesterday, start).then(
      result => {
        this.setState({ yesterdayStepCount: result.steps });
      },
      error => {
        this.setState({
          pastStepCount: 'Could not get stepCount: ' + error,
        });
      }
    );

    Pedometer.getStepCountAsync(dbefore2, yesterday).then(
      result => {
        this.setState({ daybefore2StepCount: result.steps });
      },
      error => {
        this.setState({
          pastStepCount: 'Could not get stepCount: ' + error,
        });
      }
    );

    Pedometer.getStepCountAsync(dbefore3, dbefore2).then(
      result => {
        this.setState({ daybefore3StepCount: result.steps });
      },
      error => {
        this.setState({
          pastStepCount: 'Could not get stepCount: ' + error,
        });
      }
    );

    Pedometer.getStepCountAsync(dbefore4, dbefore3).then(
      result => {
        this.setState({ daybefore4StepCount: result.steps });
      },
      error => {
        this.setState({
          pastStepCount: 'Could not get stepCount: ' + error,
        });
      }
    );

    Pedometer.getStepCountAsync(dbefore5, dbefore4).then(
      result => {
        this.setState({ daybefore5StepCount: result.steps });
      },
      error => {
        this.setState({
          pastStepCount: 'Could not get stepCount: ' + error,
        });
      }
    );

    Pedometer.getStepCountAsync(dbefore6, dbefore5).then(
      result => {
        this.setState({ daybefore6StepCount: result.steps });
      },
      error => {
        this.setState({
          pastStepCount: 'Could not get stepCount: ' + error,
        });
      }
    );

    Pedometer.getStepCountAsync(lastMonday, end).then(
      result => {
        this.setState({ weekStepCount: result.steps });
      },
      error => {
        this.setState({
          pastStepCount: 'Could not get stepCount: ' + error,
        });
      }
    );


  };



  _unsubscribe = () => {
    this._subscription && this._subscription.remove();
    this._subscription = null;
  };



  render() {
    var extra = 10000;
    var vis = this.state.isAddPopupVisible;
    var db6 = this.state.daybefore6StepCount;
    var db5 = this.state.daybefore5StepCount;
    var db4 = this.state.daybefore4StepCount;
    var db3 = this.state.daybefore3StepCount;
    var db2 = this.state.daybefore2StepCount;
    var db = this.state.daybeforeStepCount;
    var y = this.state.yesterdayStepCount;
    var t = this.state.pastStepCount + this.state.currentStepCount + extra;



    return (
      <View style={styles.container}>
        <Image source={logo} style={{ width: 100, height: 100 }} />
        <Image source={appname} style={{ width: 150, height: 100 }} />

        <Text style={{ color: 'green', fontSize: 18 }}>{formatDate(new Date())}</Text>
        <Text></Text>

        <Text style={{ color: 'green', fontSize: 18 }}>Steps taken this week: {this.state.weekStepCount + this.state.currentStepCount}</Text>

        <Text></Text>
        <Text style={{ color: 'green', fontSize: 18, marginBottom: 10 }}>Move your ass watch this go up: {this.state.currentStepCount}</Text>


        <BarChart
          data={{
            labels: [db6_day, db5_day, db4_day, db3_day, db2_day, y_day, t_day],
            datasets: [
              {
                data: [db6, db5, db4, db3, db2, y, t],
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

            this.setState({ isAddPopupVisible: true });
          }}
        />
        <AddToSteps
          onAdd={AddSteps}
          visible={vis}
          extra={extra}
          onCancel={() => {
            this.setState({ isAddPopupVisible: false });
          }}
        />
      </View>
    );
  }
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


