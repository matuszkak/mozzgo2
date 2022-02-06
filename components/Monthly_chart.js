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

  const [stepHistory, setStepHistory] = useState(null);

  useEffect(() => {
    (async () => {
      // console.log(props.userData.email);
      const historyFromFirebase = await getHistory(props.userData.email);
      setStepHistory(historyFromFirebase);
      console.log("Step history:\n");
      console.log(historyFromFirebase);
      console.log("Last day in db: " + historyFromFirebase[0].day);
      var date = new Date(historyFromFirebase[0].day);
      var firstDayOfMonth = new Date(date.getFullYear(), date.getMonth(), 1);
      var lastDayOfMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0);
      console.log(date, firstDayOfMonth, lastDayOfMonth);
      storeStepData(historyFromFirebase);
    })().then(
      (async () => {
        console.log("Steps from async storage:\n");
        const stepssss = await getStepData();
        console.log(stepssss);
      })());
  }, []);



  return (
    <View style={styles.container}>

      <Text style={{ color: '#148F77', fontSize: 18, fontFamily: 'AvenirNextDemiItalic', fontWeight: '300', marginTop: 20 }}>Steps in a month / monthly average: 30000 / {Math.round(30000 / 30)}</Text>

      <Text style={{ color: '#148F77', fontSize: 18, fontFamily: 'AvenirNextDemiItalic', fontWeight: '300', marginTop: 10, marginBottom: 20 }}>Move your ass watch this go up: {props.weeklySteps[0] + 0}</Text>

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
