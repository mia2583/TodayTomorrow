import React from 'react';
import {Provider} from 'react-redux';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import {store} from './modules/redux/Store';
import 'react-native-get-random-values';

import LoginPage from './src/features/login/LoginPage';
import BottomTabNavigator from './src/navigation/BottomTabNavigator';

const Stack = createStackNavigator();

const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login">
          <Stack.Screen
            name="Login"
            component={LoginPage}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="MainTabs"
            component={BottomTabNavigator}
            options={{headerShown: false}}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

export default App;
