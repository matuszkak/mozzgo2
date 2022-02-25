import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Button, Image } from 'react-native';

import Home from './Home';


export default function Motivate(props) {

  const [link, setLink] = useState(null);

  const generateImage = async () => {
    const response = await fetch('https://inspirobot.me/api?generate=true');
    const data = await response.text()
    console.log(data)
    setLink(data);
  };

  useEffect(() => {
    (async () => {

      generateImage();
    })();
  }, []);


  // setTimeout(() => { props.navigation.navigate('Home') }, 5000);

  return (
    <View style={styles.container} >

      <Text style={[styles.logoFont, { fontFamily: 'AvenirNextHeavyItalic' }]}>MozzGo</Text>

      <Text style={[styles.subFont, { fontFamily: 'AvenirNextULtltalic' }]}>Move your ass - let's go!</Text>
      <View  >

        <Image style={styles.image} source={{ uri: link }} />

      </View >
    </View >
  );
}



const styles = StyleSheet.create({
  container: {
    flex: 0.9,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoFont: {
    fontSize: 60,
    color: '#009688',
    width: '100%',
    textAlign: 'center',
  },
  subFont: {
    marginTop: '1%', marginLeft: -15, marginBottom: '8%',
    fontSize: 20,
    width: '100%',
    textAlign: 'center',
    color: '#009688',
  },
  image: {
    width: 400,
    height: 400,
    resizeMode: 'contain',
  },
});
