import { initializeApp } from 'firebase/app';
import {
  getFirestore,
  doc,
  collection,
  setDoc,
  deleteDoc,
  limit,
  orderBy,
  getDoc,
  getDocs,
  query,
  addDoc,
  updateDoc,
  serverTimestamp,
  where,
  getAuth,
} from 'firebase/firestore';

import config from './db_config';

// https://docs.expo.dev/guides/using-firebase/#using-expo-with-firestore
initializeApp(config);
export const db = getFirestore();

// https://firebase.google.com/docs/firestore/manage-data/add-data#set_a_document
/**
 * createUserOnFirebase. user.email will be the document ID
 *
 * @param {} user
 */
export async function createUserOnFirebase(user) {
  await setDoc(doc(db, 'users', user.email), user);
  console.log(`${user.email} was written to the database`);
}

// https://firebase.google.com/docs/firestore/query-data/get-data#get_a_document
/**
 * getUserDataByEmail from firebase
 *
 * @param {} email
 */
export async function getUserDataByEmail(email) {
  const docRef = doc(db, 'users', email);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    // console.log('userdata from firebase:', docSnap.data());
    return docSnap.data();
  }
  console.log('User not found by email');
  return null;
}


// export async function toggleStateOnFirebase(email, newState) {
//   // https://firebase.google.com/docs/firestore/manage-data/add-data#update-data
//   // collection -> document
//   await updateDoc(doc(db, 'users', email), {
//     currentState: newState,
//   });
// }

export async function saveStepsOnFirebase(email, sport, day, steps) {
  // collection -> document -> collection
  // console.log('saving started...')
  await addDoc(collection(db, 'users', email, 'history'), {
    date: serverTimestamp(),
    sport: sport,
    day: day,
    steps: steps,
  });
  console.log(`${steps} steps of ${email} were saved in the database for ${sport} for ${day}`);
}

export async function getHistory(email) {
  // https://firebase.google.com/docs/firestore/query-data/get-data#get_multiple_documents_from_a_collection
  const q = query(collection(db, 'users', email, 'history'), orderBy('day', 'desc'));
  const querySnapshot = await getDocs(q);
  const result = [];
  querySnapshot.forEach(doc => {
    const data = {
      ...doc.data(),
      id: doc.id,
    };
    result.push(data);
  });
  return result;
}

export async function getHistoryBySport(email, sport) {
  // https://firebase.google.com/docs/firestore/query-data/get-data#get_multiple_documents_from_a_collection
  const q = query(collection(db, 'users', email, 'history'), where("sport", "==", sport), orderBy('day', 'desc'));
  const querySnapshot = await getDocs(q);
  const result = [];
  querySnapshot.forEach(doc => {
    const data = {
      ...doc.data(),
      id: doc.id,
    };
    result.push(data);
    // console.log(result);
  });
  return result;
}

export async function getHistoryByDay(email, day) {
  // https://firebase.google.com/docs/firestore/query-data/get-data#get_multiple_documents_from_a_collection
  const q = query(collection(db, 'users', email, 'history'), where("day", "==", day), orderBy('sport', 'desc'));
  const querySnapshot = await getDocs(q);
  const result = [];
  querySnapshot.forEach(doc => {
    const data = {
      ...doc.data(),
      id: doc.id,
    };
    result.push(data);
    // console.log(result);
  });
  return result;
}


export async function deleteRecordById(email, id) {
  await deleteDoc(doc(db, 'users', email, 'history', id));
}
