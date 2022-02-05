import React, { useState, useEffect } from 'react';
import AppLoading from 'expo-app-loading';

import InnerPage from './components/InnerPage';
import LoginPage from './components/LoginPage';
import { getUserData } from './localStorage';
import useStepCounter from './components/Logics/CounterLogic';


export default function App() {
  const [userData, setUserData] = useState(null);
  const [weeklySteps, setweeklySteps] = useStepCounter();


  // load user
  useEffect(() => {
    (async () => {
      const storedUser = await getUserData();
      if (storedUser) {
        setUserData(storedUser);
      }
    })();
  }, []);

  // if user logged in go to Homepage, otherwise go to Login page
  if (userData === null) {
    return <LoginPage setUserData={setUserData} />;
  } else {

    return (
      <InnerPage setUserData={setUserData} userData={userData} weeklySteps={weeklySteps} />
    );
    // };
  };
}