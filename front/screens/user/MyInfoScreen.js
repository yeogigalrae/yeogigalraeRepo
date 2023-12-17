import { Alert, Image, View, Text } from 'react-native';
import MyInfoStyle from '../../styles/user/MyInfoStyle';
import MyInfoMenuLine from '../../components/user/MyInfoMenuLine';
// import { GoogleSignin } from '@react-native-google-signin/google-signin';
import useUser from '../../components/user/UserState';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import IPConfig from '../../configs/IPConfig.json';

export default MyInfoScreen = (props) => {
    const navigation = useNavigation();
    const currentUser = useUser(state => state.user);
    const deleteUser = useUser(state => state.deleteUser);

    // const logout = async () => {
    //     try {
    //         await GoogleSignin.signOut()
    //             .then(async function () {
    //                 const response = await axios({
    //                     method : "delete",
    //                     url : IPConfig.IP,
    //                     headers : {
    //                         "Content-Type" : "application/json"
    //                     },
    //                     data : {
    //                         user : currentUser
    //                     },
    //                     responseType : "json",
    //                 })
    //                 console.log(response.data);
    //                 deleteUser();
    //                 navigation.navigate("login");
    //             })
    //     } catch (error) {
    //         console.error(error);
    //     }
    // }

    const logout = () => {
        deleteUser();
        navigation.replace("login");
    }

    const userDelete = async () => {
        try {
            const response = await axios({
                method: "delete",
                url: IPConfig.IP+`users/${currentUser.user_id}`,
                headers: {
                    "Content-Type": "application/json"
                },
                data: {
                    user: currentUser
                },
                responseType: "json",
            })
            deleteUser();
            navigation.replace("login");
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
                        source={{ uri: currentUser.photo }}
                    />
                </View>
                <View
                    style={MyInfoStyle.profileRight}
                >
                    <Text
                        style={MyInfoStyle.profileName}
                    >{currentUser.name}</Text>
                    {currentUser.nickname ? (
                        <Text
                            style={MyInfoStyle.profileNickName}
                        >{currentUser.nickname}</Text>
                    ) : (
                        <Text
                            style={[
                                MyInfoStyle.profileNickName,
                                { color: "gray", fontSize: 16 }
                            ]}
                        >닉네임을 설정해주세요</Text>
                    )}
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
                    text={"회원정보 수정"}
                    screen={"userInfo"}
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
                    text={"로그아웃"}
                    style={[MyInfoStyle.menuTitle]}
                    onPress={() => Alert.alert(
                        '로그아웃',
                        '정말로 로그아웃하시겠습니까?',
                        [
                            { text: '확인', onPress: () => { logout() }},
                            { text: '취소', style: 'cancel' },
                        ],
                        {
                            cancelable: true,
                            onDismiss: () => console.log('취소'),
                        }
                    )}
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
                                text: '확인', onPress: () => { userDelete() }
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