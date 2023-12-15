import {
    TouchableWithoutFeedback, View,
    Text, SafeAreaView, TextInput,
    TouchableOpacity, Image, Keyboard,
    KeyboardAvoidingView, Alert
} from 'react-native';
import LoginStyle from '../../styles/user/LoginStyle';
import GoogleLoginComponent from '../../components/user/GoogleLoginComponent';
import NaverLoginComponent from '../../components/user/NaverLoginComponent';
import NaverLoginC from '../../components/user/NaverLoginC';
import { useState } from 'react';
import axios from 'axios';
import IPConfig from '../../configs/IPConfig.json';
import useUser from '../../components/user/UserState';
import { useNavigation } from '@react-navigation/native';

export default LoginScreen = (props) => {
    const [currentFocus, setFocus] = useState();
    const [id, setId] = useState();
    const [password, setPassword] = useState();
    const user = useUser((state) => state.user);
    const setUser = useUser((state) => state.setUser);
    const navigation = useNavigation();

    const login = async () => {
        try {
            const response = await axios({
                method: "get",
                url: IPConfig.IP + `users/login/${id}/${password}`,
                headers: { "Content-Type": "application/json" },
            })
            console.log("{LoginScreen} : login / response.data = ", response.data);
            if (response.data) {
                if (response.data != null && response.data.user.nickname != "" &&
                    response.data.user.address != "" && response.data.user.birth != null) {
                    setUser(response.data.user);
                    navigation.replace("loginSuccess");
                } else {
                    setUser(response.data.user);
                    navigation.replace("userInfo");
                }
            } else {
                Alert.alert("로그인 실패", "아이디 또는 비밀번호가 존재하지 않습니다.", [
                    {
                        text: "확인",
                    },
                ]);
                return;
            }
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <TouchableWithoutFeedback
            onPress={() => {
                Keyboard.dismiss();
            }}
        >
            <SafeAreaView
                style={LoginStyle.main}
            >
                <KeyboardAvoidingView
                    style={LoginStyle.container}
                    behavior={Platform.OS === 'ios' ? 'padding' : null}
                    keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0}
                >
                    <View
                        style={LoginStyle.topBox}
                    >
                        <Text
                            style={LoginStyle.title}
                        >로그인</Text>
                    </View>
                    <View
                        style={LoginStyle.appIconBox}
                    >
                        <Image
                            style={LoginStyle.appIcon}
                            source={require("../../assets/logo.png")}
                        >
                        </Image>
                    </View>
                    <View
                        style={LoginStyle.loginBox}
                    >
                        <TextInput
                            placeholder={currentFocus == "id" ? null : '아이디'}
                            onFocus={() => {
                                setFocus("id");
                            }}
                            style={LoginStyle.inputBox}
                            onBlur={() => setFocus()}
                            onChangeText={(value) => setId(value)}
                        />
                        {
                            currentFocus === "id" ? (
                                <Text
                                    style={LoginStyle.inputAfter}
                                >ID</Text>
                            ) : null
                        }
                        <TextInput
                            secureTextEntry={true}
                            style={LoginStyle.inputBox}
                            placeholder={currentFocus == "password" ? null : '비밀번호'}
                            onFocus={() => {
                                setFocus("password");
                            }}
                            onBlur={() => setFocus()}
                            onChangeText={(value) => setPassword(value)}
                        />
                        {
                            currentFocus === "password" ? (
                                <Text
                                    style={[LoginStyle.inputAfter, { top: 58 }]}
                                >PASS WORD</Text>
                            ) : null
                        }
                        <TouchableOpacity
                            style={LoginStyle.loginButton}
                            onPress={() => login()}
                        >
                            <Text
                                style={LoginStyle.loginButtonLabel}
                            >로그인</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={LoginStyle.signUpButton}
                            onPress={() => navigation.navigate("signUp")}
                        >
                            <Text
                                style={LoginStyle.signUpLabel}
                            >회원가입</Text>
                            <View style={LoginStyle.LabelUnder} />
                        </TouchableOpacity>
                    </View>
                </KeyboardAvoidingView>
                {/* <GoogleLoginComponent/> */}
                {/* <NaverLoginComponent/> */}
                {/* <NaverLoginC/> */}
            </SafeAreaView>
        </TouchableWithoutFeedback>
    );
}