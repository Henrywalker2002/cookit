import React from "react";
import { Image, Pressable, TouchableOpacity } from "react-native";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { Box, AspectRatio, Stack, Heading, Text, HStack } from "native-base";
interface DishBoxProps {
  start?: Number;
  dishName?: String;
  ingredients?: String[];
  duration?: Number;
  kcal?: Number;
  imgUri?: string;
  onPress?: VoidFunction;
}
const DishBox = (props: DishBoxProps) => {
  return (
    <Box
      maxW="49%"
      rounded="lg"
      overflow="hidden"
      borderColor="coolGray.200"
      borderRadius={30}
      borderWidth="1"
      alignContent={"center"}
      _dark={{
        borderColor: "coolGray.600",
        backgroundColor: "gray.700",
      }}
      _web={{
        shadow: 2,
        borderWidth: 0,
      }}
      _light={{
        backgroundColor: "gray.50",
      }}
    >
      <TouchableOpacity onPress={() => alert("Your press a dishBox")}>
        <Box>
          <AspectRatio w="100%" ratio={16 / 9}>
            <Image
              source={
                props.imgUri
                  ? { uri: props.imgUri }
                  : {
                      uri: "https://www.theyearinpictures.co.uk/images//image-placeholder.png",
                    }
              }
              alt="image"
            />
          </AspectRatio>
        </Box>
        <Stack p="4" space={3}>
          <Stack space={2}>
            <Heading size="md" ml="-1">
              {props.dishName || "A dish name"}
            </Heading>
            <Text
              fontSize="xs"
              _light={{
                color: "violet.500",
              }}
              _dark={{
                color: "violet.400",
              }}
              fontWeight="500"
              ml="-0.5"
              mt="-1"
            >
              {props.ingredients?.map((ingr) => (
                <Text> {ingr}</Text>
              ))}
            </Text>
          </Stack>

          <HStack alignItems="center" space={4} justifyContent="center">
            <HStack alignItems="center">
              <Ionicons name="ios-time-outline" size={24} color="black" />
              <Text
                color="coolGray.600"
                _dark={{
                  color: "warmGray.200",
                }}
                fontWeight="400"
              >
                {props.duration ? String(props.duration) : "?"} min
              </Text>
            </HStack>
            <HStack alignItems="center">
              <MaterialCommunityIcons name="fire" size={24} color="black" />
              <Text
                color="coolGray.600"
                _dark={{
                  color: "warmGray.200",
                }}
                fontWeight="400"
              >
                {props.kcal ? String(props.kcal) : "?"} kcal
              </Text>
            </HStack>
          </HStack>
        </Stack>
      </TouchableOpacity>
    </Box>
  );
};

export default DishBox;
