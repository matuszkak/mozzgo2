import { StyleSheet, Text, View, TouchableOpacity } from "react-native"
import React from 'react';

import { signOutUser } from '../auth';
import { removeUserData } from '../localStorage';

export default function SettingsPage(props) {

  const handleLogout = async () => {
    await signOutUser();
    await removeUserData();
    props.setUserData(null);
  };

  return (
    <View style={styles.buttonContainer}>
      <TouchableOpacity
        style={styles.buttonView} onPress={handleLogout}>
        <Text style={styles.buttonText}> SIGN OUT </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    margin: 50,
    alignSelf: 'stretch',
    textAlign: 'center',
    paddingVertical: '5%',
    paddingHorizontal: '7%',
    borderRadius: 20,
    color: 'blue',
    backgroundColor: '#0091ff',
  },
  buttonText: {
    textAlign: 'center',
    fontSize: 18,
    color: 'white',
  },
  shadow: {
    shadowColor: '#171717',
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  buttonView: {
    elevation: 8,
    backgroundColor: '#009688',
    borderRadius: 12,
    paddingVertical: 10,
    paddingHorizontal: 12,
    margin: 10,
  },
  buttonContainer: {
    backgroundColor: 'white',
    flexDirection: 'row',
    marginTop: 30,
    width: '100%',
    justifyContent: 'center',
  },
});