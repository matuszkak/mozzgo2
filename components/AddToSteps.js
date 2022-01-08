import React, { useState } from 'react';
import { Text, StyleSheet, TextInput, Button, View, Modal, TouchableOpacity, SafeAreaView, Picker, Platform } from 'react-native';
import { saveStepsOnFirebase } from '../database';
import Slider from '@react-native-community/slider';
import DateTimePicker from '@react-native-community/datetimepicker';
import { formatDate2 } from './Logics/FormatDate';

const AddToSteps = props => {

  const [sliderValue, setSliderValue] = useState(30);
  const [enteredSport, setEnteredSport] = useState('');
  const [date, setDate] = useState(new Date());
  const [show, setShow] = useState(true);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    setDate(currentDate);
  };

  const inputHandler2 = enteredSport => { setEnteredSport(enteredSport) };
  const inputHandler3 = enteredDate => { setEnteredDate(enteredDate) };


  function ConvertToStep(sport) {

    var multiplier = 0;
    switch (sport) {
      case "Aerobic, step": multiplier = 153;
        break;
      case "Basketball": multiplier = 145;
        break;
      case "Bicycling, easy pace": multiplier = 130;
        break;
      case "Bicycling, moderate pace": multiplier = 170;
        break;
      case "Boxing, non-competitive": multiplier = 131;
        break;
      case "Football": multiplier = 199;
        break;
      case "Gardening": multiplier = 80;
        break;
      case "Gymnastics": multiplier = 121;
        break;
      case "Horse-riding)": multiplier = 90;
        break;
      case "Hiking": multiplier = 172;
        break;
      case "Ice skating, general": multiplier = 84;
        break;
      case "Squash": multiplier = 348;
        break;
      case "Swimming, freestyle": multiplier = 181;
        break;
      case "Table tennis": multiplier = 120;
        break;
      case "Tennis": multiplier = 200;
        break;
      case "Walking, average": multiplier = 84;
        break;

      default:
        multiplier = 100;
    }
    return multiplier;
  }

  return (
    <Modal visible={props.visible} animationType={'slide'}>
      <View style={styles.inputContainer}>

        <View style={styles.container}>
          <Picker
            selectedValue={enteredSport}
            style={{ height: 30, width: 380 }}
            onValueChange={(itemValue, itemIndex) => setEnteredSport(itemValue)}
          >
            <Picker.Item color="#009688" label="Aerobic, step (131/min)" value="Aerobic, step" />
            <Picker.Item color="#009688" label="Basketball (145/min)" value="Basketball" />
            <Picker.Item color="#009688" label="Bicycling, easy pace (130/min)" value="Bicycling, easy pace" />
            <Picker.Item color="#009688" label="Bicycling, moderate pace (170/min)" value="Bicycling, moderate pace" />
            <Picker.Item color="#009688" label="Boxing, non-competitive (131/min)" value="Boxing, non-competitive" />
            <Picker.Item color="#009688" label="Football (199/min)" value="Football" />
            <Picker.Item color="#009688" label="Gardening (80/min)" value="Gardening" />
            <Picker.Item color="#009688" label="Gymnastics (121/min)" value="Gymnastics" />
            <Picker.Item color="#009688" label="Horse-riding (90/min)" value="Horse-riding" />
            <Picker.Item label="Hiking (172/min)" value="Hiking" />
            <Picker.Item color="#009688" label="Ice skating, general (84/min)" value="Ice skating" />
            <Picker.Item color="#009688" label="Squash (348/min)" value="Squash" />
            <Picker.Item color="#009688" label="Swimming, freestyle (181/min)" value="Swimming, freestyle" />
            <Picker.Item color="#009688" label="Table tennis (120/min)" value="Table tennis" />
            <Picker.Item color="#009688" label="Tennis (200/min)" value="Tennis" />
            <Picker.Item color="#009688" label="Walking (84/min)" value="Walking" />
          </Picker>
        </View>


        <View style={styles.containeryyy}>
          <DateTimePicker style={{ flex: 1, width: 380, }}
            value={date}
            mode={'date'}
            display="spinner"
            show={true}
            onChange={onChange}
            minimumDate={new Date(2022, 0, 1)}
            maximumDate={new Date(2076, 6, 14)}
            textColor="#009688"
          />
        </View>



        <View style={styles.containerxxx}>

          <Text style={{ color: '#009688', fontSize: 22 }}>         Sports activity in minutes:          </Text>
          <Text style={{ color: '#009688', textAlign: 'center', fontSize: 22 }}>{sliderValue}</Text>

          <Slider
            maximumValue={180}
            minimumValue={0}
            minimumTrackTintColor="#009688"
            maximumTrackTintColor="#E8F8F5"
            step={5}
            value={sliderValue}
            onValueChange={(sliderValue) => setSliderValue(sliderValue)}
          />
        </View>


        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.buttonView}
            onPress={() => {
              console.log(enteredSport, formatDate2(date), sliderValue);
              setSliderValue('30');
              props.onCancel();
            }}>
            <Text style={styles.buttonText}>Cancel</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.buttonView}
            onPress={() => {
              saveStepsOnFirebase(props.userData.email, enteredSport, formatDate2(date), sliderValue * ConvertToStep(enteredSport));

              setSliderValue('30');
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
  // textInput: {
  //   // borderColor: '#148F77',
  //   backgroundColor: '#E8F8F5',
  //   // borderWidth: 1,
  //   padding: 10,
  //   width: '79%',
  //   borderRadius: 20,
  //   marginVertical: 5,
  //   fontSize: 20,
  //   shadowColor: '#171717',
  //   shadowOffset: { width: -2, height: 4 },
  //   shadowOpacity: 0.2,
  //   shadowRadius: 3,
  // },
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
    // borderColor: '#148F77',
    // borderWidth: 1,
    backgroundColor: '#E8F8F5',
    shadowColor: '#171717',
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  container: {
    flex: 0.3,
    marginTop: 50,
    paddingTop: 0,
    paddingBottom: 80,
    marginBottom: 25,
    alignItems: "center",
    backgroundColor: '#E8F8F5',
    borderRadius: 32,
    // borderColor: '#148F77',
    // borderWidth: 1,
    shadowColor: '#171717',
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  containeryyy: {
    flex: 0.4,
    paddingTop: 0,
    paddingBottom: 0,
    marginBottom: 10,
    alignItems: "center",
    backgroundColor: '#E8F8F5',
    borderRadius: 32,
    // borderColor: '#148F77',
    // borderWidth: 1,
    shadowColor: '#171717',
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  }
});

export default AddToSteps;

