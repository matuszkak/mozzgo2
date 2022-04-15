import React, { useState, useEffect } from 'react';
import AppLoading from 'expo-app-loading';
import { LogBox } from 'react-native';

import InnerPage from './components/InnerPage';
import LoginPage from './components/LoginPage';
import { getUserData } from './localStorage';
import useStepCounter from './components/Logics/CounterLogic';


export default function App() {
  const [userData, setUserData] = useState(null);
  const [weeklySteps, setWeeklySteps] = useStepCounter();

  // LogBox.ignoreLogs(['AsyncStorage has been extracted from react-native core']);
  LogBox.ignoreAllLogs();

  // load user
  useEffect(() => {
    (async () => {
      const storedUser = await getUserData();
      if (storedUser) {
        setUserData(storedUser);
      }
    })();
  }, []);

  // daychange
  // useEffect(() => {


  //   var now = new Date();
  //   var tomorrow = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1);
  //   var tilltomorrow = tomorrow - now;
  //   setTimeout(setWeeklySteps(useStepCounter()), tilltomorrow);


  // }, []);

  // if user logged in go to Homepage, otherwise go to Login page
  if (userData === null) {
    return <LoginPage setUserData={setUserData} />;
  } else {

    return (
      <InnerPage setUserData={setUserData} userData={userData} weeklySteps={weeklySteps} setWeeklySteps={setWeeklySteps} />
    );
    // };
  };
}