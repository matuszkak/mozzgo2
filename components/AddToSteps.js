import React, { useState } from 'react';
import { Text, StyleSheet, TextInput, Button, View, Modal, TouchableOpacity, SafeAreaView } from 'react-native';
import { saveStepsOnFirebase } from '../database';

import Slider from '@react-native-community/slider';



const AddToSteps = props => {
  // const [enteredSteps, setEnteredSteps] = useState('');
  const [sliderValue, setSliderValue] = useState(1000);
  const [enteredSport, setEnteredSport] = useState('');
  const [enteredDate, setEnteredDate] = useState('');

  // const inputHandler = enteredText => {
  //   setEnteredSteps(enteredText)
  // };

  const inputHandler2 = enteredSport => { setEnteredSport(enteredSport) };
  const inputHandler3 = enteredDate => { setEnteredDate(enteredDate) };


  return (
    <Modal visible={props.visible} animationType={'slide'}>
      <View style={styles.inputContainer}>

        <TextInput
          style={styles.textInput}
          placeholder="Which sport?"
          onChangeText={inputHandler2}
          value={enteredSport}
        />
        <TextInput
          style={styles.textInput}
          placeholder="Which date? --- yyyy/mm/dd"
          onChangeText={inputHandler3}
          value={enteredDate}
        />
        <View style={{ flex: 0.2 }}>
          <View style={styles.containerxxx}>
            {/*Text to show slider value*/}
            <Text style={{ color: 'black' }}>                   How many steps to add?                 </Text>
            <Text style={{ color: 'black', textAlign: 'center' }}>{sliderValue}</Text>

            {/*Slider with max, min, step and initial value*/}
            <Slider
              maximumValue={10000}
              minimumValue={0}
              minimumTrackTintColor="#009688"
              maximumTrackTintColor="#E8F8F5"
              step={100}
              value={sliderValue}
              onValueChange={(sliderValue) => setSliderValue(sliderValue)}
            />
          </View>
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.buttonView}
            onPress={() => {
              console.log(enteredSport, enteredDate, sliderValue)
              // setEnteredSteps('');
              setEnteredSport('');
              setEnteredDate('');
              setSliderValue('0');
              props.onCancel();
            }}>
            <Text style={styles.buttonText}>Cancel</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.buttonView}
            onPress={() => {
              saveStepsOnFirebase(props.userData.email, enteredSport, enteredDate, sliderValue);
              // setEnteredSteps('');
              setEnteredSport('');
              setEnteredDate('');
              setSliderValue('0');
              props.onCancel();
            }}>
            <Text style={styles.buttonText}>    Add    </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  textInput: {
    borderColor: '#148F77',
    borderWidth: 1,
    padding: 10,
    width: '70%',
    borderRadius: 20,
    marginVertical: 5,
  },
  buttonContainer: {
    flexDirection: 'row',
    marginTop: 20,
    width: '100%',
    justifyContent: 'center',
  },
  inputContainer: {
    paddingTop: '1%',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,

  },
  buttonView: {
    elevation: 8,
    backgroundColor: '#009688',
    borderRadius: 12,
    paddingVertical: 10,
    paddingHorizontal: 12,
    margin: 10,
  },
  buttonText: {
    fontSize: 18,
    color: '#fff',
    fontWeight: '400',
    alignSelf: 'center',
    textTransform: 'uppercase',
  },
  containerxxx: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    backgroundColor: 'white',
  },
});

export default AddToSteps;

