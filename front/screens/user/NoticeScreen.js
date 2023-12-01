import {View, Text, TouchableOpacity} from 'react-native';
import NoticeStyle from '../../styles/user/NoticeStyle';
import {useEffect, useState} from "react";
import IPConfig from '../../configs/IPConfig.json';
import useUser from '../../components/user/UserState';
import axios from 'axios';

export default NoticeScreen = (props) => {
    const currentUser = useUser((state) => state.user);
    const setUser = useUser((state) => state.setUser);
    const [isNotice, setNotice] = useState(currentUser.notice);
    
    const changeNotice = async() => {
        try{
            const newUserInfo = {
                ...currentUser,
                notice : isNotice
            }
            const response = await axios({
                method: "put",
                url: IPConfig.IP,
                headers: {
                    "Content-Type": "application/json"
                },
                data: {
                    user : newUserInfo
                },
                responseType: "json",
            })
            console.log(response.data);
            setUser(newUserInfo);
        } catch (error){
            console.log(error);
        }
    }

    return (
        <View
            style={NoticeStyle.notice}
        >
            <View
                style={NoticeStyle.container}
            >
                <View
                    style={NoticeStyle.titleBox}
                >
                    <Text
                        style={NoticeStyle.title}
                    >알림 설정</Text>
                </View>
                <View
                    style={NoticeStyle.settingBox}
                >
                    <View
                        style={NoticeStyle.noticeSetting}
                    >
                        <Text
                            style={NoticeStyle.noticeSettingLabel}
                        >알림 켜기/끄기</Text>
                        {
                            isNotice?(
                                <TouchableOpacity
                                    style={NoticeStyle.onNotice}
                                    onPress={() => {
                                        setNotice(false);
                                        changeNotice();
                                    }}
                                >
                                    <View style={NoticeStyle.noticeCurr}/>
                                </TouchableOpacity>
                            ) : (
                                <TouchableOpacity
                                    style={NoticeStyle.offNotice}
                                    onPress={() => {
                                        setNotice(true)
                                        changeNotice();
                                    }}
                                >
                                    <View style={NoticeStyle.noticeCurr}/>
                                </TouchableOpacity>
                            )
                        }
                    </View>
                </View>
            </View>
        </View>
    );
}