import AsyncStorage from '@react-native-async-storage/async-storage';
import { Task } from './interfaces';

export const storeData = async (task: Task) => {
  try {
    const jsonValue = JSON.stringify(task);
    await AsyncStorage.setItem(String(task.id), jsonValue); // put info of object with object id as a key in Async Storage
    
  } catch (err) {
    alert(err);
  }
}; //good
//==========================================
export const setObjectValue = async (value:Task) => {
  try {
    const jsonValue = JSON.stringify(value)
    await AsyncStorage.setItem(value.id.toString(), jsonValue)
  } catch(e) {
    alert("Something went wrong")
  }
  alert("Changes Saved")
}

export const removeValue = async (value:Task) => {
  try {
    await AsyncStorage.removeItem(value.id.toString())
  } catch(e) {
    alert("Something went wrong")
  }

  alert("Task Deleted")
}
