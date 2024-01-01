import React, { useState, useRef } from "react";
import { Button, HStack, Heading, Pressable, Spinner, Text, View } from "native-base";
import { Alert, Modal, StyleSheet, TouchableOpacity } from "react-native";
import { AuthStackParamList } from "@/Navigation/Auth";
import { RootStackParamList } from "@/Navigation";
import { RootScreens } from "..";
import { CompositeScreenProps } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { TextInput } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import axios from "axios";
import { useAppDispatch, useAppSelector } from "@/Hooks/redux";
import { LOGIN } from "@/Store/reducers";
import { LocalizationKey, i18n } from "@/Localization";
import LoadingModal from "@/Components/CustomModal/LoadingModal";

type AuthScreenNavigatorProps = NativeStackScreenProps<
  AuthStackParamList,
  "Login"
>;

type RootScreenNavigatorProps = NativeStackScreenProps<
  RootStackParamList,
  RootScreens.AUTH
>;

type LoginScreenProps = CompositeScreenProps<
  AuthScreenNavigatorProps,
  RootScreenNavigatorProps
>;

export const Login = ({ navigation }: LoginScreenProps) => {
  const dispatch = useAppDispatch();
  const [info, setInfo] = useState({
    email: "",
    password: "",
  });

  const [isShow, setIsShow] = useState(false);
  const [loading, setLoading] = useState(false);

  const animation = useRef(null);
  const handleChangeInfo = (name: string, value: string) => {
    setInfo({ ...info, [name]: value });
  };
  const handleClickShow = () => {
    setIsShow(!isShow);
  };

  const handleSubmit = async() => {
    await axios.post(`http://103.77.214.189:8000/v2/login/`, info)
    .then( (res) => {
      console.log(res.data);
      dispatch(LOGIN(res.data));
      navigation.navigate(RootScreens.MAIN);
    })
    .catch((error) => {
      if (error.response) {
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
        if(error.response.status == 400){
          alert("Enter a valid email address")
        }
        else{
          alert(error.response.data)
        }
      }
    })
    .finally(() => {
      setLoading(false);
    });
  }

  return (
    <View style={styles.container}>
      <View style={{
        margin: 20
      }}>

        <Text> Login screens</Text>
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
            navigation.navigate(RootScreens.MAIN)
          }}>
            <Text
              style={{
                color: "#FE724C",
                fontWeight: "bold",
              }}
            >
              Forgot password?
            </Text>
          </TouchableOpacity>
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
            <Text color="white">Login</Text>
          </TouchableOpacity>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Text>Don't have an account? </Text>
            <TouchableOpacity onPress={() => navigation.navigate("Signup")}>
              <Text
                style={{
                  color: "#FE724C",
                  fontWeight: "bold",
                }}
              >
                Sign Up
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
          Sign in with
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
      <LoadingModal visible={loading}/>
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
