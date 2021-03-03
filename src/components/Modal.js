import React from 'react';
import { Text, TouchableOpacity, Modal, View, SafeAreaView } from 'react-native';
import Icon from 'components/Icon';

const styles = {
  containerModal: {
    flex: 1,
  },
  headerModal: {
    flexDirection: 'row',
    padding: 20,
    borderBottomWidth: 1,
    borderColor: 'gray',
  },
  textHeaderModal: {
    flex: 1,
  },
  iconHeaderModal: {
    color: '#000',
    fontSize: 20,
    marginLeft: 10,
  },
};

const ModalComponent = ({ modalVisible, title, onClose, children }) => {
  return (
    <Modal animationType="slide" visible={modalVisible} onRequestClose={() => onClose()}>
      <SafeAreaView style={styles.containerModal}>
        <View style={styles.headerModal}>
          <Text style={styles.textHeaderModal}>{title}</Text>
          <TouchableOpacity onPress={() => onClose()}>
            <Icon name="close" style={styles.iconHeaderModal} />
          </TouchableOpacity>
        </View>
        {children}
      </SafeAreaView>
    </Modal>
  );
};

export default ModalComponent;
