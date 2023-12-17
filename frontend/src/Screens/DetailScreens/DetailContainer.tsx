import React, { useState, useEffect } from "react";
import { Detail } from "./Detail";
import {
  Button,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,Alert,
  Image,
} from "react-native";
import axios from "axios";
export const DetailContainer = (props: any) => {
  const food_id = 6;
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
  const fetchDetail = async () => {
    try {
      await axios
        .get(`http://103.77.214.189:8000/food/5/`, {
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
  return loading ? (
    <View>
      <Text> Loading </Text>
    </View>
  ) : (
    <ScrollView style={styles.scrollView}>
      <View style={{ paddingHorizontal: 15 }}>
        <View>
          <Image
            style={{
              width: 50,
              height: 50,
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
            }}
          >
            {" "}
            {detail.name}
          </Text>
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
          {detail.ingredients?.map((ingredient, idx) => {
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
          {detail.instructions?.map((item, idx) => {
            return <Text>{`${item.number} - ${item.step}`}</Text>;
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
            Nutrition Facts
          </Text>
          {detail.nutrients?.map((item, idx) => {
            return (
              <View style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                padding: 5,
                borderBottomColor: "black",
                borderBottomWidth: StyleSheet.hairlineWidth,
              }}> 
                <Text> {item.name}</Text>
                <Text> {`${item.amount} ${item.unit}`}</Text>
              </View>
            );
          })}
        </View>
        
        <Button
        title="Feedback"
        color="#f194ff"
        onPress={() => Alert.alert('Button with adjusted color pressed')}
      />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: "white",
  },
});
