import React, { useState, useEffect } from 'react';
import AppLoading from 'expo-app-loading';

import InnerPage from './components/InnerPage';
import LoginPage from './components/LoginPage';
import { getUserData } from './localStorage';
import useStepCounter from './components/Logics/CounterLogic';
import DbSync from './components/Logics/DbSync';



export default function App() {
  const apptime = new Date();
  const [userData, setUserData] = useState(null);
  const [actual, setActual] = useState(false);
  const [appTime, setAppTime] = useState(apptime);
  const [weeklySteps, setweeklySteps] = useStepCounter(new Date(appTime));



  // load user
  useEffect(() => {
    (async () => {
      const storedUser = await getUserData();
      if (storedUser) {
        setUserData(storedUser).then(() => DbSync(userData, weeklySteps))
      };
    });
  }, []);

  // useEffect(() => {
  //   if (userData) {
  //     ;
  //   }
  // }, [userData]);

  useEffect(() => {
    var dayend = new Date(apptime);
    dayend.setHours(23, 59, 59, 59);
    var delay = dayend - apptime;
    setTimeout(() => {

      setAppTime(new Date());
      DbSync(userData, weeklySteps);
      if (actual === true) {
        setActual(false);
      } else {
        setActual(true);
      }

    }, delay);

    console.log(apptime + " apptime");
    console.log(appTime + " appTime");
    console.log(dayend + " dayend");
    console.log(delay / 3600000 + " hours until day change");

  }, [actual]);

  // if user logged in go to Homepage, otherwise go to Login page
  if (userData === null) {
    return <LoginPage setUserData={setUserData} />;
  } else {
    // setTimeout(() => (async () => { DbSync(userData, weeklySteps) })(), 60000);
    return (
      <InnerPage setUserData={setUserData} userData={userData} weeklySteps={weeklySteps} appTime={appTime} />
    );

  };
}