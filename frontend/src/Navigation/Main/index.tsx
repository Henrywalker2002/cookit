import React from "react";
import {StyleSheet, View, Text, StatusBar} from "react-native"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { Colors } from "@/Theme/Variables";
import { DetailContainer } from "@/Screens/DetailScreens";
import { HomeContainer } from "@/Screens/Home";
const Tab = createBottomTabNavigator();

// @refresh reset
export const MainNavigator = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Home"
        component={HomeContainer}
        options={{
          tabBarIcon: () => (
            <View >
              
            </View>
            
          ),
          tabBarLabelPosition: "beside-icon",
        }}
      />
      <Tab.Screen
        name="Search"
        component={HomeContainer}
        options={{
          tabBarIconStyle: { display: "none" },
          tabBarLabelPosition: "beside-icon",
        }}
      />
      <Tab.Screen
        name="Plan"
        component={HomeContainer}
        options={{
          tabBarIconStyle: { display: "none" },
          tabBarLabelPosition: "beside-icon",
        }}
      />
      <Tab.Screen
        name="Favorite"
        component={HomeContainer}
        options={{
          tabBarIconStyle: { display: "none" },
          tabBarLabelPosition: "beside-icon",
        }}
      />
      <Tab.Screen
        name="Profile"
        component={DetailContainer}
        options={{
          tabBarIconStyle: { display: "none" },
          tabBarLabelPosition: "beside-icon",
        }}
      />
    </Tab.Navigator>
  );
};
