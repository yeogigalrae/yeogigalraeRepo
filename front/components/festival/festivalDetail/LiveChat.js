import { TouchableOpacity, View, Text } from "react-native";
import FestivalDetailScreenStyle from "../../../styles/festival/FestivalDetailScreenStyle";

export default LiveChat = (props) => {
    const liveChatActivate = props.liveChatActivate;

    return (
        <View
            style={FestivalDetailScreenStyle.liveChatBox}
        >
            <TouchableOpacity
                style={FestivalDetailScreenStyle.liveChatButton}
                disabled={!liveChatActivate}
            >
                <Text
                    style={FestivalDetailScreenStyle.liveChatLabel}
                >{"실시간 채팅 >"}</Text>
                <View
                    style={FestivalDetailScreenStyle.liveChatStateBox}
                >
                    {liveChatActivate?(
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
        </View>
    )
}