import { View, Text, StyleSheet } from "react-native";
import { RootScreens } from ".."

export const OnBoarding1 = (props : {
    onNavigate : (string : RootScreens) => void;
}) => {
    return (
        <View style = {style.Container}>
            <View style={styles.slide}>
                <Image source={require("../../../assets/onb1.png")} style={styles.image} alt="image"/>
                <Text style={styles.text}>Welcome to our App</Text>
            </View>
            <View style={styles.slide}>
                <Image source={require('./assets/onboarding2.jpg')} style={styles.image} alt="image" />
                <Text style={styles.text}>Get started with our amazing features</Text>
            </View>
        </View>
    );
};

const style = StyleSheet.create({
    Container : {
        alignItems : "center",
        justifyContent : "center",
        flex : 1
    }
})