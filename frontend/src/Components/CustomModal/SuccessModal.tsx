import React from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet, TouchableWithoutFeedback } from 'react-native';

const SuccessModal = ({ visible, onClose }) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalTextBold}>Added!</Text>
            <Text style={styles.modalText}>Your recipe has been added, you can see it on your favorites!</Text>
            <TouchableOpacity onPress={onClose}>
              <Text style={styles.closeText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalView: {
    backgroundColor: 'rgba(238, 248, 242, 1)',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  modalTextBold: {
    marginBottom: 10,
    fontSize: 20,
    textAlign: 'center',
    color: 'green',
    fontWeight: "bold",
  },
  modalText: {
    marginBottom: 10,
    fontSize: 18,
    textAlign: 'center',
  },
  closeText: {
    fontSize: 16,
    color: 'blue',
    marginTop: 10,
  },
});

export default SuccessModal;
