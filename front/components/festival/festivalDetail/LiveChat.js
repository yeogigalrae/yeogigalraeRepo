import { TouchableOpacity, View, Text } from "react-native";
import FestivalDetailScreenStyle from "../../../styles/festival/FestivalDetailScreenStyle";

export default LiveChat = (props) => {
    const begin_date = new Date(props.festivalInfo.begin_date);
    const end_date = new Date(props.festivalInfo.end_date);
    
    const liveChatActivate = (begin_date-end_date)>=0?true:false;

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