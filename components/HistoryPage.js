import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, FlatList, TouchableOpacity, YellowBox, Alert } from 'react-native';
import { SvgXml } from 'react-native-svg';
import trashIcon from '../assets/Trash_font_awesome.js';

import { deleteRecordById, getHistory } from '../database';


export default function HistoryPage(props) {
  const [history, setHistory] = useState([]);

  // Process history item deletion request
  const twoButtonAlert = (id) =>
    Alert.alert('Biztos töröljem?', 'Ez esetben nyomj OK-t!', [
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
      },
      {
        text: 'OK', onPress: () => {
          console.log(`Steps were deleted from database. Id: ${id}`),
            deleteRecordById(props.userData.email, id),

            props.navigation.navigate('Home')
        }
      },
    ]);

  const renderItem = ({ item, index }) => (

    <View
      style={[
        styles.historyItemContainer,
        styles.shadow,
        styles.containerStep,
      ]}>
      <View style={styles.historyTextContainer}>

        <View>
          < Text style={styles.textStep}>{item.day}</Text>
          <Text
            style={[
              styles.textStep,
              // styles.currentStateTextIn,
            ]}>
            {item.sport}
            {/* {index} */}
          </Text>
          <Text
            style={[
              styles.textStep,
              // styles.currentStateTextIn,
            ]}>
            {item.steps}
          </Text>



        </View>
      </View>

      {/* Delete button */}
      <View style={styles.bin}>
        <TouchableOpacity >
          <SvgXml width="30" height="30" xml={trashIcon} onPress={() => twoButtonAlert(item.id)} />
        </TouchableOpacity>
      </View>
    </View >
  );



  useEffect(() => {
    (async () => {
      // console.log(props.userData.email);
      const historyFromFirebase = await getHistory(props.userData.email);
      setHistory(historyFromFirebase);
      // console.log(history);
    })();
  }, []);

  return (
    <View style={styles.container}>
      <FlatList data={history} renderItem={renderItem} keyExtractor={item => item.id} />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    padding: 10,
    alignItems: 'stretch',
    // https://stackoverflow.com/a/59183680/9004180
    // fixing the scrolling of the FlatList
    // flex: 1 just means "take up the entire space" (whatever "entire" that may be).
    flex: 1,
  },
  historyItemContainer: {
    backgroundColor: 'white',
    paddingHorizontal: 40,
    paddingVertical: 5,
    margin: 5,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
  },
  historyTextContainer: {
    width: 150,
    flexDirection: 'row',

  },
  textStep: {
    fontSize: 15,
    fontFamily: 'AvenirNextDemiItalic',
    color: '#148F77',
  },
  containerStep: {
    backgroundColor: '#E8F8F5',
  },
  // containerOut: {
  //   backgroundColor: 'red',
  // },
  shadow: {
    shadowColor: '#171717',
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  bin: {

    marginLeft: 140,
    marginTop: 0,
    // paddingHorizontal: 40,
    // paddingVertical: 5,
    // margin: 5,
    // borderRadius: 12,
    alignItems: 'flex-end',
  },
});
