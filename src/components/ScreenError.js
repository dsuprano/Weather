import React from 'react';
import { ScrollView, View, Text } from 'react-native';

const styles = {
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    width: '70%',
    paddingVertical: 40,
    paddingHorizontal: 30,
    backgroundColor: '#f2f2f2',
  },
  title: {
    textAlign: 'center',
    fontSize: 18,
    color: '#000',
    marginBottom: 10,
  },
  content: {
    textAlign: 'center',
    fontSize: 13,
    color: '#000',
  },
};

const ScreenError = ({ content }) => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>Ocurrió un error</Text>
        {!!content && <Text style={styles.content}>{content}</Text>}
      </View>
    </ScrollView>
  );
};

export default ScreenError;
