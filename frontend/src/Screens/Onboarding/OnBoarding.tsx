
import React from 'react';
import { StyleSheet, Text, View, Image, Dimensions, TouchableOpacity } from 'react-native';
import { RootScreens } from '..';

const { width, height } = Dimensions.get('window');

const OnboardingScreen= (props: {
  onNavigate: (string: RootScreens) => void;
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.slide} key="1">
        <Image source={require("../../../assets/logo.png")} style={styles.image} />
        <Text style={styles.title}>Easy chef</Text>
        <Text style={styles.text}>Help you cook easily</Text>

        <TouchableOpacity
          style={styles.button}
          onPress={() => props.onNavigate(RootScreens.ONBOARDING2)}
        >
          <Text style={styles.buttonText}>Next</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  slide: {
    width,
    height,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '80%',
    height: '50%',
    resizeMode: 'contain',
    marginBottom: 10,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: 'center',
  },
  text: {
    fontSize: 24,
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#FE724C',
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
    minWidth: '60%',
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
  },
});

export default OnboardingScreen;
