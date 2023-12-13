import { View, Text, TouchableOpacity, Image } from "react-native";
import FestivalDetailScreenStyle from "../../../styles/festival/FestivalDetailScreenStyle";
import axios from "axios";
import IPConfig from '../../../configs/IPConfig.json';
import { useState } from "react";
import useUser from "../../user/UserState";
import useFestivalStore from "../../common/FestivalStore";
import useLikeFestivalStore from "../../common/likeFestivalStore";

export default FestivalDetailButtons = (props) => {
    const currentUser = useUser((state) => state.user);
    const festivalList = useFestivalStore((state) => state.festivalList);
    const setFestivalList = useFestivalStore((state) => state.setFestivalList);
    const [currentFestival, setCurrentFestival] = useState(
        festivalList.find((festival) => {
            return props.festivalInfo == festival
        })
    );
    const likeFestivalList = useLikeFestivalStore((state) => state.likeFestivalList);
    const setLikeFestivalList = useLikeFestivalStore((state) => state.setLikeFestivalList);

    const likeButtonClick = async () => {
        try {
            const response = await axios({
                method: "put",
                url: IPConfig.IP + `festivals/${currentFestival.id}/like/${currentUser.user_id}`,
                headers: {
                    "Content-Type": "application/json"
                },
                data: {
                    festival: currentFestival
                },
                responseType: "json",
            })
            console.log("{FestivalDetailButton} : likeButtonClick / response.data = ", response.data);
            let newFestivalList = [];
            festivalList.map((festival, idx) => {
                if (festival.id == response.data.festival.id) {
                    newFestivalList.push(response.data.festival);
                } else {
                    newFestivalList.push(festival);
                }
            })
            setFestivalList(newFestivalList);
            setCurrentFestival(response.data.festival);
            // likeFestivalList에서 현재 행사를 제거
            if(currentFestival.likestate){
                setLikeFestivalList(likeFestivalList?.filter((festival) => festival.id != currentFestival.id))
            }
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <View
            style={FestivalDetailScreenStyle.buttonBox}
        >
            <TouchableOpacity
                style={[
                    FestivalDetailScreenStyle.button,
                    { borderRightWidth: 1, borderRightColor: "lightgray" }
                ]}
                onPress={() => likeButtonClick()}
            >
                <Image
                    style={FestivalDetailScreenStyle.buttonImage}
                    source={currentFestival.likestate ? require('../../../assets/redHeart.png') : require('../../../assets/heart.png')}
                />
                <View
                    style={FestivalDetailScreenStyle.likeButtonBox}
                >
                    <Text
                        style={FestivalDetailScreenStyle.buttonLabel}
                    >좋아요</Text>
                    <Text>{`${currentFestival.like} 개`}</Text>
                </View>
            </TouchableOpacity>
            <TouchableOpacity
                style={FestivalDetailScreenStyle.button}
            >
                <Image
                    style={FestivalDetailScreenStyle.buttonImage}
                    source={require('../../../assets/home.png')}
                />
                <Text
                    style={FestivalDetailScreenStyle.buttonLabel}
                >공유</Text>
            </TouchableOpacity>
        </View>
    )
}