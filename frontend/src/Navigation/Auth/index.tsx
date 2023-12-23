import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Login } from "@/Screens/Auth/Login";
import { Signup } from "@/Screens/Auth/SignUp";

export type AuthStackParamList = {
    ['Login']: undefined,
    ['Signup']: undefined,
}

const AuthStack = createNativeStackNavigator<AuthStackParamList>()
// @refresh reset
export const AuthNavigator = () => {
  return (
    <AuthStack.Navigator screenOptions={{ headerShown: false }}>
            <AuthStack.Screen
                name = 'Login'
                component={Login}
            />

            <AuthStack.Screen
                name='Signup'
                component = {Signup}
            />
        </AuthStack.Navigator>
  );
};
