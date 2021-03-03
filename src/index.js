import 'react-native-gesture-handler';
import React from 'react';
import { SafeAreaView, StatusBar } from 'react-native';
import Home from 'screens/Home';
import moment from 'moment';
import 'moment/locale/es';

moment().locale('es');

const styles = {
  container: {
    flex: 1,
  },
};

const App = () => (
  <SafeAreaView style={styles.container}>
    <StatusBar barStyle="dark-content" backgroundColor="#fff" />
    <Home />
  </SafeAreaView>
);

export default App;
