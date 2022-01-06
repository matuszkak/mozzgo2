import React, { useEffect } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { useFonts } from '@use-expo/font';
import AppLoading from 'expo-app-loading';
import { Chart } from './Chart';


const Motivate = props => {

  let [fontsLoaded] = useFonts({
    'AvenirNextHeavyItalic': require('../assets/fonts/AvenirNextHeavyItalic.ttf'),
    'AvenirNextULtltalic': require('../assets/fonts/AvenirNextULtltalic.ttf'),
    'AvenirNextDemiItalic': require('../assets/fonts/AvenirNextDemiItalic.ttf'),
    'AvenirNextHeavyCondensed': require('../assets/fonts/AvenirNextHeavyCondensed.ttf'),
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
    setTimeout(() => {
      props.navigation.navigate('Chart')
    }, 3000);
    return (
      <View style={styles.container} >
        <Text style={[styles.logoFont, { fontFamily: 'AvenirNextHeavyItalic' }]}>MozzGo</Text>
        <Text style={[styles.subFont, { fontFamily: 'AvenirNextHeavyCondensed' }]}>Move your ass - let's go!</Text>
      </View>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoFont: {
    fontSize: 80,
    color: '#009688',
    width: '100%',
    textAlign: 'center',
  },
  subFont: {
    marginTop: 6, marginLeft: -15,
    fontSize: 20,
    width: '100%',
    textAlign: 'center',
    color: '#009688',
  }
});

export default Motivate;