import React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { RootNavigator } from './navigation';
import { Provider } from 'react-redux';
import { store } from './store';
import { SECRET_KEY, ACCESS_KEY } from '@env';

export default function () {
  console.log({ SECRET_KEY, ACCESS_KEY });

  return (
    <NavigationContainer>
      <Provider store={store}>
        <RootNavigator />
      </Provider>
    </NavigationContainer>
  )
};
