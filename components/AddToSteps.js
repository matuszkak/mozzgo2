import React, { useState } from 'react';
import { Text, StyleSheet, TextInput, Button, View, Modal, TouchableOpacity } from 'react-native';
import { saveStepsOnFirebase } from '../database';

const AddToSteps = props => {
  const [enteredSteps, setEnteredSteps] = useState('');
  const [enteredSport, setEnteredSport] = useState('');
  const [enteredDate, setEnteredDate] = useState('');

  const inputHandler = enteredText => {
    setEnteredSteps(enteredText)
  };
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
          placeholder="How many steps to add?"
          onChangeText={inputHandler}
          value={enteredSteps}
        />

        <TextInput
          style={styles.textInput}
          placeholder="Which date? --- yyyy/mm/dd"
          onChangeText={inputHandler3}
          value={enteredDate}
        />

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.buttonView}
            onPress={() => {
              setEnteredSteps('');
              setEnteredSport('');
              setEnteredDate('');
              props.onCancel();
            }}>
            <Text style={styles.buttonText}>Cancel</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.buttonView}
            onPress={() => {
              saveStepsOnFirebase(props.userData.email, enteredSport, enteredDate, enteredSteps);
              setEnteredSteps('');
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
    marginTop: 30,
    width: '100%',
    justifyContent: 'center',
  },
  inputContainer: {
    paddingTop: '20%',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,

  },
  buttonView: {
    elevation: 8,
    backgroundColor: '#009688',
    borderRadius: 10,
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
});

export default AddToSteps;
