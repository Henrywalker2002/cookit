import React, { useState, useEffect } from "react";
import { HStack, Spinner, Heading } from "native-base";
import { i18n, LocalizationKey } from "@/Localization";
import {
  Button,
  ScrollView,
  StyleSheet,
  Text,
  View,
  Alert,
  Image,
  Modal,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Rating, AirbnbRating } from "react-native-elements";
import { AntDesign } from "@expo/vector-icons";
import axios from "axios";
import { useAppSelector } from "@/Hooks/redux";
import LoadingModal from "@/Components/CustomModal/LoadingModal";
import SuccessModal from "@/Components/CustomModal/SuccessModal";
import { useFocusEffect } from "@react-navigation/native";

export interface IDetail{
  route: any;
  navigation: any;
}

export const DetailContainer = ({ route, navigation }) => {
  const { food_id } = route.params;
  // const food_id = 5;
  const [detail, setDetail] = useState({
    id: 0,
    name: "",
    description: "",
    image: "https://spoonacular.com/recipeImages/640803-556x370.jpg",
    ingredients: [{original: ''}],
    instructions: [{
      step: ''
    }],
    nutrients: [{
      name: '',
      amount: 0.0,
      unit: ''
    }],
    calories: 0,
    time_taken: 0,
    avg_rating: 0,
  });
  const [loading, setLoading] = useState(true);
  const [text, setText] = useState("");
  const [rating, setRating] = useState(0);
  const [showForm, setShowForm] = useState(false);
  const [modalLoading, setModalLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const token = useAppSelector((state) => state.user.token);
  const handleTextChange = (inputText: React.SetStateAction<string>) => {
    setText(inputText);
  };

  const handleRating = (rated: React.SetStateAction<number>) => {
    setRating(rated);
  };

  const displayForm = () => {
    setShowForm(true);
  };

  const closeForm = () => {
    setShowForm(false);
    setRating(0);
    setText("");
  };

  const handleSubmit = async () => {
    await axios
    .post(`http://103.77.214.189:8000/food/${food_id}/feedback/`,{
      rating: rating,
      comment: text
    }, {
      headers: {
        accept: "application/json",
        Authorization: "Bearer " + token,
      },
    })
    .then((res) => {
      // setTimeout(() => {
      //   Alert.alert("Note", "Successfull", [
      //     { text: "OK", style: "cancel" },
      //   ]);
      // }, 500);
      Alert.alert("Note", "Successfull", [
        { text: "OK", style: "cancel" },
      ]);
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
      setModalLoading(false);
      closeForm();
    });
  };

  const fetchDetail = async () => {
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
  };
  useEffect(() => {
    fetchDetail();
  });

  const handleAddToFavorite = async () => {
    await axios
      .post(
        `http://103.77.214.189:8000/favorite-food/`,
        {
          food: food_id,
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
        setModalLoading(false);
        closeForm();
      });
  };

  useFocusEffect(() => {
    return () => {};
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
                alt="image"
              />
            </View>
            <View
              style={{
                marginTop: 10,
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

            <View
              style={{
                borderBottomColor: "black",
                borderBottomWidth: StyleSheet.hairlineWidth,
                marginBottom: 5,
              }}
            >
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  gap: 5,
                  marginTop: 5,
                  marginBottom: 5,
                  alignItems: "center",
                }}
              >
                <AntDesign name="star" size={24} color="#FFC529" />
                <Text style={{ fontWeight: "bold", fontSize: 18 }}>
                  {detail.avg_rating}
                </Text>

                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate("Review", {
                      food_id: food_id,
                    })
                  }
                  style={{
                    alignItems: "center",
                  }}
                >
                  <Text
                    style={{
                      color: "#FE724C",
                      textDecorationLine: "underline",
                    }}
                  >
                    See reviews
                  </Text>
                </TouchableOpacity>
              </View>

              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  gap: 5,
                  marginTop: 5,
                  marginBottom: 5,
                  alignItems: "center",
                }}
              >
                <Ionicons name="heart-circle" size={24} color="#FE724C" />
                <Text> 273 Likes </Text>
              </View>
            </View>
            <View
              style={{
                padding: 5,
                borderBottomColor: "black",
                borderBottomWidth: StyleSheet.hairlineWidth,
                marginTop: 10,
                marginBottom: 10,
                gap: 5,
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
              <Text style={{letterSpacing: 0.5}}>{detail.description}</Text>
            </View>

            <View
              style={{
                padding: 5,
                borderBottomColor: "black",
                borderBottomWidth: StyleSheet.hairlineWidth,
                marginTop: 10,
                marginBottom: 10,
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
              {detail.ingredients?.map((ingredient,idx) => {
                return (
                  <View
                    key={idx}
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      gap: 5,
                      marginTop: 5,
                      marginBottom: 5,
                    }}
                  >
                    <AntDesign
                      name="checkcircle"
                      size={18}
                      color="rgb(254,114,76)"
                    />
                    <Text style={{letterSpacing: 0.5}}>{ingredient.original}</Text>
                  </View>
                );
              })}
            </View>
            <View
              style={{
                padding: 5,
                borderBottomColor: "black",
                borderBottomWidth: StyleSheet.hairlineWidth,
                marginTop: 10,
                marginBottom: 10,
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
              {detail.instructions?.map((item, idx) => {
                return (
                  <View key={idx}
                    style={{
                      marginTop: 5,
                      marginBottom: 5,
                    }}
                  >
                    <Text style={{letterSpacing: 0.5}}>{`${idx + 1} - ${item.step}`}</Text>
                  </View>
                );
              })}
            </View>

            <View
              style={{
                padding: 5,
                marginTop: 10,
                marginBottom: 10,
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
              {detail.nutrients?.map((item,idx) => {
                return (
                  <View
                    key={idx}
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "space-between",
                      padding: 5,
                      borderBottomColor: "black",
                      borderBottomWidth: StyleSheet.hairlineWidth,
                      marginTop: 5,
                      marginBottom: 5,
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
                alignItems: "center",
                padding: 5,
              }}
            >
              <TouchableOpacity
                onPress={displayForm}
                style={{
                  minWidth: "45%",
                  backgroundColor: "#FE724C",
                  padding: 10,
                  borderRadius: 10,
                  alignItems: "center",
                  marginBottom: 10,
                  marginTop: 10,
                }}
              >
                <Text style={{ color: "white", fontWeight: "bold" }}>
                  FEEDBACK
                </Text>
              </TouchableOpacity>
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
                        onPress={() => {
                          setModalLoading(true);
                          handleSubmit();
                        }}
                        color="#FE724C"
                      />
                    </View>
                  </View>
                </View>
              </Modal>
            </View>
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              style={{
                position: "absolute",
                top: 5,
                left: 20,
                padding: 2,
                backgroundColor: "rgba(255,255,255,0.75)",
                borderRadius: 10,
              }}
            >
              <AntDesign name="left" size={24} color="black" />
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => {
                setModalLoading(true);
                handleAddToFavorite();
              }}
              style={{
                position: "absolute",
                top: 5,
                right: 20,
                padding: 2,
                backgroundColor: "rgba(255,255,255,0.75)",
                borderRadius: 10,
              }}
            >
              <Ionicons name="heart-circle" size={24} color="#FE724C" />
            </TouchableOpacity>
            <LoadingModal visible={modalLoading} />
            <SuccessModal
              visible={modalVisible}
              onClose={() => setModalVisible(false)}
            />
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
