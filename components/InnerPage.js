import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as React from 'react';
import Chart from './Chart';
import SettingsPage from './SettingsPage';
import StatusPage from './StatusPage';
import HistoryPage from './HistoryPage';

const Stack = createNativeStackNavigator();
function InnerPage(props) {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Your steps">
          {navigatorProps => (
            <StatusPage
              {...navigatorProps}
              setUserData={props.setUserData}
              userData={props.userData}
              toggleUserState={props.toggleUserState}
            />
          )}
        </Stack.Screen>
        <Stack.Screen name="Add steps">
          {navigatorProps => (
            <Chart
              {...navigatorProps}
              userData={props.userData}
              toggleUserState={props.toggleUserState}
            />
          )}
        </Stack.Screen>
        <Stack.Screen name="History of steps">
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