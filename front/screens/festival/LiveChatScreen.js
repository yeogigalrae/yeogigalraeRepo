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


export default LiveChatScreen = ({ route }) => {
    const currentUser = useUser(state => state.user);
    const festivalList = useFestivalStore(state => state.festivalList);
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
    // const [inputFocus, setInputFocus] = useState(false);

    const scrollToBottom = () => {
        scrollViewRef.current?.scrollToEnd({ animated: true });
    };

    const sendMessage = async () => {
        if(message){
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
        if(!isMaxPageNum){
            setPageNum(pageNum + 1);
            console.log(pageNum);
            try {
                const response = await axios({
                    method: "get",
                    url: IPConfig.IP + `festivals/${currentFestival.id}/messages/${pageNum}`,
                    headers: { "Content-Type": "application/json" }
                })
                // console.log("{LiveChat} : getMessage / response.data = ", response.data);
                if(response.data.messageList == "") {
                    setMaxPageNum(true);
                } 
                setMessageList(messageList => [...response.data.messageList, ...messageList]);
            } catch (error) {
                console.log(error);
            }
        }
    }

    const handleScroll = (event) => {
        const offsetY = event.nativeEvent.contentOffset.y;
        const currentHeight = event.nativeEvent.contentSize.height/20
        if (offsetY < currentHeight) {
            // 스크롤이 스크롤 뷰의 높이 
            getMessage();
        }
    };

    useEffect(() => {
        const newSocket = io(IPConfig.LIVE_CHAT_IP);
        
        scrollToBottom();
        setPageNum(0); // 상세페이지 오면 pageNum을 1로 초기화
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
            console.log("채팅 페이지 나감")
            newSocket.emit('Leave', currentUser.user_id);
        };
    }, []);

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
                        messageList?.map((data, idx) => {
                            return <Message data={data} key={idx} />
                        })
                    }
                    <View style={{paddingBottom: 30}}/>
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