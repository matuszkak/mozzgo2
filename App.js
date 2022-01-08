import React, { useState, useEffect } from 'react';
import AppLoading from 'expo-app-loading';

import InnerPage from './components/InnerPage';
import DbSync from './components/Logics/DbSync';
import LoginPage from './components/LoginPage';

import { toggleStateOnFirebase } from './database';
import { getUserData } from './localStorage';
import useStepCounter from './components/Logics/CounterLogic';
import DbExtraSteps from './components/Logics/DbExtraSteps';

export default function App() {
  const [userData, setUserData] = useState(null);
  const [weeklySteps, setweeklySteps] = useStepCounter();
  const [weeklyExtraSteps, setWeeklyExtraSteps] = useState([0, 0, 0, 0, 0, 0, 0]);
  const [send, setSend] = useState(true);

  useEffect(() => {
    (async () => {
      const storedUser = await getUserData();
      if (storedUser) {
        // console.log('STORED USER FROM ASYNCSTORAGE:', storedUser);
        setUserData(storedUser);
      }

      // anonim function triggered right away
    })();
    // fires only when App is loading
  }, []);


  useEffect(() => {
    (async () => {

      // fetch intial Extra steps data
      setWeeklyExtraSteps(DbExtraSteps(userData));[0]


      var qq = 0;
      for (let zs = 0; zs < 7; zs++) {
        if (weeklyExtraSteps[zs] != 0) {
          // console.log(weeklyExtraSteps[zs]);
          qq + qq + 1;
        };
      };
      if (qq = 7) {
        setSend(true);
        console.log(send);

      } else {
        setSend(false);
        console.log("Update not succesful" + weeklyExtraSteps);
      };

    })();
  }, [weeklySteps[0]]);

  console.log("weekly extraSteps App: " + weeklyExtraSteps);

  if (userData === null) {
    return <LoginPage setUserData={setUserData} />;
  } else {

    if (!send) {
      return <AppLoading />
    } else {
      return (
        <InnerPage setUserData={setUserData} userData={userData} weeklySteps={weeklySteps} setWeeklyExtraSteps={setWeeklyExtraSteps} weeklyExtraSteps={weeklyExtraSteps} />
      );
    };
  };
}