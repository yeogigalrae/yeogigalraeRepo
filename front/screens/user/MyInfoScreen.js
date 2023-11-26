import { Alert, Image, View, Text } from 'react-native';
import MyInfoStyle from '../../styles/user/MyInfoStyle';
import MyInfoMenuLine from '../../components/user/MyInfoMenuLine';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import useUser from '../../components/user/UserState';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';

export default MyInfoScreen = (props) => {
    const navigation = useNavigation();
    const currentUser = useUser(state => state.user);
    const deleteUser = useUser(state => state.deleteUser);

    const logout = async () => {
        try {
            await GoogleSignin.signOut()
                .then(async function () {
                    const response = await axios({
                        method : "delete",
                        url : "http://10.20.60.16:3001/",
                        // url : "http://localhost:3001/",
                        headers : {
                            "Content-Type" : "application/json"
                        },
                        data : {
                            user : currentUser
                        },
                        responseType : "json",
                    })
                    console.log(response.data);
                    navigation.navigate("login");
                })
                deleteUser();
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <View
            style={MyInfoStyle.myInfo}
        >
            <View
                style={MyInfoStyle.profileBox}
            >
                <View
                    style={MyInfoStyle.profileLeft}
                >
                    <Image
                        style={MyInfoStyle.profileImage}
                        source={{uri : currentUser.photo}}
                    />
                </View>
                <View
                    style={MyInfoStyle.profileRight}
                >
                    <Text
                        style={MyInfoStyle.profileName}
                    >{currentUser.name}</Text>
                    <Text
                        style={MyInfoStyle.profileNickName}
                    >{currentUser.name}</Text>
                </View>
            </View>
            <View
                style={MyInfoStyle.myInfoMenuBox}
            >
                <MyInfoMenuLine
                    text={"계정"}
                    isTitle={true}
                />
                <MyInfoMenuLine
                    text={"닉네임 변경"}
                    screen={"nickname"}
                />
                <View style={MyInfoStyle.splitLine} />
                <MyInfoMenuLine
                    text={"프로필 사진 변경"}
                    screen={"profile"}
                />
            </View>
            <View
                style={MyInfoStyle.myInfoMenuBox}
            >
                <MyInfoMenuLine
                    text={"목록"}
                    isTitle={true}
                />
                <MyInfoMenuLine
                    text={"좋아요 행사 목록"}
                    screen={"likeList"}
                />
            </View>
            <View
                style={MyInfoStyle.myInfoMenuBox}
            >
                <MyInfoMenuLine
                    text={"설정"}
                    isTitle={true}
                />
                <MyInfoMenuLine
                    text={"알림 설정"}
                    screen={"notice"}
                />
            </View>
            <View
                style={MyInfoStyle.myInfoMenuBox}
            >
                <MyInfoMenuLine
                    text={"회원 탈퇴"}
                    style={[MyInfoStyle.menuTitle, { color: "red" }]}
                    onPress={() => Alert.alert(
                        '회원탈퇴',
                        '정말로 탈퇴하시겠습니까?',
                        [
                            {
                                text: '확인', onPress: () => { logout() }
                            },
                            { text: '취소', style: 'cancel' },
                        ],
                        {
                            cancelable: true,
                            onDismiss: () => console.log('취소'),
                        }
                    )}
                />
            </View>
        </View>
    );
}