import { AsyncStorage } from "react-native";
import * as SecureStore from "expo-secure-store";

export async function saveItem(key, value) {
  try {
    
    await SecureStore.setItemAsync(key, value);
  } catch (error) {
    console.log("AsyncStorage Error: " + error.message);
  }
}
export async function saveUserInfo(user){
  try {
      await AsyncStorage.setItem("user", JSON.stringify(user));
  } catch (error){
    console.log("AsyncStorage Error: " + error.message);
  }
}
export async function deleteUserInfo(){
  try {
      await AsyncStorage.removeItem("user");
  } catch (error){
    console.log("AsyncStorage Error: " + error.message);
  }
}

export async function getCurrentRole(){
  try {
    await AsyncStorage.getItem("role");
  } catch (error){
    console.log("AsyncStorage Error: " + error.message);
  }
}

export async function saveCurrentRole(newRole){
  try {
    await AsyncStorage.setItem("role", newRole);
  } catch (error){
    console.log("AsyncStorage Error: " + error.message);
  }
}

export async function deleteCurrentRole(){
  try {
    await AsyncStorage.removeItem("role");
  } catch (error){
    console.log("AsyncStorage Error: " + error.message);
  }
}

export async function getUser(){
  try {
    const res = await AsyncStorage.getItem("user");
    return res;
  } catch (error){
    console.log("error " + error);
  }
}
export async function getItem() {
  try {
    // const res = await AsyncStorage.getItem('id_token');
    const res = await SecureStore.getItemAsync("id_token");

    return res;
  } catch (error) {
    console.log("AsyncStorage Error: " + error.message);
  }
}
export async function deleteJWT() {
  try {
    // await AsyncStorage.removeItem('id_token');
    await SecureStorage.deleteItemAsync("id_token");
  } catch (error) {
    console.log("AsyncStorage Error: " + error.message);
  }
}


