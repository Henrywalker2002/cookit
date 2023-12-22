import React, { useState, useEffect } from "react";
import { HStack, Spinner, Heading } from "native-base";
import { i18n, LocalizationKey } from "@/Localization";
import {
  View,
  Text,
  Button,
  TouchableOpacity,
  Image,
  TextInput,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import axios from "axios";
import { useFocusEffect } from "@react-navigation/native";
export const ProfileContainer = () => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState({});
  const [gender, setGender] = useState(''); // State to store selected gender

  const handleGenderChange = (itemValue) => {
    setGender(itemValue);
  };
  const user_id = "cc4cc521-95a9-46cd-bf26-2913c06f7cbd";
  const fetchUser = async () => {
    await axios
      .get(`http://103.77.214.189:8000/user/${user_id}/`, {
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
        setUser(res.data);
        setGender(res.data.gender);
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
    fetchUser();
  }, [loading]);

  const handleChangeInfo = (name, value) => {
    setUser({ ...user, [name]: value });
  };
  useFocusEffect(
    React.useCallback(() => {
      fetchUser();
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
      {/* <View>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <AntDesign name="left" size={24} color="black" />
        </TouchableOpacity>
      </View> */}
      {loading ? (
        <HStack space={2} justifyContent="center">
          <Spinner accessibilityLabel="Loading posts" />
          <Heading color="primary.500" fontSize="md">
            {i18n.t(LocalizationKey.LOADING)}
          </Heading>
        </HStack>
      ) : (
        <View>
          <View
            style={{
              alignItems: "center",
            }}
          >
            <TouchableOpacity>
              <Ionicons
                name="md-person-circle-outline"
                size={30}
                color="black"
              />
            </TouchableOpacity>
            <View>
              <Text> {user.full_name}</Text>
            </View>
            <View>
              <Text> {user.activity_level}</Text>
            </View>
            <TouchableOpacity
              style={{
                padding: 5,
                backgroundColor: "#F8B64C",
                borderRadius: 20,
                width: "30%",
                margin: 5,
                elevation: 8,
                alignItems: "center",
              }}
            >
              <Text> Buy Premium</Text>
            </TouchableOpacity>
          </View>
          <View
            style={{
              padding: 25
            }}
          >
            <Text> Fullname</Text>
            <TextInput
              style={{
                width: "100%",
                height: 50,
                borderColor: "gray",
                borderWidth: 1,
                marginBottom: 20,
                paddingHorizontal: 10,
                borderRadius: 10
              }}
              onChangeText={(text) => handleChangeInfo("full_name", text)}
              value={user.full_name}
            />

            <Text> Email</Text>
            <TextInput
              style={{
                width: "100%",
                height: 50,
                borderColor: "gray",
                borderWidth: 1,
                marginBottom: 20,
                marginTop: 10,
                paddingHorizontal: 10,
                borderRadius: 10
              }}
              editable={false}
              onChangeText={(text) => handleChangeInfo("full_name", text)}
              value={user.email}
            />

            <Text> Gender</Text>

            <Text>Date of Birth</Text>
          </View>
        </View>
      )}
    </View>
  );
};
