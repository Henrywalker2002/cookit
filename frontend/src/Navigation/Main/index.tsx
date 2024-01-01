import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { HomeContainer } from "@/Screens/Home";
import Search from "@/Screens/Search/Search";
import { AntDesign, Foundation, MaterialIcons } from "@expo/vector-icons";
import { Plan } from "@/Screens/Plan";
import { Favorite } from "@/Screens/Favorite";
import { Profile } from "@/Screens/Profile";
import { ProfileContainer } from "@/Screens/ProfileScreen";

const Tab = createBottomTabNavigator();

// @refresh reset
export const MainNavigator = () => {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        tabBarActiveTintColor: "#FF6464",
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeContainer}
        options={{
          headerShown: false,
          tabBarLabel: "Home",
          tabBarIcon: ({ color }) => (
            <Foundation name="home" size={24} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Search"
        component={Search}
        options={{
          tabBarLabel: "Search",
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <AntDesign name="search1" size={24} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Plan"
        component={Plan}
        options={{
          tabBarLabel: "Plan",
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="menu-open" size={24} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Favorite"
        component={Favorite}
        options={{
          tabBarLabel: "Favorite",
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="favorite-border" size={24} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileContainer}
        options={{
          headerShown: false,
          tabBarLabel: "Profile",
          tabBarIcon: ({ color }) => (
            <AntDesign name="user" size={24} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};
