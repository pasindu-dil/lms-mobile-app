import { commonStyles } from "@/styles/common/common.styles";
import { View, Text, TouchableOpacity, Dimensions } from "react-native";

const Button = ({ title, onPress }: { title: string; onPress: () => void }) => {
    const { width } = Dimensions.get("window");
  return (
    <TouchableOpacity
      style={[
        commonStyles.buttonContainer,
        {
          width: width * 1 - 150,
          height: 40,
          alignItems: "center",
          flexDirection: "row",
          justifyContent: "center",
        },
      ]}
      onPress={() => onPress()}
    >
      <Text style={{ color: "#fff", fontSize: 18, fontWeight: "700" }}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default Button;
