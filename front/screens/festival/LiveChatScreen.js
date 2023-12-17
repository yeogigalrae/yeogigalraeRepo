import { View, ScrollView, KeyboardAvoidingView, Image, TouchableOpacity, ActivityIndicator } from 'react-native';
import LiveChatStyle from '../../styles/festival/LiveChatScreenStyle';
import { useEffect, useRef, useState } from "react";
import { TextInput } from "react-native-gesture-handler";
import { io } from "socket.io-client";
import useUser from '../../components/user/UserState';
import useFestivalStore from '../../components/common/FestivalStore';
import IPConfig from '../../configs/IPConfig.json';
import Message from '../../components/festival/festivalDetail/Message';
import axios from "axios";


export default LiveChatScreen = ({ route }) => {
    const currentUser = useUser(state => state.user);
    const festivalList = useFestivalStore(state => state.festivalList);
    const setFestivalList = useFestivalStore(state => state.setFestivalList);
    const [currentFestival, setCurrentFestival] = useState(
        festivalList.find((festival) => {
            return route.params.festivalInfo == festival
        })
    );
    const scrollViewRef = useRef(null);

    const [message, setMessage] = useState();
    const [socket, setSocket] = useState(null);
    const [messageList, setMessageList] = useState([]);
    const [pageNum, setPageNum] = useState(0);
    const [isMaxPageNum, setMaxPageNum] = useState(false);
    const [loding, setLoding] = useState(false);

    useEffect(() => {
        const newSocket = io(IPConfig.LIVE_CHAT_IP);

        setPageNum(0); // 상세페이지 오면 pageNum을 1로 초기화
        getMessage(); // 메시지 가져오기 

        newSocket.on('message', data => {
            console.log(data);
            const newChatData = {
                datetime : data.datetime,
                msg : data.msg,
                nickname : data.nickname,
                photo : data.photo,
            }
            const newFestivalInfo = {
                ...currentFestival,
                sentiment : data.state
            }
            let newFestivalList = [];
            festivalList.map((festival, idx) => {
                if (festival.id == newFestivalInfo.id) {
                    newFestivalList.push(newFestivalInfo);
                } else {
                    newFestivalList.push(festival);
                }
            })
            
            setCurrentFestival(newFestivalInfo);
            setFestivalList(newFestivalList);
            setMessageList(preMessageList => [...preMessageList, newChatData]);
        })

        newSocket.on('error', e => {
            console.log(e.message);
        });
        newSocket.on('disconnect', e => {
            console.log('Disconnected. Check internet or server.');
        });

        setSocket(newSocket);

        setTimeout(() => {
            scrollToBottom();
        }, 500);

        return () => {
            console.log("채팅 페이지 나감")
            newSocket.emit('Leave', currentUser.user_id);
        };
    }, []);


    const scrollToBottom = () => {
        scrollViewRef.current?.scrollToEnd({ animated: true });
    };

    const sendMessage = async () => {
        if (message) {
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
    }

    const getMessage = async () => {
        if (!isMaxPageNum) {
            try {
                const response = await axios({
                    method: "get",
                    url: IPConfig.IP + `festivals/${currentFestival.id}/messages/${pageNum}`,
                    headers: { "Content-Type": "application/json" }
                })
                console.log("{LiveChatScreen} : getMessage / response.data.messageList.length = ", response.data.messageList.length);
                if (response.data.messageList == "") {
                    setMaxPageNum(true);
                    return;
                }
                setMessageList(messageList => [...response.data.messageList, ...messageList]);
                setLoding(false);
                setPageNum(pageNum + 1);
            } catch (error) {
                console.log(error);
            }
        }
    }

    const handleScroll = (event) => {
        const offsetY = event.nativeEvent.contentOffset.y;
        if (offsetY < 0 && !loding) {
            // 스크롤이 스크롤 뷰의 높이 
            getMessage();
            setLoding(true);
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
                    stickyHeaderHiddenOnScroll={true}
                    ref={scrollViewRef}
                >
                    {
                        loding && !isMaxPageNum ? (
                            <View>
                                <ActivityIndicator
                                    size="large"
                                    color={"white"}
                                    animating={true}
                                />
                            </View>
                        ) : null
                    }
                    {
                        messageList?.map((data, idx) => {
                            return <Message data={data} key={idx} />
                        })
                    }
                    <View style={{ paddingBottom: 30 }} />
                </ScrollView>
                <View
                    style={LiveChatStyle.liveChatInputBox}
                >
                    <TextInput
                        style={LiveChatStyle.liveChatInput}
                        onChangeText={(value) => setMessage(value)}
                        value={message}
                    >
                    </TextInput>
                    <TouchableOpacity
                        style={LiveChatStyle.liveChatInputButton}
                        onPress={() => {
                            sendMessage();
                            setMessage("");
                            scrollToBottom();
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
