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
  TouchableOpacity 
} from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { Rating, AirbnbRating } from "react-native-elements";
import { AntDesign } from "@expo/vector-icons";

export const ReviewContainer = ({ route, navigation }) => {
  const { food_id } = route.params;
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
    //add logic here to handle form submission or closing actions
  };

  const handleSubmit = () => {};
  const [loading, setLoading] = useState(true);
  const [star, setStar] = useState(0.0);
  const [review, setReview] = useState([]);
  const fetchFeedback = async () => {
    await axios
      .get(`http://103.77.214.189:8000/food/${food_id}/get_feedback/`, {
        withCredentials: true,
        headers: {
          accept: "application/json",
          "X-CSRFToken":
            "qVAqd295uZlJp78iO9UjT3HMaii3PCbVV3zGzi18qUnTfxYmCy4Wb2P480R0BU88",
          Cookie:
            "sessionid=dinch9dn99dlcqrcm07qhyb30x0yqv6k; csrftoken=LUBSNIyPQDejOE1KUXDprA0GTcpAFM90",
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
          console.log(error.response.headers);
        }
      });
  };

  useEffect(() => {
    fetchFeedback();
  });
  useFocusEffect(() => {
    // Cleanup function (nếu cần)
    return () => {
      // Hàm này sẽ được gọi khi màn hình không còn được focus
      // Đây là nơi để hủy bỏ các event listener (nếu có)
    };
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
        <TouchableOpacity onPress={() => navigation.goBack()} style={{
          padding: 3,
          backgroundColor: "#FFFFFF",
          borderRadius: 10,
          width: "10%",
          margin: 5,
          elevation: 8,
        }}>
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
              display: 'flex',
              justifyContent: 'space-between',
              columnGap: 2,
              flexDirection: "row",
            }}
          >
            <View >
              <Text
                style={{
                  fontSize: 15,
                  fontWeight: "bold",textAlign: 'center'
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
                    backgroundColor: 'rgba(0, 0, 0, 0.5)',
                  }}
                >
                  <View
                    style={{
                      backgroundColor: 'white',
                      padding: 20,
                      borderRadius: 10,
                      alignItems: 'center',
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
                    <Button title="Cancel" onPress={closeForm} color="#FE724C"/>
                    <Button title="Send" onPress={handleSubmit} color="#FE724C"/>
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
