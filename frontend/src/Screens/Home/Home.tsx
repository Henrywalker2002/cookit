import { i18n, LocalizationKey } from "@/Localization";
import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { StatusBar } from "expo-status-bar";
import { HStack, Spinner, Heading, Flex } from "native-base";
import { User } from "@/Services";
import ScreenTitle from "@/Components/ScreenTitle";
import DishBox from "@/Components/DishBox";

export interface IHomeProps {
  data: User | undefined;
  isLoading: boolean;
}

export const Home = (props: IHomeProps) => {
  const { data, isLoading } = props;
  const section = (name: string) => {
    let hold = [1, 1];
    return (
      <>
        <Flex
          direction="row"
          justify="space-between"
          wrap="wrap"
          alignContent={"center"}
        >
          <View>
            <Text style={styles.label}>{name}</Text>
          </View>
          <TouchableOpacity>
            <Text>View All </Text>
          </TouchableOpacity>
        </Flex>
        <Flex
          direction="row"
          style={{ gap: 3 }}
          justify="center"
          wrap="wrap"
          alignContent={"space-around"}
        >
          {hold.map((ele) => (
            <DishBox />
          ))}
        </Flex>
      </>
    );
  };

  return (
    <Flex>
      <ScreenTitle title="Dashboard" />
      {section("Recommended")}
      {section("Recent recipes")}
      <StatusBar />
    </Flex>
  );
};

const styles = StyleSheet.create({
  label: {
    color: "#323643",
    fontSize: 24,
    fontWeight: "600",
    left: 0,
    top: 0,
  },
  view: {
    color: "#f56844",
    fontSize: 13,
    fontWeight: 400,
    left: 0,
  },
});
