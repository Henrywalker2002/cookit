import { Flex, Image, Text } from "native-base";
import { useState } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
const avt = require("../../assets/search/MaskGroup.png");
const tab = require("../../assets/search/tab.png");
import { Foundation } from "@expo/vector-icons";
interface ScreenTitleProp {
  title: string;
}
const ScreenTitle = (props: ScreenTitleProp) => {
  const [show, setShow] = useState(false);
  return (
    <>
      <Flex
        direction="row"
        alignItems={"center"}
        justify="space-between"
        padding={3}
      >
        <TouchableOpacity onPress={() => setShow(!show)}>
          <View
            style={{
              width: 35,
              height: 35,
              borderRadius: 10,
              borderColor: "#FE724C",
              borderWidth: 1,
              alignItems: "center",
              paddingTop: 7,
            }}
          >
            <Foundation name="align-left" size={20} color="#FE724C" />
          </View>
        </TouchableOpacity>
        <Text style={[styles.title]}>{props.title}</Text>
        <TouchableOpacity>
          <Image
            source={require("../../assets/avatar.png")}
            alt="image"
            style={{
              width: 35,
              height: 35,
              resizeMode: "cover",
            }}
          />
        </TouchableOpacity>
      </Flex>
    </>
  );
};

export default ScreenTitle;
const styles = StyleSheet.create({
  title: {
    fontSize: 22,
    fontWeight: "700",
    position: "relative",
    textAlign: "center",
  },
});
