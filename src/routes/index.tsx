import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { LogBox } from 'react-native';
import { AppRoutes } from './app-routes';

LogBox.ignoreLogs([
  'Unrecognized WebSocket'
]);

export default function Routes() {
  return (
    <NavigationContainer>
      <AppRoutes />
    </NavigationContainer>
  );
}