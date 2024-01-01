import FavoriteItem from "@/Components/FavoriteItem";
import ScreenTitle from "@/Components/ScreenTitle";
import { useAppSelector } from "@/Hooks/redux";
import { LocalizationKey, i18n } from "@/Localization";
import { useFocusEffect } from "@react-navigation/native";
import axios from "axios";
import { HStack, Heading, ScrollView, Spinner, View } from "native-base";
import React from "react";
import { useEffect, useState } from "react";
import { Text } from "react-native";
export const Favorite = ({navigation}) => {
  const token = useAppSelector((state) => state.user.token);
  const [loading, setLoading] = useState(true);
  const [favorite, setFavorite] = useState({
    count: 0,
    next: null,
    previous: null,
    results: [
      {
        id: 0,
        name: "",
        description: "",
        image: "",
        time_taken: 0,
        avg_rating: 0,
      },
    ],
  });

  const fetchFavorite = async () => {
    await axios
      .get(`http://103.77.214.189:8000/favorite-food/`, {
        headers: {
          accept: "application/json",
          Authorization: "Bearer " + token,
        },
      })
      .then((res) => {
        setFavorite(res.data);
        setLoading(false);
      })
      .catch(function (error) {
        console.log(error);
        if (error.response) {
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
        }
      });
  };

  useEffect(() => {
    fetchFavorite();
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      fetchFavorite();
    }, [])
  );
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#fff",
      }}
    >
      <View
        style={{
          width: "100%",
          height: "6%",
        }}
      ></View>
      <View>
        <ScreenTitle title="Favorite" />
        {loading ? (
          <HStack space={2} justifyContent="center">
            <Spinner accessibilityLabel="Loading posts" />
            <Heading color="primary.500" fontSize="md">
              {i18n.t(LocalizationKey.LOADING)}
            </Heading>
          </HStack>
        ) : (
          <ScrollView 
          style={{
            padding: 10,
          }}>
            {favorite.results.map((item, index) => {
              return (
                <FavoriteItem
                  navigation={navigation}
                  food={item}
                  index={index}
                  key={index}
                />
              );
            })}
          </ScrollView>
        )}
      </View>
    </View>
  );
};
