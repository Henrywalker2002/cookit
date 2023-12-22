import React, { useEffect, useState } from "react";
import { Text, View, StyleSheet, Image, TouchableOpacity } from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import DishBox from "@/Components/DishBox";
import axios from "axios";
import {
  Flex,
  Input,
  FormControl,
  ScrollView,
  Modal,
  Center,
} from "native-base";
import { AntDesign } from "@expo/vector-icons";
import NavBar from "@/Components/NavBar";
import { launchCameraAsync } from "expo-image-picker";
import ScreenTitle from "@/Components/ScreenTitle";
const avt = require("../../../assets/search/MaskGroup.png");
const tab = require("../../../assets/search/tab.png");
const filter = require("../../../assets/search/filter.png");
const Search = () => {
  const [jwtToken, setJwtToken] = useState("");
  const [rcmDishLst, setRcmDishLst] = useState([]);
  useEffect(() => {
    login("user@example.com", "string").then((rs) => console.log("Logged in"));
  }, []);
  const login = async (username: string, password: string) => {
    let _resp;
    try {
      _resp = await axios.post(
        "http://103.77.214.189:8000/v2/login/",
        {
          email: username,
          password: password,
        },
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: false,
        }
      );
      console.log("Login success:\n");
      console.log(_resp.data);
      setJwtToken(_resp.data["access"]);
      console.log("access jwt: " + jwtToken);
    } catch (error) {
      console.log("Login fail:\n");
      if (error.response) {
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
      } else if (error.request) {
        console.log(error.request);
      } else {
        console.log("Error", error.message);
      }
    }

    //
  };
  const uploadImgToSearch = async (uri: string, fileName: string) => {
    try {
      const fData = new FormData();
      fData.append("image", {
        uri: uri,
        type: "image/png",
        name: "image.png",
      });
      let _resp = await axios.post(
        "http://103.77.214.189:8000/food/search-by-image/",
        fData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: "Bearer " + jwtToken,
          },
        }
      );
      console.log("Response data:\n");
      console.log(_resp.data);
      if (_resp.data["count"] >= 6)
        setRcmDishLst(_resp.data["results"].slice(0, 6));
      else setRcmDishLst(_resp.data["results"]);
    } catch (error) {
      if (error.response) {
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
      } else if (error.request) {
        console.log(error.request);
      } else {
        console.log("Error", error.message);
      }
    }
  };

  //modal
  const [modalVisible, setModalVisible] = useState(false);
  const [imageSrc, setImageSrc] = useState("");

  const takeShotByCamera = async () => {
    let photo = await launchCameraAsync({
      allowsEditing: true,
      quality: 1,
      base64: true,
    });
    if (!photo.canceled) {
      const { uri } = photo.assets[0];
      const fileName = uri.split("/").pop();
      console.log("filename:" + fileName);
      try {
        const uploadResp = await uploadImgToSearch(uri, fileName || "untitled");
      } catch (error) {}
      setImageSrc(photo.assets[0].uri);
      setModalVisible(true);
    } else {
      alert("You did not shot any image!");
    }
  };
  const showShutImage = () => {
    return (
      <Center>
        <Modal isOpen={modalVisible} onClose={() => setModalVisible(false)}>
          <Modal.Content>
            <Modal.CloseButton />
            <Modal.Header>
              <Text>Image shut by you:</Text>
            </Modal.Header>
            <Modal.Body>
              <Image
                source={{ uri: imageSrc }}
                style={{ width: 600, height: 600 }}
              />
            </Modal.Body>
          </Modal.Content>
        </Modal>
      </Center>
    );
  };
  const showDish = () => {
    if (rcmDishLst.length == 0) {
      const hold = [0, 0, 0, 0, 0, 0];
      return (
        <>
          <Flex
            direction="row"
            style={{ gap: 3 }}
            justify="center"
            wrap="wrap"
            alignContent={"space-around"}
          >
            {hold.map((ele) => (
              <DishBox />
            ))}
          </Flex>
        </>
      );
    } else
      return (
        <>
          <Flex
            direction="row"
            style={{ gap: 3 }}
            justify="center"
            wrap="wrap"
            alignContent={"space-around"}
          >
            {rcmDishLst.map((dish) => (
              <DishBox
                dishName={dish["name"]}
                duration={dish["time_taken"]}
                imgUri={dish["image"]}
              />
            ))}
          </Flex>
        </>
      );
  };
  return (
    <>
      {showShutImage()}

      <ScreenTitle title="Search" />
      <Flex direction="row" mb={2.5} mt={1.5} justify="space-around">
        <Flex
          direction="row"
          alignContent={"center"}
          alignItems={"center"}
          style={{ marginLeft: 20, gap: 5, margin: 5 }}
        >
          <TouchableOpacity onPress={() => alert("you press search btn")}>
            <AntDesign name="search1" size={24} color="black" />
          </TouchableOpacity>
          <FormControl width={"60%"}>
            <Input placeholder="Search recipes" height={8} />
          </FormControl>
          <TouchableOpacity
            onPress={() => {
              takeShotByCamera();
            }}
          >
            <FontAwesome name="camera" size={24} color="black" />
          </TouchableOpacity>
        </Flex>
        <View style={{ marginTop: 0 }}>
          <Image source={filter} />
        </View>
      </Flex>
      <Flex direction="row" justify="space-around" style={{ margin: 5 }}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => alert("You pressed All")}
        >
          <Text style={[styles.text, { color: "#FFFFFF" }]}>All</Text>
        </TouchableOpacity>
        {/* <TouchableOpacity
            style={styles.button}
            onPress={() => setModalVisible(true)}
          >
            <Text style={[styles.text, { color: "#FFFFFF" }]}>Shut image</Text>
          </TouchableOpacity> */}

        <TouchableOpacity
          style={styles.button}
          onPress={() => alert("You pressed Title")}
        >
          <Text style={styles.text}>Title</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => alert("You pressed Ingredient")}
        >
          <Text style={styles.text}>Ingredient</Text>
        </TouchableOpacity>
      </Flex>
      <ScrollView>{showDish()}</ScrollView>
    </>
  );
};
const styles = StyleSheet.create({
  screenContainer: {
    backgroundColor: "#ffffff",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    width: "100%",
  },
  container: {
    display: "flex",
    flexDirection: "row",
    gap: 80,
    marginLeft: 10,
    marginRight: 10,
    justifyContent: "center",
  },
  buttonContainer: {
    width: 320,
    height: 68,
    marginHorizontal: 20,
    alignItems: "center",
    justifyContent: "center",
    padding: 3,
  },
  button: {
    alignItems: "center",
    backgroundColor: "#FE724C",
    borderRadius: 32,
    display: "flex",
    gap: 10,
    position: "relative",
    padding: 15,
    paddingLeft: 24,
    paddingRight: 24,
  },
  text: {
    fontSize: 15,
    fontWeight: "700",
    position: "relative",
    textAlign: "center",
  },

  buttonIcon: {
    paddingRight: 8,
  },
  buttonLabel: {
    color: "#fff",
    fontSize: 16,
  },
});
export default Search;
