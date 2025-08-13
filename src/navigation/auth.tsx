import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackParamList } from './type';
import auth from 'screens/auth';
const Stack = createNativeStackNavigator<RootStackParamList>();
const authGroup = () => {
  return (
    <Stack.Group>
      <Stack.Screen name="Onboarding" component={auth.Onboarding} />
      <Stack.Screen name="Login" component={auth.Login} />
      <Stack.Screen name="Register" component={auth.Register} />
    </Stack.Group>
  );
};
export default authGroup;
