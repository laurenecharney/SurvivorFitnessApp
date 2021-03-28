import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import TrainerSession from '../Pages/TrainerSession';
import DieticianSession from '../Pages/DieticianSession';
// Not used yet
const Tab = createMaterialTopTabNavigator();
export function TrainerDieticianTabNavigation() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Trainer" component={TrainerSession} />
      <Tab.Screen name="Dietician" component={DieticianSession} />
    </Tab.Navigator>
  );
}