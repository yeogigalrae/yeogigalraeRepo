import { View, Text, TouchableOpacity, Image, TextInput } from 'react-native';
import UserInfoStyle from '../../styles/user/UserInfoStyle';
import { useState, useEffect } from 'react';
import DatePicker from 'react-native-date-picker';
import * as ImagePicker from 'expo-image-picker';
import useUser from '../../components/user/UserState';
import IPConfig from "../../configs/IPConfig.json";
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';

export default UserInfoScreen = () => {
    const navigation = useNavigation();
    const currentUser = useUser(state => state.user);
    const setUser = useUser((state) => state.setUser);
    const [date, setDate] = useState(new Date());
    const [open, setOpen] = useState(false);
    const [image, setImage] = useState(null);
    const [gender, setGender] = useState("남성");
    const [address, setAddress] = useState(null);
    const [checked, setChecked] = useState(0);
    const [nickname, setNickname] = useState(currentUser.nickname);

    useEffect(() => {
        navigation.setOptions({
          tabBarVisible: false,
        });
      }, [navigation]);

    const Radio = () => {
        var gender = ['남자', '여자'];

        return (
            <View style={UserInfoStyle.radioViewOuter}>
                {gender.map((gender, key) => {
                    return (
                        <View key={gender} style={UserInfoStyle.radioViewInner}>
                            <TouchableOpacity
                                style={UserInfoStyle.radioButton}
                                onPress={() => {
                                    setChecked(key);
                                    if (key == 0) {
                                        setGender("남자");
                                    } else {
                                        setGender("여자");
                                    }
                                }}
                            >
                                <View style={UserInfoStyle.radioOuter}>
                                    {checked == key && <View style={UserInfoStyle.radioInner} />}
                                </View>
                                <Text style={UserInfoStyle.radioLabel}>{gender}</Text>
                            </TouchableOpacity>
                        </View>
                    );
                })}
            </View>
        );
    };

    useEffect(() => {
        if (currentUser.birth != "") {
            // console.log(currentUser);
            navigation.navigate("loginSuccess");
        }
    }, [currentUser]);

    const onRegistration = async () => {
        const newUserInfo = {
            ...currentUser,
            // photo: image,
            gender: gender,
            birth: `${date.getFullYear()}-${('0' + (date.getMonth() + 1)).slice(-2)}-${('0' + date.getDate()).slice(-2)}`,
            address: address,
            nickname: nickname
        }
        try {
            const response = await axios({
                method: "post",
                url: IPConfig.IP,
                headers: {
                    "Content-Type": "application/json"
                },
                data: {
                    user: newUserInfo
                },
                responseType: "json",
            })
            setUser(response.data);
            return response.data;
        } catch (error) {
            console.log(error);
        }
    }

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true, //이미지를 선택한 후 편집할 수 있는 UI를 표시할지 여부
            aspect: [4, 3], //allowsEditing을 true로 줄 경우 유지할 가로,세로 길이
            quality: 1, //압축 품질 0: 작은 크기 압축, 1: 최대 품질 압축
        });
        delete result.cancelled;
        if (!result.canceled) {
            setImage(result.assets[0].uri);
        }
    };

    const onAddress = async () => {
        console.log("주소 일단 패스");
        // try {
        //     const response = await axios({
        //         method: "get",
        //     //     url: `https://business.juso.go.kr/addrlink/addrMobileLinkUrl.do?confmKey=
        //     // devU01TX0FVVEgyMDIzMTEyNzE2MDcxNDExNDMwODc=&returnUrl=http://10.20.61.80:3001/address`,
        //         url: `http://10.20.61.80:3001/sample`,
        //         headers: {
        //             "Content-Type": "application/json"
        //         },
        //         responseType: "json",
        //     })
        //     return response.data;
        // } catch (error) {
        //     console.log(error);
        // }
    }

    return (
        <View style={UserInfoStyle.userInfo}>
            <View style={UserInfoStyle.container}>
                <TouchableOpacity
                    style={UserInfoStyle.profileBox}
                    onPress={pickImage}
                >
                    <Image
                        style={UserInfoStyle.imageBox}
                        source={{ uri: currentUser.photo }}
                    >
                    </Image>
                    <Image
                        style={UserInfoStyle.miniImage}
                        source={require("../../assets/home.png")}
                    />
                    <Text style={UserInfoStyle.profileLabel}>
                        프로필 등록
                    </Text>
                </TouchableOpacity>
                <View style={UserInfoStyle.outerBox}>
                    <Text
                        style={UserInfoStyle.label}
                    >닉네임 변경</Text>
                    <View
                        style={UserInfoStyle.modify}
                    >
                        <TextInput
                            style={UserInfoStyle.Input}
                            placeholder='닉네임을 입력 해주세요.'
                            maxLength={20}
                            onChangeText={(value) => setNickname(value)}
                            value={currentUser.nickname}
                        />
                        <View
                            style={UserInfoStyle.InputBottom}
                        />
                    </View>
                </View>
                <View style={UserInfoStyle.outerBox}>
                    <Text
                        style={UserInfoStyle.label}
                    >주소 변경</Text>
                    <View
                        style={UserInfoStyle.modify}
                    >
                        <TouchableOpacity
                            style={UserInfoStyle.Input}
                            onPress={onAddress}
                        >
                            <Text
                                style={UserInfoStyle.addressInput}
                            >주소를 설정 해주세요.</Text>
                        </TouchableOpacity>
                        <View style={UserInfoStyle.InputBottom} />
                    </View>
                </View>
                <View style={UserInfoStyle.outerBox}>
                    <Text
                        style={UserInfoStyle.label}
                    >성별 입력</Text>
                    <View
                        style={UserInfoStyle.modify}
                    >
                        <Radio />
                    </View>
                </View>
                <View style={UserInfoStyle.outerBox}>
                    <Text
                        style={UserInfoStyle.label}
                    >생년 월일</Text>
                    <View
                        style={UserInfoStyle.modify}
                    >
                        <TouchableOpacity
                            style={UserInfoStyle.dateTimePickerButton}
                            onPress={() => setOpen(true)}
                        >
                            <DatePicker
                                modal
                                open={open}
                                title={"생년월일"}
                                date={date}
                                mode='date'
                                confirmText="확인"
                                cancelText="취소"
                                onConfirm={(date) => {
                                    setOpen(false)
                                    setDate(date)
                                }}
                                onCancel={() => {
                                    setOpen(false)
                                }}
                            />
                            <View
                                style={[
                                    UserInfoStyle.dateTimePickerBox,
                                    { flex: 2.5 }
                                ]}
                            >
                                <Text
                                    style={UserInfoStyle.dateText}
                                >{date.getFullYear()}</Text>
                                <Text style={UserInfoStyle.dateLabel}>년</Text>
                            </View>
                            <View
                                style={[
                                    UserInfoStyle.dateTimePickerBox,
                                    { flex: 2 }
                                ]}
                            >
                                <Text
                                    style={UserInfoStyle.dateText}
                                >{('0' + (date.getMonth() + 1)).slice(-2)}</Text>
                                <Text style={UserInfoStyle.dateLabel}>월</Text>
                            </View>
                            <View
                                style={[
                                    UserInfoStyle.dateTimePickerBox,
                                    { flex: 3 }
                                ]}
                            >
                                <Text
                                    style={UserInfoStyle.dateText}
                                >{date.getDate()}</Text>
                                <Text style={UserInfoStyle.dateLabel}>일</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity
                        style={UserInfoStyle.submit}
                        onPress={onRegistration}
                    >
                        <Text
                            style={UserInfoStyle.label}
                        >등록</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )

}