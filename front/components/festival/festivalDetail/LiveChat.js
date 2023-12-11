import { TouchableOpacity, View, Text, ScrollView, Image, KeyboardAvoidingView } from "react-native";
import FestivalDetailScreenStyle from "../../../styles/festival/FestivalDetailScreenStyle";
import { useEffect, useState } from "react";
import { TextInput } from "react-native-gesture-handler";
import appStyle from '../../../configs/Style.json';
import { io } from "socket.io-client";
import useUser from "../../user/UserState";
import useFestivalStore from "../../common/FestivalStore";
const socket = io("http://192.168.0.97:3002/");

export default LiveChat = (props) => {
    const currentUser = useUser(state => state.user);
    const festivalList = useFestivalStore(state => state.festivalList);
    const [currentFestival, setCurrentFestival] = useState(
        festivalList.find((festival) => {
            return props.festivalInfo == festival
        })
    );

    const begin_date = new Date(props.festivalInfo.begin_date);
    const end_date = new Date(props.festivalInfo.end_date);
    const currentDate = new Date();
    const liveChatActivate = (currentDate >= begin_date && currentDate <= end_date) ? true : false;

    const [chatOpen, setChatOpen] = useState(false);
    const [message, setMessage] = useState();

    useEffect(() => {
        if (chatOpen) {
            socket.on('connection', () => {
                let message = {
                    type: 'Welcome',
                };

                socket.emit('welcome', message);
                console.log('Connected Server');
            });

            socket.on('error', e => {
                console.log(e.message);
            });
        } else {
            socket.on('disconnect', e => {
                console.log('Disconnected. Check internet or server.');
            });
        }

        return () => {
            console.log("상세 페이지 나감")
            let message = {
                type: 'Leave',
            };
            socket.emit('Leave', message);
        };
    }, [setChatOpen]);

    const sendMessage = async () => {
        try {
            socket.emit('send', {
                type: "send",
                user_id: currentUser.user_id,
                festival_id : currentFestival.id, 
                msg: message,
            });
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <View
            style={FestivalDetailScreenStyle.liveChatBox}
        >
            <TouchableOpacity
                style={chatOpen
                    ? [FestivalDetailScreenStyle.liveChatButton, {
                        backgroundColor: appStyle.APP_MAIN_COLOR,
                        borderTopRightRadius: 50
                    }]
                    : FestivalDetailScreenStyle.liveChatButton}
                disabled={liveChatActivate}
                onPress={() => {
                    if (chatOpen) {
                        setChatOpen(false);
                    } else {
                        setChatOpen(true);
                    }
                }}
            >
                <Text
                    style={FestivalDetailScreenStyle.liveChatLabel}
                >{"실시간 채팅 >"}</Text>
                <View
                    style={FestivalDetailScreenStyle.liveChatStateBox}
                >
                    {!liveChatActivate ? (
                        <>
                            <Text>ON</Text>
                            <View
                                style={FestivalDetailScreenStyle.liveChatOnState}
                            />
                        </>
                    ) : (
                        <>
                            <Text>OFF</Text>
                            <View
                                style={FestivalDetailScreenStyle.liveChatOffState}
                            />
                        </>
                    )}
                </View>
            </TouchableOpacity>
            {
                chatOpen ? (
                    <View>
                        <KeyboardAvoidingView
                            behavior={Platform.OS === 'ios' ? "height" : null}
                            keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0}
                        >
                            <ScrollView
                                style={FestivalDetailScreenStyle.liveChatArea}
                            >
                            </ScrollView>
                            <View
                                style={FestivalDetailScreenStyle.liveChatInputBox}
                            >
                                <TextInput
                                    style={FestivalDetailScreenStyle.liveChatInput}
                                    onChangeText={(value) => setMessage(value)}
                                >
                                </TextInput>
                                <TouchableOpacity
                                    style={FestivalDetailScreenStyle.liveChatInputButton}
                                    onPress={() => {
                                        sendMessage()
                                    }}
                                >
                                    <Image
                                        style={FestivalDetailScreenStyle.liveChatInputButtonImage}
                                        source={require("../../../assets/home.png")}
                                    ></Image>
                                </TouchableOpacity>
                            </View>
                        </KeyboardAvoidingView>
                    </View>
                ) : (
                    null
                )
            }
        </View>
    )
}