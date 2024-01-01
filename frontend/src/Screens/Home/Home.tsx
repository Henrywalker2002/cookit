import { i18n, LocalizationKey } from "@/Localization";
import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  BackHandler
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { HStack, Spinner, Heading, Flex } from "native-base";
import { User } from "@/Services";
import ScreenTitle from "@/Components/ScreenTitle";
import DishBox from "@/Components/DishBox";
import { useAppDispatch, useAppSelector } from "@/Hooks/redux";
import axios from "axios";
import { UPDATE_RECENT } from "@/Store/reducers";

export interface IHomeProps {
  data: User | undefined;
  navigation: any;
}

export const Home = (props: IHomeProps) => {
  const { data, navigation } = props;
  const dispatch = useAppDispatch();
  const token = useAppSelector((state) => state.user.token);
  const recent_food = useAppSelector((state) => state.user.recendFood);
  const [loading, setLoading] = useState(true);
  const [foodList, setFoodList] = useState( [
      {
        id: 0,
        name: "",
        description: "",
        image: "",
        time_taken: 0,
        avg_rating: 0.0,
      },
    ],
  );
  // const fetchFood = async () => {
  //   await axios
  //     .get(`http://103.77.214.189:8000/food/get_foods_by_user/`, {
  //       headers: {
  //         accept: "application/json",
  //         Authorization: "Bearer " + token,
  //       },
  //     })
  //     .then((res) => {
  //       setFoodList(res.data.recommended_foods);
  //       res.data.recent_foods.map( (item: any)=>{
  //         dispatch(UPDATE_RECENT(item))
  //       })
  //       setLoading(false);
  //     })
  //     .catch(function (error) {
  //       console.log(error);
  //       if (error.response) {
  //         console.log(error.response.data);
  //         console.log(error.response.status);
  //         console.log(error.response.headers);
  //       }
  //     });
  // };

  // useEffect(() => {
  //   fetchFood();
  // },[token, dispatch]);

  useEffect(() => {
    const fetchFood = async () => {
      try {
        const response = await axios.get('http://103.77.214.189:8000/food/get_foods_by_user/', {
          headers: {
            accept: 'application/json',
            Authorization: 'Bearer ' + token,
          },
        });

        const { recommended_foods, recent_foods } = response.data;

        setFoodList(recommended_foods);
        recent_foods.forEach((item) => {
          dispatch(UPDATE_RECENT(item));
        });

        setLoading(false);
      } catch (error) {
        console.error('Error fetching food data:', error);
        setLoading(false);
      }
    };

    fetchFood();
  }, [token, dispatch]);
  
  return (
    <Flex style={styles.container}>
      <ScreenTitle title="Dashboard" />
      <ScrollView>
        {/* Recommended food */}
        <Flex
          direction="row"
          justify="space-between"
          wrap="wrap"
          alignContent={"center"}
        >
          <View>
            <Text style={styles.label}>Recommended</Text>
          </View>
          <TouchableOpacity>
            <Text>View All </Text>
          </TouchableOpacity>
        </Flex>
        {loading ? (
          <HStack space={2} justifyContent="center">
            <Spinner accessibilityLabel="Loading posts" />
            <Heading color="primary.500" fontSize="md">
              {i18n.t(LocalizationKey.LOADING)}
            </Heading>
          </HStack>
        ) : (
          <Flex
            direction="row"
            style={{ gap: 3 }}
            justify="center"
            wrap="wrap"
            alignContent={"space-around"}
          >
            {foodList.map((item,index) => {
              return (
                <DishBox navigation={navigation} food={item} index={index} key={index}/>
              );
            })}
          </Flex>
        )}
        {/* Recent food  */}

        <Flex
          direction="row"
          justify="space-between"
          wrap="wrap"
          alignContent={"center"}
        >
          <View>
            <Text style={styles.label}>Recent</Text>
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
            {recent_food?.map((item,index) => {
              return (
                <DishBox navigation={navigation} food={item} index={index} key={index}/>
              );
            })}
          </Flex>
      </ScrollView>

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
  container: {
    marginTop: "12%",
    flex: 1,
    justifyContent: "center",
    backgroundColor: "white",
  },
});
