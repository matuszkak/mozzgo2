import AsyncStorage from '@react-native-async-storage/async-storage';

// https://react-native-async-storage.github.io/async-storage/docs/usage/
/**
 * Store userData in async local storage
 *
 * @param {} userData
 */
export const storeUserData = async userData => {
  try {
    const jsonValue = JSON.stringify(userData);
    await AsyncStorage.setItem('@storage_UserData', jsonValue);
    console.log(`${userData.name} stored in local storage.`);
  } catch (e) {
    // saving error
    console.log('error during saving', e);
  }
};

/**
 * getUserData from async local storage
 */
export const getUserData = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem('@storage_UserData', jsonValue);
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    // saving error
    console.log('error during getting user', e);
  }
};

/**
 * removeUserData from async local storage
 */
export const removeUserData = async () => {
  try {
    await AsyncStorage.removeItem('@storage_UserData');
    console.log('user removed from local storage');
  } catch (e) {
    // saving error
    console.log('error during getting user', e);
  }
};


// Store step data in Asyncstorage

export const storeStepData = async stepData => {
  try {
    const jsonValue = JSON.stringify(stepData);
    await AsyncStorage.setItem('@storage_StepData', jsonValue);
    // console.log(`${stepData} stored in local storage.`);
    console.log("Data stored in AsyncStorage");
  } catch (e) {
    // saving error
    console.log('error during saving step data to asyc local storage', e);
  }
};

/**
 * getStepData from async local storage
 */
export const getStepData = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem('@storage_StepData', jsonValue);
    return jsonValue != null ? JSON.parse(jsonValue) : null;
    console.log("Data retreiwed from AsyncStorage");
  } catch (e) {
    // saving error
    console.log('error during getting steps', e);
  }
};

/**
 * removeStepData from async local storage
 */
export const removeStepData = async () => {
  try {
    await AsyncStorage.removeItem('@storage_StepData');
    console.log('steps removed from local storage');
  } catch (e) {
    // saving error
    console.log('error during removing steps', e);
  }
};