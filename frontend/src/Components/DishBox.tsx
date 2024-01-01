import React, { useState } from "react";
import {
  Image,
  Pressable,
  TouchableOpacity,
  View,
  Alert,
  Modal,
} from "react-native";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import {
  Box,
  AspectRatio,
  Stack,
  Heading,
  Text,
  HStack,
  Spinner,
} from "native-base";
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
import { AntDesign } from "@expo/vector-icons";
import axios from "axios";
import { useAppDispatch, useAppSelector } from "@/Hooks/redux";
import { LocalizationKey, i18n } from "@/Localization";
import { UPDATE_RECENT } from "@/Store/reducers";
import LoadingModal from "./CustomModal/LoadingModal";
import SuccessModal from "./CustomModal/SuccessModal";

const DishBox = (props: DishBoxProps) => {
  const { food, navigation,index } = props;
  const dispatch = useAppDispatch();
  const token = useAppSelector((state) => state.user.token);
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  const handleAddToFavorite = async () => {
    await axios
      .post(
        `http://103.77.214.189:8000/favorite-food/`,
        {
          food: food.id,
        },
        {
          headers: {
            accept: "application/json",
            Authorization: "Bearer " + token,
          },
        }
      )
      .then((res) => {
        setModalVisible(true);
        setTimeout(() => {
          setModalVisible(false);
        }, 5000);
      })
      .catch(function (error) {
        console.log(error);
        if (error.response) {
          console.log(error.response.data);
          console.log(error.response.status);
          if (error.response.status == 400) {
            Alert.alert("Note", error.response.data.message, [
              { text: "OK", style: "cancel" },
            ]);
          } else {
            Alert.alert("Note", "Something went wrong. Please try again.", [
              { text: "OK", style: "cancel" },
            ]);
          }
        }
      })
      .finally(() => {
        setLoading(false);
      });
  };
  const handelToDetail = (_food) => {
    dispatch(UPDATE_RECENT(_food));
    navigation.navigate("Detail", {
      food_id: _food.id,
    });
  };
  return (
    <Box
      maxW="49%"
      rounded="lg"
      overflow="hidden"
      borderColor="coolGray.200"
      borderRadius={20}
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
      <TouchableOpacity
        onPress={() => handelToDetail(food)}
        // onPress={() =>navigation.navigate("Detail", {
        //   food_id: food.id,
        // })}
      >
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
            <Text
              style={{
                fontSize: 15,
                fontWeight: "bold",
              }}
            >
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
      <View
        style={{
          position: "absolute",
          top: 5,
          left: 5,
          padding: 2,
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-around",
          backgroundColor: "rgba(255,255,255,0.75)",
          alignItems: "center",
          borderRadius: 10,
        }}
      >
        <Text style={{ fontWeight: "bold", fontSize: 15, marginRight: 5 }}>
          {food.avg_rating}
        </Text>
        <AntDesign name="star" size={24} color="#FFC529" />
      </View>

      <TouchableOpacity
        onPress={() => {
          setLoading(true);
          handleAddToFavorite();
        }}
        style={{
          position: "absolute",
          top: 5,
          right: 5,
          padding: 2,
          backgroundColor: "rgba(255,255,255,0.75)",
          borderRadius: 10,
        }}
      >
        <Ionicons name="heart-circle" size={24} color="#FE724C" />
      </TouchableOpacity>

      <LoadingModal visible={loading} />
      <SuccessModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
      />
    </Box>
  );
};

export default DishBox;
