import {
    TouchableWithoutFeedback, View,
    Text, SafeAreaView, TextInput,
    TouchableOpacity, Keyboard, Image,
    KeyboardAvoidingView
} from 'react-native';
import SignUpStyle from '../../styles/user/SignUpStyle';
import { useState } from 'react';
import axios from 'axios';
import IPConfig from '../../configs/IPConfig.json';
import { useNavigation } from '@react-navigation/native';

export default SignUpScreen = () => {
    const [currentFocus, setFocus] = useState();
    const [id, setId] = useState();
    const [idCheck, setIdCheck] = useState(false);
    const [idRetry, setIdRetry] = useState(false);
    const [password, setPassword] = useState();
    const [passwordCheck, setPasswordCheck] = useState();
    const [passwordRetry, setPasswordRetry] = useState(false);
    const [name, setName] = useState();
    const [nameRetry, setNameRetry] = useState(false);
    const [email, setEmail] = useState();
    const [emailRetry, setEmailRetry] = useState(false);
    const navigation = useNavigation();

    const idRegex = /^[a-zA-Z0-9]{1,16}$/;
    const passwordRegex = /^[a-zA-Z0-9!@#$%^&*]{12,}$/;
    const nameRegex = /^[ㄱ-힣a-zA-Z]*$/;
    const emailRegex = /^[\w.%+-]+@[\w.-]+\.[a-zA-Z]{2,}$/;

    const signUp = async () => {
        // if (password == passwordCheck && passwordRegex.test(password)) {
        //     return setPasswordRetry(true)
        // }
        if (!idCheck) {
            alert("아이디 확인을 하고 진행해주세요.");
            return setIdRetry(true);
        }
        if (!nameRegex.test(name)) { return setNameRetry(true) }
        if (!emailRegex.test(email)) { return setEmailRetry(true) }
        const user = {
            id: id,
            password: password,
            name: name,
            email: email
        }
        try {
            const response = await axios({
                method: "post",
                url: IPConfig.IP + `users/signup`,
                headers: { "Content-Type": "application/json" },
                data: {
                    user: user
                }
            })
            console.log("{SignUpScreen} : signUp / response.data = ", response.data);
            if (response.data) {
                navigation.navigate("login");
            }
        } catch (error) {
            console.log(error);
        }
    }

    const idChecking = async () => {
        if (idRegex.test(id)) {
            try {
                const response = await axios({
                    method: "get",
                    url: IPConfig.IP + `users/signup/idcheck/${id}`,
                    headers: { "Content-Type": "application/json" },
                })
                console.log("{SignUpScreen} : idChecking / response.data = ", response.data);
                if (response.data) {
                    setIdCheck(true);
                    setIdRetry(false);
                } else {
                    setIdRetry(true);
                }
            } catch (error) {
                console.log(error);
            }
        } else {
            return setIdRetry(true)
        }
    }

    return (
        <TouchableWithoutFeedback
            style={{borderWidth: 1}}
            onPress={() => {
                Keyboard.dismiss();
            }}
        >
            <SafeAreaView
                style={SignUpStyle.main}
            >
                <KeyboardAvoidingView
                    style={SignUpStyle.container}
                    behavior={Platform.OS === 'ios' ? 'padding' : null}
                    keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0}
                >
                    <View
                        style={SignUpStyle.topBox}
                    >
                        <Text
                            style={SignUpStyle.title}
                        >회원가입</Text>
                    </View>
                    <View
                        style={SignUpStyle.signUpBox}
                    >
                        <View
                            style={idRetry ? [
                                SignUpStyle.inputBox,
                                SignUpStyle.retry,
                                { flexDirection: "row", justifyContent: "space-between" }
                            ] : [
                                SignUpStyle.inputBox,
                                { flexDirection: "row", justifyContent: "space-between" }
                            ]}
                        >
                            <TextInput
                                placeholder={currentFocus == "id" ? null : '아이디'}
                                onFocus={() => {
                                    setFocus("id");
                                    setIdRetry(false);
                                }}
                                style={{ flex: 1 , fontSize: 20}}
                                onBlur={() => setFocus()}
                                onChangeText={(value) => {
                                    setId(value)
                                    setIdCheck(false);
                                }}
                            />
                            {idCheck ? (
                                <View
                                    style={SignUpStyle.idCheckButton}
                                >
                                    <Image
                                        style={SignUpStyle.checkIcon}
                                        source={require('../../assets/check.png')}
                                    />
                                </View>
                            ) : (
                                <TouchableOpacity
                                    style={SignUpStyle.idCheckButton}
                                    onPress={() => idChecking()}
                                >
                                    <Text>아이디 확인</Text>
                                </TouchableOpacity>
                            )}
                        </View>
                        <TextInput
                            secureTextEntry={true}
                            style={passwordRetry ? [SignUpStyle.inputBox, SignUpStyle.retry] : SignUpStyle.inputBox}
                            placeholder={currentFocus == "password" ? null : '비밀번호'}
                            onFocus={() => {
                                setFocus("password");
                                setPasswordRetry(false);
                            }}
                            onBlur={() => setFocus()}
                            onChangeText={(value) => setPassword(value)}
                        />
                        <TextInput
                            style={passwordRetry ? [SignUpStyle.inputBox, SignUpStyle.retry] : SignUpStyle.inputBox}
                            secureTextEntry={true}
                            placeholder={currentFocus == "passwordCheck" ? null : '비밀번호 확인'}
                            onFocus={() => {
                                setFocus("passwordCheck");
                                setPasswordRetry(false);
                            }}
                            onBlur={() => setFocus()}
                            onChangeText={(value) => setPasswordCheck(value)}
                        />
                        <TextInput
                            style={nameRetry ?
                                [SignUpStyle.inputBox, SignUpStyle.retry] :
                                SignUpStyle.inputBox}
                            placeholder={currentFocus == "name" ? null : '이름'}
                            onFocus={() => {
                                setFocus("name");
                                setNameRetry(false);
                            }}
                            onBlur={() => setFocus()}
                            onChangeText={(value) => setName(value)}
                        />
                        <TextInput
                            style={emailRetry ?
                                [SignUpStyle.inputBox, SignUpStyle.retry] :
                                SignUpStyle.inputBox}
                            placeholder={currentFocus == "email" ? null : '이메일'}
                            onFocus={() => {
                                setFocus("email");
                                setEmailRetry(false);
                            }}
                            onBlur={() => setFocus()}
                            onChangeText={(value) => setEmail(value)}
                        />
                        <TouchableOpacity
                            style={SignUpStyle.signUpButton}
                            onPress={() => signUp()}
                        >
                            <Text
                                style={SignUpStyle.signUpButtonLabel}
                            >회원가입</Text>
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