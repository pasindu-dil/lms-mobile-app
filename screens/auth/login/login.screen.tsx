import {
  ActivityIndicator,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import {
  Entypo,
  FontAwesome,
  Fontisto,
  Ionicons,
  SimpleLineIcons,
} from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import {
  useFonts,
  Raleway_700Bold,
  Raleway_600SemiBold,
} from "@expo-google-fonts/raleway";
import {
  Nunito_400Regular,
  Nunito_500Medium,
  Nunito_700Bold,
  Nunito_600SemiBold,
} from "@expo-google-fonts/nunito";
import { useState } from "react";
import { commonStyles } from "@/styles/common/common.styles";
import { router } from "expo-router";
import axios from "axios";
import { SERVER_URI } from "@/utils/uri";
import { Toast } from "react-native-toast-notifications";

export default function LoginScreen() {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [buttonSpinner, setButtonSpinner] = useState(false);
  const [userInfo, setUserInfo] = useState({
    email: "",
    password: "",
  });
  const [required, setRequired] = useState(false);
  const [error, setError] = useState({
    password: "",
  });
  const [googleUrl, setGoogleUrl] = useState("");

  let [fontsLoaded, fortError] = useFonts({
    Raleway_700Bold,
    Nunito_400Regular,
    Nunito_500Medium,
    Nunito_600SemiBold,
    Nunito_700Bold,
  })

  if (!fontsLoaded && !fortError) {
    return null;
  }

  const handlePasswordValidation = (value: string) => {
    const password = value;
    const passwordSpecialCharacters = /(?=.*[!@#$&*])/;
    const passwordNumber = /(?=.*[0-9])/;
    const passwordSixValues = /(?=.{6,})/;

    if (!passwordSpecialCharacters.test(password)) {
      setError({
        ...error,
        password: "Write at least one special character!",
      });
      setUserInfo({
        ...userInfo,
        password: "",
      });
    } else if (!passwordNumber.test(password)) {
      setError({
        ...error,
        password: "Write at least one number!",
      });
      setUserInfo({
        ...userInfo,
        password: "",
      });
    } else if (!passwordSixValues.test(password)) {
      setError({
        ...error,
        password: "Password must be at least 6 characters long!",
      });
      setUserInfo({
        ...userInfo,
        password: "",
      });
    } else {
      setError({
        ...error,
        password: "",
      });
      setUserInfo({
        ...userInfo,
        password: value,
      });
    }
  };

  const handleSignIn = async () => {
    if (!error.password) {
      await axios.post(`${SERVER_URI}/api/v1/auth/login`, {
        email: userInfo.email,
        password: userInfo.password
      }).then((res) => {
        console.log(res.data);
      }).catch((err) => {
        Toast.show(err.response.data.message, { type: "danger" });
        console.log(err.response.data.message);
      })
    }
  };

  const handleGoogleSignIn = async () => {
    await axios.post(`${SERVER_URI}/api/v1/auth/get-google-url`, {}).then((res) => {
      setGoogleUrl(res.data);
    })

    router.push(googleUrl);
    
    // await axios.get(googleUrl).then((res) => {
    //   console.log(res.data);
    // }).catch((err) => {
    //   console.log(err.response.data.message);
    // })
  }

  return (
    <LinearGradient
      colors={["#E5ECF9", "#F6F7F9"]}
      style={{ flex: 1, paddingTop: 20 }}
    >
      <ScrollView>
        <Image
          style={styles.signInImage}
          source={require("@/assets/images/sign-in/sign-in.webp")}
        />
        <Text style={[styles.welcomeText, { fontFamily: "Raleway_700Bold" }]}>
          Welcome Back!
        </Text>
        <Text style={styles.learningText}>
          Login to your existing account of Becodemy!
        </Text>
        <View style={styles.inputContainer}>
          <View>
            <TextInput
              style={[commonStyles.inputType, { paddingLeft: 40 }]}
              keyboardType="email-address"
              value={userInfo.email}
              placeholder="example@gmail.com"
              placeholderTextColor={"#A1A1A1"}
              onChangeText={(value) =>
                setUserInfo({ ...userInfo, email: value })
              }
            />
            <Fontisto
              style={{ position: "absolute", left: 26, top: 17.8 }}
              name="email"
              size={20}
              color={"#A1A1A1"}
            />
            {required && (
              <View style={commonStyles.errorContainer}>
                <Entypo name="cross" size={18} color={"red"} />
              </View>
            )}
            <View style={{ marginTop: 15 }}>
              <TextInput
                style={[commonStyles.inputType, { paddingLeft: 40 }]}
                keyboardType="default"
                secureTextEntry={!isPasswordVisible}
                defaultValue=""
                placeholder="********"
                placeholderTextColor={"#A1A1A1"}
                onChangeText={handlePasswordValidation}
              />
              <TouchableOpacity
                style={styles.visibleIcon}
                onPress={() => setIsPasswordVisible(!isPasswordVisible)}
              >
                <View style={{ padding: 5 }}>
                  {isPasswordVisible ? (
                    <Ionicons
                      name="eye-off-outline"
                      size={20}
                      color={"#747474"}
                    />
                  ) : (
                    <Ionicons name="eye-outline" size={20} color={"#747474"} />
                  )}
                </View>
              </TouchableOpacity>
              <SimpleLineIcons
                style={{ position: "absolute", left: 26, top: 17.8 }}
                name="lock"
                size={20}
                color={"#A1A1A1"}
              />
            </View>
            {error.password && (
              <View style={[commonStyles.errorContainer, { top: 145 }]}>
                <Entypo name="cross" size={18} color={"red"} />
                <Text style={{ color: "red", fontSize: 11, marginTop: -1 }}>
                  {error.password}
                </Text>
              </View>
            )}
          </View>
          <TouchableOpacity onPress={() => router.push("forgot-password")}>
            <Text
              style={[
                styles.forgotSection,
                { fontFamily: "Nunito_600SemiBold" },
              ]}
            >
              Forgot Password?
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              padding: 16,
              borderRadius: 8,
              marginHorizontal: 16,
              backgroundColor: "#2467EC",
            }}
            onPress={handleSignIn}
          >
            {buttonSpinner ? (
              <ActivityIndicator size={"small"} color={"white"} />
            ) : (
              <Text
                style={{
                  color: "white",
                  textAlign: "center",
                  fontSize: 16,
                  fontFamily: "Raleway_700Bold",
                }}
              >
                Sign In
              </Text>
            )}
          </TouchableOpacity>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              gap: 10,
            }}
          >
            <TouchableOpacity onPress={handleGoogleSignIn}>
              <FontAwesome name="google" size={24} />
            </TouchableOpacity>
            <TouchableOpacity>
              <FontAwesome name="github" size={24} />
            </TouchableOpacity>
          </View>
          <View style={styles.signUpRedirect}>
            <Text style={{ fontSize: 18, fontFamily: "Raleway_600SemiBold" }}>
              Don't have an account?
            </Text>
            <TouchableOpacity onPress={() => router.push("sign-up")}>
              <Text
                style={{
                  fontSize: 18,
                  color: "#2467EC",
                  fontFamily: "Raleway_600SemiBold",
                  marginLeft: 5,
                }}
              >
                Sign Up
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  signInImage: {
    width: "60%",
    height: 250,
    alignSelf: "center",
    marginTop: 50,
  },
  welcomeText: {
    textAlign: "center",
    fontSize: 24,
  },
  learningText: {
    textAlign: "center",
    color: "#575757",
    fontSize: 15,
    marginTop: 6,
  },
  inputContainer: {
    marginHorizontal: 16,
    marginTop: 30,
    rowGap: 30,
  },
  visibleIcon: {
    position: "absolute",
    right: 30,
    top: 15,
  },
  visibleIcon2: {
    position: "absolute",
    right: 24,
    top: 17.8,
    marginTop: -5,
  },
  forgotSection: {
    marginHorizontal: 16,
    textAlign: "right",
    fontSize: 16,
    marginTop: -20,
  },
  signUpRedirect: {
    flexDirection: "row",
    marginHorizontal: 16,
    justifyContent: "center",
    marginBottom: 20,
  },
});
