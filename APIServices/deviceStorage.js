import { AsyncStorage } from 'react-native';

  
     export async function saveItem(key, value) {
         console.log("SAVE ITEM")
      try {
        await AsyncStorage.setItem(key, value);

      } catch (error) {
        console.log("ERROR")
        console.log('AsyncStorage Error: ' + error.message);
      }
    }
     export async function getItem () {
        try {
          const res = await AsyncStorage.getItem('id_token');
            return res;
        } catch (error) {
          console.log('AsyncStorage Error: ' + error.message);
        }
    }
     export async function deleteJWT (){
        try{
          await AsyncStorage.removeItem('id_token');
        } catch (error) {
          console.log('AsyncStorage Error: ' + error.message);
        }
    
    }

