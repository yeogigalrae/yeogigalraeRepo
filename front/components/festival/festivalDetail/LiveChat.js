import { TouchableOpacity, View, Text, ScrollView, Image, KeyboardAvoidingView } from "react-native";
import FestivalDetailScreenStyle from "../../../styles/festival/FestivalDetailScreenStyle";
import { useState } from "react";
import useFestivalStore from "../../common/FestivalStore";
import { useNavigation } from "@react-navigation/native";

export default LiveChat = (props) => {
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

    return (
        <View
            style={FestivalDetailScreenStyle.liveChatBox}
        >
            <TouchableOpacity
                style={FestivalDetailScreenStyle.liveChatButton}
                disabled={liveChatActivate}
                onPress={() => {
                    navigation.navigate("liveChat", {festivalInfo : currentFestival});
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
        </View>
    )
}