import { TouchableOpacity, View, Text, TextInput } from 'react-native';
import useUser from '../../components/user/UserState';
import NicknameStyle from '../../styles/user/NicknameStyle';
import { useState } from 'react';
import axios from 'axios';

export default NicknameModifyScreen = ({ navigation }) => {
    const setUser = useUser(state => state.setUser);
    const currentUser = useUser(state => state.user);
    const [nickname, setNickname] = useState(currentUser.nickname);

    const nicknameModify = async () => {
        try{
            // const newUserInfo = { ...currentUser, nickname: nickname };
            const response = await axios({
                method : "patch",
                url : "http://10.20.60.16:3001/",
                // url : "http://localhost:3001/",
                headers : {
                    "Content-Type" : "application/json"
                },
                data : {
                    nickname : nickname
                },
                responseType : "json",
            })
            console.log(response.data);
            setUser(response.data);
            navigation.goBack();
        } catch (error){
            console.log(error);
        }
    }

    return (
        <View
            style={NicknameStyle.nicknameView}
        >
            <View
                style={NicknameStyle.nicknameBox}
            >
                <Text
                    style={NicknameStyle.title}
                >{"닉네임 변경"}</Text>
                <TextInput
                    placeholder="변경할 닉네임"
                    style={NicknameStyle.inputBox}
                    onChangeText={(value) => setNickname(value)}
                    maxLength={20}
                />
            </View>
            <TouchableOpacity
                style={NicknameStyle.button}
                onPress={() => nicknameModify()}
            >
                <Text
                    style={NicknameStyle.buttonLabel}
                >변경</Text>
            </TouchableOpacity>
        </View>
    );
}