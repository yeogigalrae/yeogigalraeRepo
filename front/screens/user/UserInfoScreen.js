import { ActivityIndicator, View, Text, TouchableOpacity,
    Image, TextInput, TouchableWithoutFeedback,
    Keyboard, Alert } from 'react-native';
import Modal from 'react-native-modal';
import UserInfoStyle from '../../styles/user/UserInfoStyle';
import { useState } from 'react';
import * as ImagePicker from 'expo-image-picker';
import useUser from '../../components/user/UserState';
import IPConfig from "../../configs/IPConfig.json";
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import CustomDatePicker from '../../components/user/CustomDatePicker';
import CustomPostcode from '../../components/user/CustomPostcode';
import { initializeApp } from 'firebase/app';
import { firebaseConfig } from '../../configs/FirebaseConfig';
import { getStorage, ref, uploadBytes, getDownloadURL, uploadBytesResumable } from 'firebase/storage';
import appStyle from '../../configs/Style.json';

export default Init_UserInfoScreen = () => {
    const navigation = useNavigation();
    const app = initializeApp(firebaseConfig);
    const storage = getStorage(app);
    const currentUser = useUser(state => state.user);
    const setUser = useUser((state) => state.setUser);
    const [date, setDate] = useState(new Date());
    const [open, setOpen] = useState(false);
    const [image, setImage] = useState(currentUser.photo != null ? currentUser.photo : appStyle.APP_IMAGE);
    const [isImage, setIsImage] = useState(false);
    const [gender, setGender] = useState("남자");
    const [address, setAddress] = useState(currentUser.address != "" ? currentUser.address : "");
    const [checked, setChecked] = useState(0);
    const [nickname, setNickname] = useState(currentUser.nickname != "" ? currentUser.nickname : "");
    const [isModal, setModal] = useState(false);
    const [loding, setLoding] = useState(false);

    const regex = /^[가-힣a-zA-Z0-9]*$/;

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

    const onRegistration = async () => {
        // if (regex.test(nickname) && address != "") {
            try {
                let downloadURL = currentUser.photo;

                // 이미지가 새로 선택되었는지 확인
                if (image !== currentUser.photo) {
                    if(image != appStyle.APP_IMAGE){
                        const storageRef = ref(storage, `yeogigalrae/${new Date().getTime()}.jpg`);
                        const response = await fetch(image);
                        const blob = await response.blob();
                        setLoding(true);
                        await uploadBytesResumable(storageRef, blob);
                        downloadURL = await getDownloadURL(storageRef);
                        setLoding(false);
                    } else {
                        downloadURL = appStyle.APP_IMAGE;
                    }
                }

                const newUserInfo = {
                    ...currentUser,
                    photo: downloadURL,
                    gender: gender,
                    birth: `${date.getFullYear()}-${('0' + (date.getMonth() + 1)).slice(-2)}-${('0' + date.getDate()).slice(-2)}`,
                    address: address,
                    nickname: nickname
                }
                const response = await axios({
                    method: "put",
                    url: IPConfig.IP + `users/${currentUser.user_id}`,
                    headers: {
                        "Content-Type": "application/json"
                    },
                    data: {
                        user: newUserInfo
                    },
                    responseType: "json",
                })
                console.log("{UserInfoScreen} : onRegistration / response.data = ", response.data);
                // const imageData = response.data.user.photo.data;
                // const newPhoto = imageData.map(num => String.fromCharCode(num)).join('');
                // response.data.user.photo = imageData;
                setUser(response.data.user);
                return true;
            } catch (error) {
                console.log(error);
            }
        // } else {
        //     Alert.alert("닉네임 또는 주소를 다시입력해주세요.", "(닉네임 : 최대15글자 한글,숫자,영어)", [
        //         {
        //             text: "확인",
        //         },
        //     ]);
        //     return false;
        // }
    }

    const pickImage = async () => {
        if (!isImage) {
            setIsImage(true);
            let result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.All,
                allowsEditing: true, //이미지를 선택한 후 편집할 수 있는 UI를 표시할지 여부
                aspect: [4, 3], //allowsEditing을 true로 줄 경우 유지할 가로,세로 길이
                quality: 0, //압축 품질 0: 작은 크기 압축, 1: 최대 품질 압축
            });
            delete result.cancelled;
            if (!result.canceled) {
                setImage(result.assets[0].uri);
                setIsImage(false);
            }
            if (result.canceled) {
                setIsImage(false);
            }
        }
    };

    return (
        <TouchableWithoutFeedback
            style={{ borderWidth: 1 }}
            onPress={() => {
                Keyboard.dismiss();
            }}
        >
            <View style={UserInfoStyle.userInfo}>
                <View style={UserInfoStyle.container}>
                    <TouchableOpacity
                        style={UserInfoStyle.profileBox}
                        onPress={pickImage}
                    >
                        <Image
                            style={UserInfoStyle.imageBox}
                            source={{ uri: image }}
                        >
                        </Image>
                        <View
                            style={UserInfoStyle.miniImageView}
                        >
                            <Image
                                style={UserInfoStyle.miniImage}
                                source={require("../../assets/camera.png")}
                            />
                        </View>
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
                                value={nickname}
                                onChangeText={(value) => setNickname(value)}
                            />
                            <View
                                style={UserInfoStyle.InputBottom}
                            />
                        </View >
                    </View>
                    <View style={UserInfoStyle.outerBox}>
                        <Text
                            style={UserInfoStyle.label}
                        >주소 변경</Text>
                        <TouchableOpacity
                            style={UserInfoStyle.modify}
                            onPress={() => { setModal(true) }}
                        >
                            <View
                                style={UserInfoStyle.Input}
                            >
                                <CustomPostcode
                                    isModal={isModal}
                                    setModal={setModal}
                                    setAddress={setAddress}
                                />
                                <Text
                                    style={[
                                        UserInfoStyle.addressInput,
                                        address ? { color: "black" } : { color: "lightgray" }
                                    ]}
                                >{address ? address : "주소를 설정 해주세요."}</Text>
                            </View>
                            <View style={UserInfoStyle.InputBottom} />
                        </TouchableOpacity>
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
                                <CustomDatePicker
                                    open={open}
                                    setDate={setDate}
                                    setOpen={setOpen}
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
                            onPress={async () => {
                                const state = navigation.getState().routes;
                                const registration = await onRegistration()
                                if (registration) {
                                    if (state[0].name != "myInfo") {
                                        navigation.replace("loginSuccess");
                                    } else {
                                        navigation.navigate(state[0].name);
                                    }
                                }
                            }}
                        >
                            <Text
                                style={UserInfoStyle.label}
                            >등록</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                {
                    loding ? (
                        <Modal
                            isVisible={true}
                        >
                            <ActivityIndicator
                                size="large"
                                color={appStyle.APP_MAIN_COLOR}
                                animating={true}
                            />
                        </Modal>
                    ) : null
                }
            </View>
        </TouchableWithoutFeedback>
    )
}