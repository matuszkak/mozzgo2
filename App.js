import React, { useState, useEffect } from 'react';
import AppLoading from 'expo-app-loading';

import InnerPage from './components/InnerPage';
import LoginPage from './components/LoginPage';
import { getUserData } from './localStorage';
import useStepCounter from './components/Logics/CounterLogic';
import DbSync from './components/Logics/DbSync';


export default function App() {

  const [userData, setUserData] = useState(null);
  const [appTime, setAppTime] = useState(new Date());
  const [weeklySteps, setweeklySteps] = useStepCounter();

  // load user
  useEffect(() => {

    (async () => {
      const storedUser = await getUserData();
      // console.log(userData);
      if (storedUser) {
        setUserData(storedUser);


      };
    });
  }, []);

  // useEffect(() => {
  //   if (userData) {
  //     ;
  //   }
  // }, [userData]);
  // useEffect(() => {
  //   setAppTime(new Date());
  //   setDayend(new Date().setHours(23, 59, 59, 999));
  // var dayend = new Date(appTime);
  // dayend.setHours(23, 59, 59, 59);

  // setAppTime(new Date());

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