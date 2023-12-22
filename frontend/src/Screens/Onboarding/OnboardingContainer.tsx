import OnboardingScreen from "./OnBoarding";
import React, { useState, useEffect } from "react";
import { useLazyGetUserQuery } from "@/Services";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "@/Navigation";
import { RootScreens } from "..";
import { Welcome } from "../Welcome/Welcome";
type WelcomeScreenNavigatorProps = NativeStackScreenProps<
  RootStackParamList,
  RootScreens.ONBOARDING1
>;
export const OnBoardingContainer = ({
  navigation,
}: WelcomeScreenNavigatorProps) => {
  const onNavigate = (screen: RootScreens) => {
    navigation.navigate(screen);
  };

  return <OnboardingScreen onNavigate={onNavigate} />;
};
