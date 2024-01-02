import React, { useState, useEffect } from "react";
import { HStack, Spinner, Heading } from "native-base";
import { i18n, LocalizationKey } from "@/Localization";
import axios from "axios";
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
import { useFocusEffect } from "@react-navigation/native";
import { Rating, AirbnbRating } from "react-native-elements";
import { AntDesign } from "@expo/vector-icons";
import { useAppSelector } from "@/Hooks/redux";
import LoadingModal from "@/Components/CustomModal/LoadingModal";
import { FontAwesome } from "@expo/vector-icons";
export interface IReview {
  route: any;
  navigation: any;
}

export const ReviewContainer = ({ route, navigation }: IReview) => {
  const { food_id } = route.params;
  const [text, setText] = useState("");
  const [rating, setRating] = useState(0);
  const [showForm, setShowForm] = useState(false);

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

  const formatDate = (timestamp: string | number | Date) => {
    const date = new Date(timestamp);
    const day = date.getDate().toString().padStart(2, "0"); // Get day with leading zero if needed
    const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Get month with leading zero if needed
    const year = date.getFullYear();

    return `${day}-${month}-${year}`;
  };

  const token = useAppSelector((state) => state.user.token);
  const [modalLoading, setModalLoading] = useState(false);
  const handleSubmit = async () => {
    await axios
      .post(
        `http://103.77.214.189:8000/food/${food_id}/feedback/`,
        {
          rating: rating,
          comment: text,
        },
        {
          headers: {
            accept: "application/json",
            Authorization: "Bearer " + token,
          },
        }
      )
      .then((res) => {
        setTimeout(() => {
          Alert.alert("Note", "Successfull", [{ text: "OK", style: "cancel" }]);
        }, 500);
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

  const [loading, setLoading] = useState(true);
  const [star, setStar] = useState(0.0);
  const [review, setReview] = useState([
    {
      id: 0,
      rating: 0,
      comment: "",
      created_at: "",
      user: {
        id: "",
        full_name: "",
        avatar: "",
      },
    },
  ]);
  const fetchFeedback = async () => {
    await axios
      .get(`http://103.77.214.189:8000/food/${food_id}/get_feedback/`, {
        headers: {
          accept: "application/json",
          Authorization: "Bearer " + token,
        },
      })
      .then((res) => {
        setStar(res.data.avg_rating);
        setReview(res.data.feedbacks);
        setLoading(false);
      })
      .catch(function (error) {
        console.log(error);
        if (error.response) {
          console.log(error.response.data);
          console.log(error.response.status);
          Alert.alert("Note", "Something went wrong. Please try again.", [
            { text: "OK", style: "cancel" },
          ]);
        }
      });
  };

  useEffect(() => {
    fetchFeedback();
  });

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
        <ScrollView>
          <LoadingModal visible={modalLoading} />
          <View
            style={{
              alignItems: "center",
              padding: 5,
              margin: 5,
            }}
          >
            <Text
              style={{
                fontSize: 24,
                fontWeight: "bold",
              }}
            >
              {" "}
              Overall Rating
            </Text>
            <View
            style={{
              margin: 5,
              display: "flex",
              columnGap: 2,
              flexDirection: "row",
              alignItems: "center",
            }}
            >
              <Text
                style={{
                  fontSize: 40,
                }}
              >
                {" "}
                {star}
              </Text>
              <FontAwesome name="star" size={40} color="#FFC529" />
            </View>
            <Text
              style={{
                fontSize: 15,
              }}
            >
              {" "}
              Based on {review.length} reviews
            </Text>
          </View>
          <View
            style={{
              padding: 5,
              margin: 5,
              display: "flex",
              justifyContent: "space-between",
              columnGap: 2,
              flexDirection: "row",
            }}
          >
            <View>
              <Text
                style={{
                  fontSize: 15,
                  fontWeight: "bold",
                  textAlign: "center",
                }}
              >
                {" "}
                All Reviews - {review.length} reviews
              </Text>
            </View>

            <View>
              <Button
                title="Add review"
                onPress={displayForm}
                color="#FE724C"
              />

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
          </View>
          <View
            style={{
              padding: 5,
              margin: 5,
            }}
          >
            {review.map((item,idx) => {
              return (
                <View key={idx}>
                  <View
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "flex-start",
                      rowGap: 4,
                    }}
                  >
                    <View
                      style={{
                        width: 48,
                        height: 48,
                        borderRadius: 75,
                        borderWidth: 1,
                        borderColor: "#fff",
                        overflow: "hidden",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <Image
                        source={require("../../../assets/avatar.png")}
                        alt="image"
                        style={{
                          width: "100%",
                          height: "100%",
                          resizeMode: "cover",
                        }}
                      />
                    </View>
                    <View>
                      <Text
                        style={{
                          fontWeight: "bold",
                        }}
                      >
                        {" "}
                        {item.user.full_name}
                      </Text>
                      <Rating
                        fractions={1}
                        imageSize={11}
                        readonly
                        startingValue={item.rating}
                      />
                    </View>
                  </View>
                  <View
                    style={{
                      paddingLeft: 48,
                    }}
                  >
                    <Text style={{ color: "#7F7D92", fontSize: 16 }}>
                      {item.comment}
                    </Text>
                    <Text style={{ color: "#7F7D92", fontSize: 12 }}>
                      {formatDate(item.created_at)}
                    </Text>
                  </View>
                </View>
              );
            })}
          </View>
        </ScrollView>
      )}
    </View>
  );
};
