import { createDrawerNavigator } from '@react-navigation/material-top-tabs';

const Drawer = createDrawerNavigator();

// Not used yet
export function SessionNavigation() {
  return (
    <Drawer.Navigator>
      {/* <Drawer.Screen name="Trainer" component={TrainerSession} />
      <Drawer.Screen name="Dietician" component={DieticianSession} /> */}
    </Drawer.Navigator>
  );
}