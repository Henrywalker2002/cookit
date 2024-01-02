import { useAppDispatch, useAppSelector } from "@/Hooks/redux";
import React from "react";
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TouchableWithoutFeedback,
  Image,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { LOGOUT } from "@/Store/reducers";
export const Sidebar = ({ visible, onClose, navigation }) => {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user.user);
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <TouchableWithoutFeedback onPress={onClose}>
        <View
          style={{
            // display: "flex",
            // flexDirection: "row",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
          }}
        >
          <View
            style={{
              backgroundColor: "#fff",
              width: "45%",
              height: "100%",
              padding: 15,
            }}
          >
            <View
              style={{
                width: 70,
                height: 70,
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
                  fontSize: 20,
                }}
              >
                {user.fullName}
              </Text>
              <Text
                style={{
                  color: "#9EA1B1",
                  fontSize: 14,
                }}
              >
                {user.email}
              </Text>
            </View>
            <View>
              <TouchableOpacity
                onPress={() => {
                  Alert.alert(
                    "Note",
                    "This feature is currently being developed. Thank you for your patience and understanding!",
                    [{ text: "OK", style: "cancel" }]
                  );
                }}
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "flex-start",
                  padding: 10,
                  alignItems: "center",
                  gap: 10,
                }}
              >
                <Ionicons name="mail" size={24} color="black" />
                <Text>Contact Us</Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => {
                  Alert.alert(
                    "Note",
                    "This feature is currently being developed. Thank you for your patience and understanding!",
                    [{ text: "OK", style: "cancel" }]
                  );
                }}
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "flex-start",
                  padding: 10,
                  alignItems: "center",
                  gap: 10,
                }}
              >
                <Ionicons name="md-settings-sharp" size={24} color="black" />
                <Text>Settings</Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => {
                  Alert.alert(
                    "Note",
                    "This feature is currently being developed. Thank you for your patience and understanding!",
                    [{ text: "OK", style: "cancel" }]
                  );
                }}
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "flex-start",
                  padding: 10,
                  alignItems: "center",
                  gap: 20,
                }}
              >
                <FontAwesome name="question" size={24} color="black" />
                <Text>Helps & FAQs</Text>
              </TouchableOpacity>
            </View>

            <View>
              <TouchableOpacity
                onPress={() => {
                  dispatch(LOGOUT({}));
                  navigation.navigate("Login");
                }}
                style={{
                  backgroundColor: "#FE724C",
                  borderRadius: 15,
                  margin: 15,
                  padding: 5,
                  gap: 3,
                  alignItems: "center",
                }}
              >
                <View
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "flex-start",
                  }}
                >
                  <FontAwesome name="sign-out" size={24} color="black" />
                  <Text>Log Out</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};
