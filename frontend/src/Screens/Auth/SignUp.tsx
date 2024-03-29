import React, { useState, useRef } from "react";
import { Button, Pressable, Text, View } from "native-base";
import { Alert, StyleSheet, TextInput, TouchableOpacity } from "react-native";
import { AuthStackParamList } from "@/Navigation/Auth";
import { RootStackParamList } from "@/Navigation";
import { RootScreens } from "..";
import { CompositeScreenProps } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import axios from "axios";
import LoadingModal from "@/Components/CustomModal/LoadingModal";
type AuthScreenNavigatorProps = NativeStackScreenProps<
  AuthStackParamList,
  "Signup"
>;

type RootScreenNavigatorProps = NativeStackScreenProps<
  RootStackParamList,
  RootScreens.AUTH
>;

type SignupScreenProps = CompositeScreenProps<
  AuthScreenNavigatorProps,
  RootScreenNavigatorProps
>;

export const Signup = ({ navigation }: SignupScreenProps) => {
  const [info, setInfo] = useState({
    full_name: "",
    email: "",
    password: "",
  });

  const [isShow, setIsShow] = useState(false);
  const [loading, setLoading] = useState(false);

  const animation = useRef(null);

  const handleClickShow = () => {
    setIsShow(!isShow);
  };

  const handleChangeInfo = (name: string, value: string) => {
    setInfo({ ...info, [name]: value });
  };

  const handleSubmit = async () => {
    await axios
      .post(`http://103.77.214.189:8000/user/`, info)
      .then((res) => {
        setTimeout(() => {
          Alert.alert(
            "Note",
            "Congratulations, your account has been successfully created!",
            [{ text: "OK", style: "cancel" }]
          );
        }, 500);
        navigation.navigate("Login");
      })
      .catch((error) => {
        if (error.response) {
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
          if (error.response.status == 400) {
            alert("Enter a valid email address");
          } else {
            alert(error.response.data);
          }
        }
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <View style={styles.container}>
      <View style={{ margin: 20 }}>
        <View style={{ marginBottom: 10, alignItems: "center" }}>
          <Text
            style={{
              fontWeight: "bold",
              fontSize: 21,
              textAlign: "center",
            }}
          >
            {" "}
            Sign Up{" "}
          </Text>
        </View>
        <Text> Fullname</Text>
        <TextInput
          style={{
            width: "100%",
            height: 50,
            borderColor: "gray",
            borderWidth: 1,
            marginBottom: 20,
            paddingHorizontal: 10,
            borderRadius: 10,
            color: "black",
          }}
          onChangeText={(text) => handleChangeInfo("full_name", text)}
          placeholder="Enter your fullname"
          value={info.full_name}
        />

        <Text> Email</Text>
        <TextInput
          style={{
            width: "100%",
            height: 50,
            borderColor: "gray",
            borderWidth: 1,
            marginBottom: 20,
            paddingHorizontal: 10,
            borderRadius: 10,
            color: "black",
          }}
          onChangeText={(text) => handleChangeInfo("email", text)}
          placeholder="Enter your email address"
          value={info.email}
        />

        <Text> Password</Text>
        <View
          style={{
            flexDirection: "row",
            borderWidth: 1,
            borderColor: "gray",
            borderRadius: 10,
            paddingHorizontal: 10,
            marginBottom: 20,
            alignItems: "center",
          }}
        >
          <TextInput
            style={{ flex: 1, height: 50 }}
            secureTextEntry={isShow}
            onChangeText={(text) => handleChangeInfo("password", text)}
            placeholder="Enter your password"
            value={info.password}
          />
          <TouchableOpacity
            style={{
              paddingHorizontal: 6,
            }}
            onPress={handleClickShow}
          >
            <Ionicons
              name={isShow ? "ios-eye-off" : "ios-eye"}
              size={24}
              color="#FE724C"
            />
          </TouchableOpacity>
        </View>

        <View style={{ alignItems: "center" }}>
          <TouchableOpacity
            onPress={() => {
              setLoading(true);
              handleSubmit();
            }}
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
            <Text color="white">Signup</Text>
          </TouchableOpacity>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Text>Already have an account? </Text>
            <TouchableOpacity onPress={() => navigation.navigate("Login")}>
              <Text
                style={{
                  color: "#FE724C",
                  fontWeight: "bold",
                }}
              >
                Login
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        <Text
          style={{
            textAlign: "center",
            margin: 20,
          }}
        >
          Sign up with
        </Text>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            width: "100%",
            marginBottom: 20,
          }}
        >
          <Button
            width={"45%"}
            bg={"#F8F8F8"}
            borderWidth={1}
            borderColor={"#DDDDDD"}
            paddingTop={2}
            paddingBottom={2}
            borderRadius={10}
            onPress={() => {
              Alert.alert(
                "Note",
                "This feature is currently being developed. Thank you for your patience and understanding!",
                [{ text: "OK", style: "cancel" }]
              );
            }}
          >
            <View style={{ flexDirection: "row" }}>
              <AntDesign name="facebook-square" size={24} color="#FE724C" />
              <Text> Facebook</Text>
            </View>
          </Button>
          <Button
            width={"45%"}
            bg={"#F8F8F8"}
            borderWidth={1}
            borderColor={"#DDDDDD"}
            paddingTop={2}
            paddingBottom={2}
            borderRadius={10}
            onPress={() => {
              Alert.alert(
                "Note",
                "This feature is currently being developed. Thank you for your patience and understanding!",
                [{ text: "OK", style: "cancel" }]
              );
            }}
          >
            <View style={{ flexDirection: "row" }}>
              <AntDesign name="google" size={24} color="#FE724C" />
              <Text> Google</Text>
            </View>
          </Button>
        </View>
      </View>
      <LoadingModal visible={loading} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "white",
  },
});
