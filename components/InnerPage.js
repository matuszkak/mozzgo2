import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as React from 'react';

import Chart from './Chart';
import SettingsPage from './SettingsPage';
import Home from './Home';
import HistoryPage from './HistoryPage';
import Motivate from './Motivate';

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
              toggleUserState={props.toggleUserState}
            />
          )}
        </Stack.Screen>
        <Stack.Screen name="Motivate">
          {navigatorProps => (
            <Motivate
              {...navigatorProps}
              userData={props.userData}
            />
          )}
        </Stack.Screen>
        <Stack.Screen name="Chart">
          {navigatorProps => (
            <Chart
              {...navigatorProps}
              userData={props.userData}
              toggleUserState={props.toggleUserState}
            />
          )}
        </Stack.Screen>
        <Stack.Screen name="Step history">
          {navigatorProps => (
            <HistoryPage
              {...navigatorProps}
              userData={props.userData}
              toggleUserState={props.toggleUserState}
            />
          )}
        </Stack.Screen>
        <Stack.Screen name="Settings">
          {navigatorProps => (
            <SettingsPage
              {...navigatorProps}
              setUserData={props.setUserData}
              userData={props.userData}
              toggleUserState={props.toggleUserState}
            />
          )}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
export default InnerPage;