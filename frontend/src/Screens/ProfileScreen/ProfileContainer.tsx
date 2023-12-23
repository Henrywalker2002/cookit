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
  Modal,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";
import axios from "axios";
import { useFocusEffect } from "@react-navigation/native";
import { useAppSelector } from "@/Hooks/redux";

export const ProfileContainer = () => {

  const token = useAppSelector(state => state.user.token);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState({});
  const [gender, setGender] = useState(""); // State to store selected gender
  const [showForm, setShowForm] = useState(false);

  const displayForm = () => {
    setShowForm(true);
  };

  const closeForm = () => {
    setShowForm(false);
    fetchUser();
  };

  const handleGenderChange = (itemValue) => {
    setGender(itemValue);
  };
  const user_id = useAppSelector(state => state.user.user.id);
  const fetchUser = async () => {
    await axios
      .get(`http://103.77.214.189:8000/user/${user_id}/`, {
        headers: {
          accept: "application/json",
          Authorization: "Bearer " + token
          // "X-CSRFToken":
          //   "qVAqd295uZlJp78iO9UjT3HMaii3PCbVV3zGzi18qUnTfxYmCy4Wb2P480R0BU88",
          // Cookie:
          //   "sessionid=dinch9dn99dlcqrcm07qhyb30x0yqv6k; csrftoken=LUBSNIyPQDejOE1KUXDprA0GTcpAFM90",
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

  const handleSubmit = () => {};

  const handleChangeInfo = (name: string, value: string) => {
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
              padding: 25,
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
                borderRadius: 10,
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
                borderRadius: 10,
                color: "black",
              }}
              editable={false}
              value={user.email}
            />

            <Text> Gender </Text>

            <Text>Date of Birth</Text>

            <Text>Current TDEE</Text>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <TextInput
                style={{
                  width: "45%",
                  height: 50,
                  borderColor: "gray",
                  borderWidth: 1,
                  marginBottom: 20,
                  marginTop: 10,
                  paddingHorizontal: 10,
                  borderRadius: 10,
                  color: "black",
                }}
                editable={false}
                value={user.tdee.toString()}
              />

              <TouchableOpacity onPress={displayForm}>
                <Text>Update</Text>
              </TouchableOpacity>
            </View>
            <Modal
              visible={showForm}
              animationType="slide"
              transparent={true}
              onRequestClose={closeForm}
            >
              <View
                style={{
                  flex: 1,
                  width: "100%",
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundColor: "rgba(0, 0, 0, 0.5)",
                }}
              >
                <View
                  style={{
                    backgroundColor: "white",
                    paddingTop: 20,
                    paddingBottom: 20,
                    borderRadius: 10,
                    elevation: 6,
                  }}
                >
                  <View
                    style={{
                      alignItems: "center",
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 20,
                        fontWeight: "bold",
                      }}
                    >
                      {" "}
                      TDEE Calculator
                    </Text>
                  </View>

                  <View
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "space-around",
                      marginBottom: 10,
                    }}
                  >
                    <View
                      style={{
                        width: "35%",
                      }}
                    >
                      <Text> Weight(kg)</Text>
                      <TextInput
                        style={{
                          height: 50,
                          borderColor: "gray",
                          borderWidth: 1,
                          marginTop: 10,
                          paddingHorizontal: 10,
                          borderRadius: 10,
                        }}
                        onChangeText={(text) =>
                          handleChangeInfo("weight", text)
                        }
                        value={user.weight.toString()}
                      />
                    </View>

                    <View
                      style={{
                        width: "35%",
                      }}
                    >
                      <Text> Height(cm)</Text>
                      <TextInput
                        style={{
                          height: 50,
                          borderColor: "gray",
                          borderWidth: 1,
                          marginTop: 10,
                          paddingHorizontal: 10,
                          borderRadius: 10,
                        }}
                        onChangeText={(text) =>
                          handleChangeInfo("height", text)
                        }
                        value={user.height.toString()}
                      />
                    </View>
                  </View>

                  <View
                    style={{
                      alignItems: "center",
                      marginBottom: 10
                    }}
                  >
                    <Text style={{fontSize: 18}}>
                      {" "}
                      Current TDEE:{" "}
                      <Text
                        style={{
                          color: "#FE724C",
                          fontWeight: "bold",
                        }}
                      >
                        {user.tdee}
                      </Text> Calories per day
                    </Text>
                  </View>

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
                      title="Calculate"
                      onPress={closeForm}
                      color="#FE724C"
                    />

                    <Button
                      title="Save"
                      onPress={handleSubmit}
                      color="#FE724C"
                    />
                  </View>
                </View>
              </View>
            </Modal>
          </View>
        </View>
      )}
    </View>
  );
};
