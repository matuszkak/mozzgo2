import React, { useEffect } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { useFonts } from '@use-expo/font';


export default function Motivate(props) {

  let [fontsLoaded] = useFonts({
    'AvenirNextHeavyItalic': require('../assets/fonts/AvenirNextHeavyItalic.ttf'),
    'AvenirNextULtltalic': require('../assets/fonts/AvenirNextULtltalic.ttf'),
    'AvenirNextDemiItalic': require('../assets/fonts/AvenirNextDemiItalic.ttf'),
    'AvenirNextHeavyCondensed': require('../assets/fonts/AvenirNextHeavyCondensed.ttf'),
  });

  return (
    <View style={styles.container} >
      <Text style={[styles.logoFont, { fontFamily: 'AvenirNextHeavyItalic' }]}>MozzGo</Text>
      <Text style={[styles.subFont, { fontFamily: 'AvenirNextULtltalic' }]}>Move your ass - let's go!</Text>
    </View>
  );
  // }

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
    color: 'green',
    width: '100%',
    textAlign: 'center',
  },
  subFont: {
    marginTop: 6, marginLeft: -15,
    fontSize: 20,
    width: '100%',
    textAlign: 'center',
    color: 'green'
  }
});

