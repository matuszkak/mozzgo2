import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as React from 'react';

import Motivate from './Motivate';
import Home from './Home';
import Chart from './Chart';
import HistoryPage from './HistoryPage';
import SettingsPage from './SettingsPage';

const Stack = createNativeStackNavigator();

function InnerPage(props) {


  return (
    <NavigationContainer>
      <Stack.Navigator>

        <Stack.Screen name="Home">
          {navigatorProps => (
            <Home
              {...navigatorProps}
              setUserData={props.setUserData}
              userData={props.userData}
              weeklySteps={props.weeklySteps}
              appTime={props.appTime}
            />
          )}
        </Stack.Screen>
        <Stack.Screen name="Motivate">
          {navigatorProps => (
            <Motivate
              {...navigatorProps}
              setUserData={props.setUserData}
              userData={props.userData}
            />
          )}
        </Stack.Screen>
        <Stack.Screen name="Chart">
          {navigatorProps => (
            <Chart
              {...navigatorProps}
              userData={props.userData}
              weeklySteps={props.weeklySteps}
              appTime={props.appTime}

            />
          )}
        </Stack.Screen>
        <Stack.Screen name="Step history">
          {navigatorProps => (
            <HistoryPage
              {...navigatorProps}
              userData={props.userData}
            />
          )}
        </Stack.Screen>
        <Stack.Screen name="Settings">
          {navigatorProps => (
            <SettingsPage
              {...navigatorProps}
              setUserData={props.setUserData}
              userData={props.userData}
            />
          )}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
export default InnerPage;