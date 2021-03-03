import React from 'react';
import { ActivityIndicator, View } from 'react-native';

const styles = {
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
};

const LoadingScreen = () => (
  <View style={styles.container}>
    <ActivityIndicator color="#000" size={30} />
  </View>
);

export default LoadingScreen;
