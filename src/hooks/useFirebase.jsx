import { initializeApp } from "firebase/app";
import {
  getDatabase,
  ref,
  set,
  push,
  update,
  remove,
  onValue,
  get,
} from "firebase/database";
const firebaseConfig = {
  apiKey: "AIzaSyBN9M0dVU9oz_sTGN98uvMLVexZfKIP4nk",
  authDomain: "worldwise-cities-database.firebaseapp.com",
  projectId: "worldwise-cities-database",
  storageBucket: "worldwise-cities-database.appspot.com",
  messagingSenderId: "557593536307",
  appId: "1:557593536307:web:90f83289d6a88d6afbc046",
  measurementId: "G-YCZ6NNJCKX",
};
function useFirebase() {
  const app = initializeApp(firebaseConfig);
  const database = getDatabase();

  async function insert(obj) {
    try {
      const reference = ref(database, "cities/");
      const newReference = await push(reference, obj);
      return newReference.key;
    } catch (e) {
      console.error("error while inserting to firebase ");
    }
  }
  async function del(id) {
    try {
      const reference = ref(database, `cities/${id}`);
      const removeCommand = await remove(reference);
      return removeCommand;
    } catch (e) {
      console.error(e.message);
    }
  }
  async function getCities() {
    try {
      const reference = ref(database, "cities/");
      const snapshot = await get(reference);
      const cities = [];
      snapshot.forEach((childSnapshot) => {
        cities.push({
          ...childSnapshot.val(),
          id: childSnapshot.key,
        });
      });
      // console.log(cities);
      return cities;
    } catch (e) {
      console.error("error fetching cities from firestore");
    }
  }
  async function getCurCity(id) {
    try {
      const reference = ref(database, `cities/${id}`);
      const snapshot = await get(reference);
      const city = snapshot.val();
      // console.log(city);
      return city;
    } catch (e) {
      console.error("error fetching Current city from firestore");
    }
  }

  return { insert, del, getCities, getCurCity };
}

export { useFirebase };
