import React, { useState } from 'react';
import { Text, StyleSheet, TextInput, Button, View, Modal, TouchableOpacity, SafeAreaView, Picker } from 'react-native';
import { saveStepsOnFirebase } from '../database';
import Slider from '@react-native-community/slider';


const AddToSteps = props => {
  const [sliderValue, setSliderValue] = useState(1000);
  const [enteredSport, setEnteredSport] = useState('Swimming');
  const [enteredDate, setEnteredDate] = useState('');

  const inputHandler2 = enteredSport => { setEnteredSport(enteredSport) };
  const inputHandler3 = enteredDate => { setEnteredDate(enteredDate) };


  return (
    <Modal visible={props.visible} animationType={'slide'}>
      <View style={styles.inputContainer}>

        <View style={styles.container}>
          <Picker
            selectedValue={enteredSport}
            style={{ height: 30, width: 340 }}
            onValueChange={(itemValue, itemIndex) => setEnteredSport(itemValue)}
          >
            <Picker.Item label="Basketball" value="Basketball" />
            <Picker.Item label="Boxing" value="Boxing" />
            <Picker.Item label="Gardening" value="Gardening" />
            <Picker.Item label="Horseriding" value="Horseriding" />
            <Picker.Item label="Swimming" value="Swimming" />
            <Picker.Item label="Tennis" value="Tennis" />
            <Picker.Item label="Wallclimbing" value="Wallclimbing" />
            <Picker.Item label="Walking" value="Walking" />
          </Picker>
        </View>
        <TextInput
          style={styles.textInput}
          placeholder="Which date? --- yyyy/mm/dd"
          onChangeText={inputHandler3}
          value={enteredDate}
        />

        <View style={styles.containerxxx}>

          <Text style={{ color: 'black', fontSize: '18' }}>            How many steps to add?          </Text>
          <Text style={{ color: 'black', textAlign: 'center', fontSize: '18' }}>{sliderValue}</Text>

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


        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.buttonView}
            onPress={() => {
              console.log(enteredSport, enteredDate, sliderValue)
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
              setEnteredSport('');
              setEnteredDate('');
              setSliderValue('0');
              props.onCancel();
            }}>
            <Text style={styles.buttonText}>    Add    </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal >
  );
};

const styles = StyleSheet.create({
  textInput: {
    borderColor: '#148F77',
    backgroundColor: '#E8F8F5',
    borderWidth: 1,
    padding: 10,
    width: '79%',
    borderRadius: 20,
    marginVertical: 5,
    fontSize: 18,
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
    flex: 0.8,
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
    flex: 0.2,
    padding: 20,
    marginTop: 15,
    justifyContent: 'center',
    backgroundColor: 'white',
    borderRadius: 32,
    borderColor: '#148F77',
    borderWidth: 1,
    backgroundColor: '#E8F8F5',
  },
  container: {
    flex: 0.3,
    paddingTop: -50,
    paddingBottom: 80,
    marginBottom: 15,
    alignItems: "center",
    backgroundColor: '#E8F8F5',
    borderRadius: 32,
    borderColor: '#148F77',
    borderWidth: 1,
  }

});

export default AddToSteps;

