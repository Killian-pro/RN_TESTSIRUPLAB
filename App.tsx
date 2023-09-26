import React from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {Platform, StatusBar} from 'react-native';

import {NavigationContainer} from '@react-navigation/native';
import HomeScreen from './src/screens/HomeScreen';
import ChapterScreen from './src/screens/ChapterScreen';
import {createStackNavigator, StackScreenProps} from '@react-navigation/stack';

const Stack = createStackNavigator<AppStackParamList>();

const App = () => {
  return (
    <SafeAreaProvider
      style={{
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
      }}>
      <StatusBar
        barStyle={'light-content'}
        translucent={true}
        backgroundColor={'white'}
      />
      <NavigationContainer>
        <Stack.Navigator initialRouteName="HomeScreen">
          <Stack.Screen
            name="HomeScreen"
            component={HomeScreen}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="ChapterScreen"
            component={ChapterScreen}
            options={{
              headerShown: false,
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
};

export type AppStackParamList = {
  HomeScreen: undefined;
  ChapterScreen: {
    bookId: number;
  };
};

export type AppStackScreenProps<Screen extends keyof AppStackParamList> =
  StackScreenProps<AppStackParamList, Screen>;

export default App;
