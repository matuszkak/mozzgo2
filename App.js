import React, { useState, useEffect } from 'react';
import AppLoading from 'expo-app-loading';

import InnerPage from './components/InnerPage';
import LoginPage from './components/LoginPage';
import { getUserData } from './localStorage';
import useStepCounter from './components/Logics/CounterLogic';
import DbSync from './components/Logics/DbSync';

const apptime = new Date();

export default function App() {
  const [userData, setUserData] = useState(null);
  const [actual, setActual] = useState(false);
  const [appTime, setAppTime] = useState(apptime);
  const [weeklySteps, setweeklySteps] = useStepCounter(new Date(appTime));



  // load user
  useEffect(() => {
    (async () => {
      const storedUser = await getUserData();
      if (storedUser) {
        setUserData(storedUser);
      }
    })();

    DbSync(userData, weeklySteps);


    const dayend = new Date(apptime);
    dayend.setHours(23, 59, 59, 59);
    const delay = dayend - apptime;
    setTimeout(() => {

      setAppTime(new Date());
      DbSync(userData, weeklySteps);
      if (actual === true) {
        setActual(false);
      } else {
        setActual(true);
      }

    }, delay);

    console.log(apptime);
    console.log(appTime);
    console.log(dayend);
    console.log(delay);

  }, [actual]);

  // if user logged in go to Homepage, otherwise go to Login page
  if (userData === null) {
    return <LoginPage setUserData={setUserData} />;
  } else {

    return (
      <InnerPage setUserData={setUserData} userData={userData} weeklySteps={weeklySteps} appTime={appTime} />
    );
    // };
  };
}