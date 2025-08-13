import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackParamList } from './type';
import { StatusBar } from 'components';
import authGroup from './auth';
import { navigationRoot } from './navigationRef';
const Stack = createNativeStackNavigator<RootStackParamList>();
export const RootStack = () => {
  return (
    <NavigationContainer ref={navigationRoot}>
      <StatusBar />
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {authGroup()}
      </Stack.Navigator>
    </NavigationContainer>
  );
};
