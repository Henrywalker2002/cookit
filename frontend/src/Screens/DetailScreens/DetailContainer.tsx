import React, { useState, useEffect } from "react";
import { Detail } from "./Detail";
import { HStack, Spinner, Heading } from "native-base";
import { i18n, LocalizationKey } from "@/Localization";
import {
  Button,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
  Alert,
  Image,
  Modal,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { Rating, AirbnbRating } from "react-native-elements";
import { RootScreens } from "..";
import { AntDesign } from "@expo/vector-icons";
import axios from "axios";
import { useAppSelector } from "@/Hooks/redux";
export const DetailContainer = ({ route,navigation }) => {
  const { food_id } = route.params;
  const [detail, setDetail] = useState({
    id: 0,
    name: "",
    description: "",
    image: "https://spoonacular.com/recipeImages/640803-556x370.jpg",
    ingredients: [],
    instructions: [],
    nutrients: [],
    calories: 0,
    time_taken: 0,
    avg_rating: 0,
  });
  const [loading, setLoading] = useState(true);
  const [text, setText] = useState("");
  const [rating, setRating] = useState(0);
  const [showForm, setShowForm] = useState(false);

  const handleTextChange = (inputText) => {
    setText(inputText);
  };

  const handleRating = (rated) => {
    setRating(rated);
  };

  const displayForm = () => {
    setShowForm(true);
  };

  const closeForm = () => {
    setShowForm(false);
    // You can add logic here to handle form submission or closing actions
  };

  const handleSubmit = () => {};
  const token = useAppSelector((state) => state.user.token);
  const fetchDetail = async () => {
    try {
      await axios
        .get(`http://103.77.214.189:8000/food/${food_id}/`, {
          headers: {
            accept: "application/json",
            Authorization: "Bearer " + token,
          },
        })
        .then((res) => {
          setDetail(res.data);
          // console.log(res.data)
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
    } catch (error) {}
  };
  useEffect(() => {
    fetchDetail();
  });
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
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={{
            padding: 3,
            backgroundColor: "#FFFFFF",
            borderRadius: 10,
            width: "10%",
            margin: 5,
            elevation: 8,
          }}
        >
          <AntDesign name="left" size={24} color="black" />
        </TouchableOpacity>
      </View>
      {loading ? (
        <HStack space={2} justifyContent="center">
          <Spinner accessibilityLabel="Loading posts" />
          <Heading color="primary.500" fontSize="md">
            {i18n.t(LocalizationKey.LOADING)}
          </Heading>
        </HStack>
      ) : (
        <ScrollView style={styles.scrollView}>
          <View style={{ paddingHorizontal: 15 }}>
            <View
              style={{
                alignItems: "center",
              }}
            >
              <Image
                style={{
                  width: "100%",
                  height: 150,
                  borderRadius: 5,
                }}
                source={{
                  uri: detail.image,
                }}
              />
            </View>
            <View
              style={{
                padding: 5,
                borderBottomColor: "black",
                borderBottomWidth: StyleSheet.hairlineWidth,
              }}
            >
              <Text
                style={{
                  fontSize: 15,
                  fontWeight: "bold",
                  color: "orange",
                }}
              >
                {" "}
                {detail.name}
              </Text>
            </View>

            <View>
              <Rating
                type="star"
                imageSize={20}
                defaultRating={detail.avg_rating}
                style={{ paddingVertical: 10 }}
                readonly={true}
              />
              <Button
                title="Go to Review Screen"
                onPress={() =>
                  navigation.navigate("Review", {
                    food_id: food_id,
                  })
                }
              />
            </View>
            <View
              style={{
                padding: 5,
                borderBottomColor: "black",
                borderBottomWidth: StyleSheet.hairlineWidth,
              }}
            >
              <Text
                style={{
                  fontSize: 15,
                  fontWeight: "bold",
                }}
              >
                {" "}
                Description
              </Text>
              <Text>{detail.description}</Text>
            </View>

            <View
              style={{
                padding: 5,
                borderBottomColor: "black",
                borderBottomWidth: StyleSheet.hairlineWidth,
              }}
            >
              <Text
                style={{
                  fontSize: 15,
                  fontWeight: "bold",
                }}
              >
                {" "}
                Ingredients
              </Text>
              {detail.ingredients?.map((ingredient) => {
                return <Text>{ingredient.original}</Text>;
              })}
            </View>
            <View
              style={{
                padding: 5,
                borderBottomColor: "black",
                borderBottomWidth: StyleSheet.hairlineWidth,
              }}
            >
              <Text
                style={{
                  fontSize: 15,
                  fontWeight: "bold",
                }}
              >
                {" "}
                Steps
              </Text>
              {detail.instructions?.map((item) => {
                return <Text>{`${item.number} - ${item.step}`}</Text>;
              })}
            </View>

            <View
              style={{
                padding: 5,
              }}
            >
              <Text
                style={{
                  fontSize: 15,
                  fontWeight: "bold",
                }}
              >
                {" "}
                Nutrition Facts
              </Text>
              {detail.nutrients?.map((item) => {
                return (
                  <View
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "space-between",
                      padding: 5,
                      borderBottomColor: "black",
                      borderBottomWidth: StyleSheet.hairlineWidth,
                    }}
                  >
                    <Text> {item.name}</Text>
                    <Text> {`${item.amount} ${item.unit}`}</Text>
                  </View>
                );
              })}
            </View>
            <View
              style={{
                flex: 1,
                alignItems: "center",
                justifyContent: "center",
                padding: 5,
                margin: 5,
              }}
            >
              <Button title="Feedback" onPress={displayForm} />
              <Modal
                visible={showForm}
                animationType="slide"
                transparent={true}
                onRequestClose={closeForm}
              >
                <View
                  style={{
                    flex: 1,
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: "rgba(0, 0, 0, 0.5)",
                  }}
                >
                  <View
                    style={{
                      backgroundColor: "white",
                      padding: 20,
                      borderRadius: 10,
                      alignItems: "center",
                      elevation: 5,
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 20,
                        fontWeight: "bold",
                      }}
                    >
                      {" "}
                      Send your feedback
                    </Text>
                    <AirbnbRating
                      count={5}
                      reviews={["Terrible", "Bad", "OK", "Good", "Excellent"]}
                      defaultRating={0}
                      size={20}
                      showRating
                      onFinishRating={handleRating}
                    />
                    <TextInput
                      style={{
                        width: 300,
                        borderColor: "gray",
                        borderWidth: 1,
                        marginBottom: 20,
                        marginTop: 10,
                        paddingHorizontal: 10,
                      }}
                      multiline
                      numberOfLines={4}
                      maxLength={40}
                      placeholder="Enter your feedback"
                      onChangeText={handleTextChange}
                      value={text}
                    />

                    <View
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-around",
                        width: "80%",
                      }}
                    >
                      <Button
                        title="Cancel"
                        onPress={closeForm}
                        color="#FE724C"
                      />
                      <Button
                        title="Send"
                        onPress={handleSubmit}
                        color="#FE724C"
                      />
                    </View>
                  </View>
                </View>
              </Modal>
            </View>
          </View>
        </ScrollView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: "white",
  },
});
