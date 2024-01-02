import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
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
  Image,
  Text,
} from "native-base";
import { AntDesign } from "@expo/vector-icons";
import { launchCameraAsync } from "expo-image-picker";
import ScreenTitle from "@/Components/ScreenTitle";
import { useAppSelector } from "@/Hooks/redux";

const avt = require("../../../assets/search/MaskGroup.png");
const tab = require("../../../assets/search/tab.png");
const filter = require("../../../assets/search/filter.png");

interface SearchProps {
  navigation: any;
}
const Search: React.FC<SearchProps> = ({ navigation }) => {
  const [rcmDishLst, setRcmDishLst] = useState([]);
  const jwtToken = useAppSelector((state) => state.user.token);
  const recentFood = useAppSelector((state) => state.user.recendFood);
  const [isLoading, setIsLoading] = useState(false);
  const [showNoteModal, setShowNoteModal] = useState(false);
  const [noteHeader, setNoteHeader] = useState("");
  const [noteBody, setNoteBody] = useState("");
  const uploadImgToSearch = async (uri: string, fileName: string) => {
    try {
      const fData = new FormData();
      fData.append("image", {
        uri: uri,
        type: "image/png",
        name: "image.png",
      });
      setIsLoading(true);
      let _resp = await axios.post(
        "http://103.77.214.189:8000/food/search-by-image/",
        fData,
        {
          params: fData,
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
      else if (_resp.data["count"] != 0) setRcmDishLst(_resp.data["results"]);
      else {
        setSearchText("egg");
        searchByText();
      }
      setIsLoading(false);
      return 1;
    } catch (error: any) {
      if (error.response) {
        console.log("Got an resonse error");
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
        setNoteHeader("Error 😾");
        setNoteBody(error.response.data.message);
        setIsLoading(false);
        return -1;
      } else if (error.request) {
        console.log("Got an request error", error.request);
        setNoteHeader("Error 😾");
        setNoteBody(" Sorry! Something bad in air, please try again!");
        setIsLoading(false);
        return -1;
      } else {
        console.log("Got an strange error", error.message);
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
      console.log(fileName);
      let uploadResp = null;
      try {
        uploadResp = await uploadImgToSearch(uri, fileName || "untitled");
        return 1;
      } catch (error) {}
      setIsLoading(false);
      if (uploadResp == 1) {
        setImageSrc(photo.assets[0].uri);
        setModalVisible(true);
      } else {
        setShowNoteModal(true);
      }
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
              <Image source={{ uri: imageSrc }} size={"2xl"} alt="image" />
            </Modal.Body>
          </Modal.Content>
        </Modal>
      </Center>
    );
  };
  const showNoteByModal = () => {
    return (
      <Center>
        <Modal isOpen={showNoteModal} onClose={() => setShowNoteModal(false)}>
          <Modal.Content>
            <Modal.CloseButton />
            <Modal.Header>
              <Text fontWeight={500} letterSpacing={0.5} lineHeight={25}>
                {noteHeader}
              </Text>
            </Modal.Header>
            <Modal.Body>
              <Text>{noteBody}</Text>
            </Modal.Body>
          </Modal.Content>
        </Modal>
      </Center>
    );
  };
  const showDish = () => {
    if (rcmDishLst.length == 0) {
      return (
        <>
          <Flex
            direction="row"
            style={{ gap: 3 }}
            justify="center"
            wrap="wrap"
            alignContent={"space-around"}
          >
            {recentFood.map((item, index) => (
              <DishBox navigation={navigation} food={item} index={index} />
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
            {rcmDishLst.map((dish, index) => (
              <DishBox navigation={navigation} food={dish} index={index} />
            ))}
          </Flex>
        </>
      );
  };
  const [searchText, setSearchText] = useState("");
  const searchByText = async () => {
    setRcmDishLst([]);
    setIsLoading(true);
    try {
      let _resp = await axios.get(
        "http://103.77.214.189:8000/food/get_foods_by_user",
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + jwtToken,
          },
          params: {
            name: searchText,
          },
        }
      );
      console.log(_resp.data);
      if (_resp["data"]["recommended_foods"].length >= 6)
        setRcmDishLst(_resp["data"]["recommended_foods"].slice(0, 6));
      else setRcmDishLst(_resp["data"]["recommended_foods"]);
      setIsLoading(false);
    } catch (error: any) {
      if (error.response) {
        console.log("Got an resonse error");
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
        setNoteHeader("Error 😾");
        setNoteBody(
          "Sorry! Maybe some error in this way, please take a photo!"
        );
        setIsLoading(false);
        setShowNoteModal(true);
        return -1;
      } else if (error.request) {
        console.log("Got an request error", error.request);
        setNoteHeader("Error 😾");
        setNoteBody("Sorry! Something bad in air, please try again!");
        setIsLoading(false);
        setShowNoteModal(true);
        return -1;
      } else {
        setIsLoading(false);
        console.log("Got an strange error", error.message);
      }
    }
  };
  return (
    <View style={styles.screenContainer}>
      {showShutImage()}
      {showNoteByModal()}
      <ScreenTitle title="Search" navigation={navigation}/>
      <Flex direction="row" mb={2.5} mt={1.5} justify="space-around">
        <Flex
          direction="row"
          alignContent={"center"}
          alignItems={"center"}
          style={{ marginLeft: 20, gap: 5, margin: 5 }}
        >
          <TouchableOpacity onPress={searchByText}>
            <AntDesign name="search1" size={24} color="black" />
          </TouchableOpacity>
          <FormControl width={"60%"}>
            <Input
              placeholder="Search"
              height={8}
              onChange={(e: any) => setSearchText(e.target.value)}
            />
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
          <FontAwesome name="sliders" size={24} color="#FE724C" />
        </View>
      </Flex>
      <Flex direction="row" justify="space-around" style={{ margin: 5 }}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => alert("You pressed All")}
        >
          <Text style={[styles.text, { color: "#FFFFFF" }]}>All</Text>
        </TouchableOpacity>
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
      {isLoading && (
        <View style={[styles.container, styles.horizontal]}>
          <ActivityIndicator size="large" color="#FE724C" />
        </View>
      )}
      <ScrollView>{showDish()}</ScrollView>
    </View>
  );
};
const styles = StyleSheet.create({
  screenContainer: {
    marginTop: "12%",
    flex: 1,
    justifyContent: "center",
    backgroundColor: "white",
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
    height: 60,
    marginHorizontal: 20,
    alignItems: "center",
    justifyContent: "center",
    padding: 3,
  },
  button: {
    alignItems: "center",
    backgroundColor: "#FE724C",
    borderRadius: 30,
    display: "flex",
    gap: 8,
    position: "relative",
    padding: 5,
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
  horizontal: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 10,
  },
});
export default Search;
