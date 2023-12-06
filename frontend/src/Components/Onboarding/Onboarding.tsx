import { OnBoarding1 } from "@/Screens/Onboarding/Onboarding1";
import { View, Image, StyleSheet, Text , Pressable} from "react-native";
import "../../../assets/logo.png" 

type OnBoardingProps = {
    imgSrc : any, 
    title : string, 
    description : string, 
    btnText : string
}

export const OnBoarding = (props: OnBoardingProps) => {
    return (
        <View style = {style.container}>
            <View style = {style.logo}>
                <Text style = {style.appName}>
                    <Image
                        source = {require('../../../assets/logo.png')}
                        style = {style.logoImg} 
                    /> 
                    Cookit
                </Text>  
            </View> 
            
            <Image 
                source={props.imgSrc}
                style = {style.image}
            />

            <Text style = {style.title}>{props.title}</Text>
            <Text>{props.description}</Text>

            <Pressable style = {style.btn}> 
                <Text>{props.btnText}</Text>
            </Pressable> 

        </View>
    )
}

const style = StyleSheet.create({
    container : {
        alignItems : "center",
        flex : 1,
        backgroundColor : "#fff"
    },
    logo : {
        height : 300,
        marginBottom : 10
    },
    appName : {
        fontSize : 45, 
        justifyContent : "center",
        alignItems : "center",
        flex : 1
    },
    logoImg : {
        width : 200,
        height : 200,
    },
    title : {
        fontWeight : "bold",
        fontSize : 30
    },
    btn : {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        paddingHorizontal: 32,
        borderRadius: 4,
        elevation: 3,
        backgroundColor: 'orangered',
        width : 200,
        marginTop : 20
    },
    image : {
        width : 256,
        height : 294,
        marginTop : 20,
        color : 0xFE724C
    }
})