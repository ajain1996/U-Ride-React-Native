import React from 'react';
import 'react-native-gesture-handler';
import { StyleSheet, Text, View, Dimensions } from 'react-native';
// import { OriginContextProvider, DestinationContextProvider } from './src/contexts/contexts';
import RoootNavigator from './src/navigations/RootNavigator';
import { StatusBar } from 'expo-status-bar';
import { colors } from './src/global/styles';
import { DestinationContextProvider, OriginContextProvider } from './src/contexts/contexts';

const App = () => {
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#2058c0" style='light' />
      <DestinationContextProvider>
        <OriginContextProvider>
          <RoootNavigator />
        </OriginContextProvider>
      </DestinationContextProvider>
    </View>
  )
}

export default App

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    paddingBottom: 30,
  }
})