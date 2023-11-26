import { Alert, Image, View, Text } from 'react-native';
import MyInfoStyle from '../../styles/user/MyInfoStyle';
import MyInfoMenuLine from '../../components/user/MyInfoMenuLine';

export default MyInfoScreen = (props) => {
    
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
                        source={require("../../assets/heart.png")}
                    />
                </View>
                <View
                    style={MyInfoStyle.profileRight}
                >
                    <Text
                        style={MyInfoStyle.profileName}
                    >이름</Text>
                    <Text
                        style={MyInfoStyle.profileNickName}
                    >닉네임</Text>
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
                            { text: '확인', onPress: () => console.log('확인') },
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