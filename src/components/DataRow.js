import React from 'react';
import { View, Text } from 'react-native';

const styles = {
  rowItemInfo: {
    flexDirection: 'row',
  },
  textItemInfo: {
    flex: 1,
    color: 'gray',
  },
  textItemInfoValue: {
    flex: 1,
  },
};

const DataRow = ({ label, value }) => {
  return (
    <View style={styles.rowItemInfo}>
      <Text style={styles.textItemInfo}>{label}</Text>
      <Text style={styles.textItemInfoValue}>{value}</Text>
    </View>
  );
};

export default DataRow;
