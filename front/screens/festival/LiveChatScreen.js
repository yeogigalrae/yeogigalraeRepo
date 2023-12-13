import { View, ScrollView, KeyboardAvoidingView, Image, TouchableOpacity } from 'react-native';
import LiveChatStyle from '../../styles/festival/LiveChatScreenStyle';
import { useEffect, useRef, useState } from "react";
import { TextInput } from "react-native-gesture-handler";
import { io } from "socket.io-client";
import useUser from '../../components/user/UserState';
import useFestivalStore from '../../components/common/FestivalStore';
import IPConfig from '../../configs/IPConfig.json';
import Message from '../../components/festival/festivalDetail/Message';
import axios from "axios";


export default LiveChatScreen = ({route}) => {
    const currentUser = useUser(state => state.user);
    const festivalList = useFestivalStore(state => state.festivalList);
    const [currentFestival, setCurrentFestival] = useState(
        festivalList.find((festival) => {
            return route.params.festivalInfo == festival
        })
    );

    const [message, setMessage] = useState();
    const [socket, setSocket] = useState(null);
    const [messageList, setMessageList] = useState([]);
    const [pageNum, setPageNum] = useState(1);
    // const [inputFocus, setInputFocus] = useState(false);

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
            style={LiveChatStyle.liveChat}
        >
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? "position" : null}
                keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
            >
                <ScrollView
                    style={LiveChatStyle.liveChatArea}
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
                    style={LiveChatStyle.liveChatInputBox}
                >
                    <TextInput
                        style={LiveChatStyle.liveChatInput}
                        onChangeText={(value) => setMessage(value)}
                        // multiline={true}
                        // focusable={() => setInputFocus(true)}
                    >
                    </TextInput>
                    <TouchableOpacity
                        style={LiveChatStyle.liveChatInputButton}
                        onPress={() => {
                            sendMessage()
                        }}
                    >
                        <Image
                            style={LiveChatStyle.liveChatInputButtonImage}
                        ></Image>
                    </TouchableOpacity>
                </View>
            </KeyboardAvoidingView>
        </View>
    )
}