import React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { RootNavigator } from './navigation';
import { Provider } from 'react-redux';
import { store } from './store';

export default function () {
  return (
    <NavigationContainer>
      <Provider store={store}>
        <RootNavigator />
      </Provider>
    </NavigationContainer>
  )
};
