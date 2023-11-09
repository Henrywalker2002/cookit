import { View, Text, StyleSheet } from "react-native";
import { RootScreens } from ".."

export const OnBoarding1 = (props : {
    onNavigate : (string : RootScreens) => void;
}) => {
    return (
        <View style = {style.Container}>
            <Text>Hello world</Text>
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