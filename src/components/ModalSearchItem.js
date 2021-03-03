import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import Icon from 'components/Icon';

const styles = {
  searchItem: {
    padding: 20,
    borderBottomWidth: 1,
    borderColor: '#f2f2f2',
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconSearchItem: {
    color: '#000',
    fontSize: 20,
    marginRight: 10,
  },
  textItemSearchMyLocation: {
    color: 'gray',
  },
};

const ModalSearchItem = ({ location, description, onSelect }) => {
  return (
    <TouchableOpacity
      style={styles.searchItem}
      onPress={() => onSelect({ city: location.city, country: location.country })}
    >
      <Icon name="map-marker" style={styles.iconSearchItem} />
      <View style={styles.containerTextItemSearch}>
        <Text style={styles.textItemSearch}>{`${location.city}, ${location.country}`}</Text>
        {!!description && <Text style={styles.textItemSearchMyLocation}>{description}</Text>}
      </View>
    </TouchableOpacity>
  );
};

export default ModalSearchItem;
