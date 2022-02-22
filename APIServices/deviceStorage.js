import AsyncStorage from "@react-native-async-storage/async-storage";
import * as SecureStore from "expo-secure-store";

// Used to save the jwt (auth) token in the device storage
export async function saveItem(key, value) {
  try {
    
    await SecureStore.setItemAsync(key, value);
  } catch (error) {
    console.log("SecureStore Error in saveItem: " + error.message);
  }
}
export async function saveUserInfo(user){
  try {
      await AsyncStorage.setItem("user", JSON.stringify(user));
  } catch (error){
    console.log("AsyncStorage Error in saveUserInfo: " + error.message);
  }
}
export async function deleteUserInfo(){
  try {
      await AsyncStorage.removeItem("user");
  } catch (error){
    console.log("AsyncStorage Error in deleteUserInfo: " + error.message);
  }
}

export async function getCurrentRole(){
  try {
    const res = await AsyncStorage.getItem("role");
    return res;
  } catch (error){
    console.log("AsyncStorage Error in getCurrentRole: " + error.message);
  }
}

export async function saveSpecialistType(specialistType){
  try {
    await AsyncStorage.setItem("specialistType", JSON.stringify(specialistType));
  } catch (error){
    console.log("AsyncStorage Error in saveSpecialistType: " + error.message);
  }
}

export async function deleteSpecialistType(){
  try {
    await AsyncStorage.removeItem("specialistType");
  } catch (error){
    console.log("AsyncStorage Error in deleteSpecialistType: " + error.message);
  }
}

export async function getSpecialistType(){
  try {
    const res = await AsyncStorage.getItem("specialistType");
    return res;
  } catch (error){
    console.log("AsyncStorage Error in getSpecialistType: " + error.message);
  }
}

export async function saveLocationId(id){
  try {
    await AsyncStorage.setItem("locationId", JSON.stringify(id));
  } catch (error){
    console.log("AsyncStorage Error in saveLocationId: " + error.message);
  }
}

export async function deleteLocationdId(){
  try {
    await AsyncStorage.removeItem("locationId");
  } catch (error){
    console.log("AsyncStorage Error in deleteLocationId: " + error.message);
  }
}

export async function getLocationId(){
  try {
    const res = await AsyncStorage.getItem("locationId");
    return res;
  } catch (error){
    console.log("AsyncStorage Error in getLocationId: " + error.message);
  }
}

export async function saveCurrentRole(newRole){
  try {
    await AsyncStorage.setItem("role", JSON.stringify(newRole));
  } catch (error){
    console.log("AsyncStorage Error in saveCurrentRole: " + error.message);
  }
}

export async function deleteCurrentRole(){
  try {
    await AsyncStorage.removeItem("role");
  } catch (error){
    console.log("AsyncStorage Error in deleteCurrentRole: " + error.message);
  }
}

export async function getUser(){
  try {
    const res = await AsyncStorage.getItem("user");
    return res;
  } catch (error){
    console.log("AsyncStorage Error in getUser:" + error);
  }
}

// Used to get the jwt (auth) token in the device storage
export async function getItem() {
  try {
    // const res = await AsyncStorage.getItem('id_token');
    const res = await SecureStore.getItemAsync("id_token");
    return res;
  } catch (error) {
    console.log("SecureStore Error in getItem: " + error.message);
  }
}
export async function deleteJWT() {
  try {
    // await AsyncStorage.removeItem('id_token');
    await SecureStore.deleteItemAsync("id_token");
  } catch (error) {
    console.log("Secure Store Error in deleteJWT: " + error.message);
  }
}