import { TouchableOpacity, View, Text, ScrollView, Image, KeyboardAvoidingView } from "react-native";
import FestivalDetailScreenStyle from "../../../styles/festival/FestivalDetailScreenStyle";
import { useEffect, useRef, useState } from "react";
import { TextInput } from "react-native-gesture-handler";
import appStyle from '../../../configs/Style.json';
import { io } from "socket.io-client";
import useUser from "../../user/UserState";
import useFestivalStore from "../../common/FestivalStore";
import IPConfig from '../../../configs/IPConfig.json';
import Message from "./Message";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";

export default LiveChat = (props) => {
    const currentUser = useUser(state => state.user);
    const festivalList = useFestivalStore(state => state.festivalList);
    const [currentFestival, setCurrentFestival] = useState(
        festivalList.find((festival) => {
            return props.festivalInfo == festival
        })
    );
    const navigation = useNavigation();

    const begin_date = new Date(props.festivalInfo.begin_date);
    const end_date = new Date(props.festivalInfo.end_date);
    const currentDate = new Date();
    const liveChatActivate = (currentDate >= begin_date && currentDate <= end_date) ? true : false;

    const [chatOpen, setChatOpen] = useState(false);
    const [message, setMessage] = useState();
    const [socket, setSocket] = useState(null);
    const [messageList, setMessageList] = useState([]);
    const [pageNum, setPageNum] = useState(1);

    useEffect(() => {
        const newSocket = io(IPConfig.LIVE_CHAT_IP);

        setPageNum(1); // 상세페이지 오면 pageNum을 1로 초기화
        getMessage(); // 메시지 가져오기 


        newSocket.on('message', data => {
            console.log(data);
            setMessageList(preMessageList => [...preMessageList, data]);
        })

        newSocket.on('error', e => {
            console.log(e.message);
        });
        newSocket.on('disconnect', e => {
            console.log('Disconnected. Check internet or server.');
        });

        setSocket(newSocket);

        return () => {
            console.log("상세 페이지 나감")
            let message = {
                type: 'Leave',
            };
            newSocket.emit('Leave', message);
        };
    }, []);

    const sendMessage = async () => {
        try {
            if (socket) {
                socket.emit('send', {
                    type: "send",
                    user_id: currentUser.user_id,
                    festival_id: currentFestival.id,
                    msg: message,
                });
            }
        } catch (error) {
            console.log(error);
        }
    }

    const getMessage = async () => {
        try {
            const response = await axios({
                method: "get",
                url: IPConfig.IP + `festivals/${currentFestival.id}/messages/${pageNum}`,
                headers: { "Content-Type": "application/json" }
            })
            // console.log("{LiveChat} : getMessage / response.data = ", response.data);
            setMessageList(messageList => [...response.data.messageList, ...messageList]);
        } catch (error) {
            console.log(error);
        }
    }

    const handleScroll = (event) => {
        const offsetY = event.nativeEvent.contentOffset.y;
        if (offsetY === 0) {
            // 스크롤이 맨 위에 도달했을 때 실행할 함수
            setPageNum(pageNum + 1);
            getMessage();
        }
    };

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
                    navigation.navigate("liveChat", {festivalInfo : currentFestival});
                    // if (chatOpen) {
                    //     setChatOpen(false);
                    // } else {
                    //     setChatOpen(true);
                    // }
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
                                onScroll={handleScroll}
                                scrollEventThrottle={16}
                            >
                                {
                                    messageList?.map((data, idx) => {
                                        return <Message data={data} key={idx} />
                                    })
                                }
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