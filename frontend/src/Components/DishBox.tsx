import React from "react";
import { Image, Pressable, TouchableOpacity } from "react-native";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { Box, AspectRatio, Stack, Heading, Text, HStack } from "native-base";
interface DishBoxProps {
  food: {
    id: number;
    name: string;
    description: string;
    image: string;
    time_taken: any;
    avg_rating: any;
  };
  navigation: any;
  index?: number;
}
const DishBox = (props: DishBoxProps) => {
  const {food, navigation, index} = props;
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
      <TouchableOpacity onPress={() =>navigation.navigate("Detail", {
                    food_id: food.id,
                  })}>
        <Box>
          <AspectRatio w="100%" ratio={16 / 9}>
            <Image
              source={
                food.image
                  ? { uri: food.image }
                  : {
                      uri: "https://www.theyearinpictures.co.uk/images//image-placeholder.png",
                    }
              }
              alt="image"
            />
          </AspectRatio>
        </Box>
        <Stack p="4" space={3}>
          <Stack space={1}>
            <Text>
              {food.name || "A dish name"}
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
                {food.time_taken ? String(food.time_taken) : "?"} min
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
                {food ? String(450) : "?"} kcal
              </Text>
            </HStack>
          </HStack>
        </Stack>
      </TouchableOpacity>
    </Box>
  );
};

export default DishBox;
