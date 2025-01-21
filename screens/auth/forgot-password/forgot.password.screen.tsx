import { View, Text, StyleSheet, TextInput, TouchableOpacity } from "react-native";
import {
  useFonts,
  Nunito_600SemiBold,
  Nunito_700Bold,
  Nunito_400Regular,
} from "@expo-google-fonts/nunito";
import { router } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";

const ForgotPasswordScreen = () => {
  let [fontsLoaded, fortError] = useFonts({
    Nunito_600SemiBold,
    Nunito_700Bold,
    Nunito_400Regular,
  });

  if (!fontsLoaded && !fortError) {
    return null;
  }

  return (
    <LinearGradient colors={["#E5ECF9", "#F6F7F9"]} style={styles.container}>
      <Text style={[styles.headerText, { fontFamily: "Nunito_700Bold" }]}>
        Reset Email Password
      </Text>
      <TextInput
        style={[styles.input, { fontFamily: "Nunito_400Regular" }]}
        placeholder="example@gmail.com"
        placeholderTextColor={"#A1A1A1"}
        keyboardType="email-address"
      />
      <TouchableOpacity style={styles.button}>
        <Text style={[styles.buttonText]}>
          Send
        </Text>
      </TouchableOpacity>
      <View style={styles.loginLink}>
        <Text style={[styles.backText, { fontFamily: "Nunito_400Regular" }]}>Back To?</Text>
        <TouchableOpacity onPress={() => router.back()} >
          <Text style={[styles.loginText, {fontFamily: "Nunito_400Regular"}]}>
            Sign In
          </Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
};

export default ForgotPasswordScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  headerText: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 10,
  },
  input: {
    flexDirection: "row",
    marginHorizontal: 16,
    height: 55,
    borderRadius: 8,
    paddingLeft: 35,
    fontSize: 16,
    backgroundColor: "white",
    width: "80%",
  },
  button: {
    padding: 15,
    borderRadius: 8,
    marginHorizontal: 16,
    backgroundColor: "#2467EC",
    marginTop: 20,
    width: "80%",
  },
  buttonText: {
    color: "white",
    textAlign: "center",
    fontSize: 16,
    fontFamily: "Nunito_600SemiBold"
  },
  loginLink: {
    flexDirection: "row",
    marginTop: 20
  },
  backText: {
    fontSize: 16
  },
  loginText: {
    color: "#3476EE",
    marginLeft: 5,
    fontSize: 16
  }
});
