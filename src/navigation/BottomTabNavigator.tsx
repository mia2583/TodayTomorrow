import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import MapPage from '../features/map/MapPage';
import SettingPage from '../features/setting/SettingPage';

const Tab = createBottomTabNavigator();

const getBarIcon = (route: {name: string}, size: number, focused: Boolean) => {
  let iconName;

  if (route.name === 'Map') {
    iconName = 'map';
  } else {
    iconName = 'adjust';
  }

  return (
    <MaterialCommunityIcons
      name={iconName}
      size={size}
      color={focused ? 'tomato' : 'gray'}
    />
  );
};

function BottomTabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({focused}) => getBarIcon(route, 24, focused),
        tabBarActiveTintColor: 'tomato',
        tabBarInactiveTintColor: 'gray',
        headerShown: false,
      })}>
      <Tab.Screen name="Map" component={MapPage} />
      <Tab.Screen name="Setting" component={SettingPage} />
    </Tab.Navigator>
  );
}

export default BottomTabNavigator;
