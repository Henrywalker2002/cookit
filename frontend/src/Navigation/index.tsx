import React from "react";
import { StatusBar } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import { MainNavigator } from "./Main";
import { WelcomeContainer } from "@/Screens/Welcome";
import { OnBoardingContainer } from "@/Screens/OnBoarding/OnBoardingContainer";
import { OnBoardingContainer2 } from "@/Screens/OnBoarding2/OnBoardingContainer2";
import { OnBoardingContainer3 } from "@/Screens/OnBoarding3/OnBoardingContainer3";
import { RootScreens } from "@/Screens";

export type RootStackParamList = {
  [RootScreens.MAIN]: undefined;
  [RootScreens.WELCOME]: undefined;
  [RootScreens.ONBOARDING1] : undefined;
  [RootScreens.ONBOARDING2] : undefined;
  [RootScreens.ONBOARDING3] : undefined;
};

const RootStack = createNativeStackNavigator<RootStackParamList>();

// @refresh reset
const ApplicationNavigator = () => {
  return (
    <NavigationContainer>
      <StatusBar />
      <RootStack.Navigator screenOptions={{ headerShown: false }}>
        <RootStack.Screen
          name={RootScreens.WELCOME}
          component={WelcomeContainer}
        />
        <RootStack.Screen
          name= {RootScreens.ONBOARDING1}
          component={OnBoardingContainer}
          options={{}}
        />
        <RootStack.Screen
          name= {RootScreens.ONBOARDING2}
          component={OnBoardingContainer2}
          options={{}}
        />
        <RootStack.Screen
          name= {RootScreens.ONBOARDING3}
          component={OnBoardingContainer3}
          options={{}}
        />
        <RootStack.Screen
          name={RootScreens.MAIN}
          component={MainNavigator}
          options={{}}
        />

      </RootStack.Navigator>
    </NavigationContainer>
  );
};

export { ApplicationNavigator };