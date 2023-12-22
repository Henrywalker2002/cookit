import { Flex, Image, Text } from "native-base";
import { StyleSheet, TouchableOpacity } from "react-native";
const avt = require("../../assets/search/MaskGroup.png");
const tab = require("../../assets/search/tab.png");
interface ScreenTitleProp {
  title: string;
}
const ScreenTitle = (props: ScreenTitleProp) => {
  return (
    <>
      <Flex direction="row" alignItems={"center"} justify="space-around">
        <TouchableOpacity onPress={() => alert("You pressed button")}>
          <Image source={tab} />
        </TouchableOpacity>
        <Text style={[styles.title]}>{props.title}</Text>
        <Image source={avt} />
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
