import { RootStackParamList } from "@/Navigation";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootScreens } from "..";
import { OnBoarding1 } from "./Onboarding1";

import { OnBoarding } from "@/Components/Onboarding/Onboarding";

type OnBoardingScreenNavigatorProps = NativeStackScreenProps <
        RootStackParamList, 
        RootScreens.ONBOARDING1
    >

export const OnBoardingContainer = ({
    navigation, 
}: OnBoardingScreenNavigatorProps) => {
    const onNavigate = (screen: RootScreens) => {
        navigation.navigate(screen);
    }

    return <OnBoarding imgSrc= {require("../../../assets/onb1.png")} title="Easy chef" description="Help you cook easily" btnText="Next"/>
}