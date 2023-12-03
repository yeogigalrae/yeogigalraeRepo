import {View, Text, TouchableOpacity, Image} from "react-native";
import FestivalDetailScreenStyle from "../../../styles/festival/FestivalDetailScreenStyle";
import axios from "axios";
import IPConfig from '../../../configs/IPConfig.json';
import { useState } from "react";

export default FestivalDetailButtons = (props) => {
    const [currentLikeCount, setLikeCount] = useState(props.likeCount);

    const likeButtonClick = async () => {
        try{
            const response = await axios({
                method: "patch",
                url: IPConfig.IP+"like",
                headers: {
                    "Content-Type": "application/json"
                },
                responseType: "json",
            })
            console.log(response.data);
            setLikeCount(response.data);
        } catch(error){
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
                    {borderRightWidth: 1, borderRightColor: "lightgray"}
                ]}
                onPress={() => likeButtonClick()}
            >
                <Image
                    style={FestivalDetailScreenStyle.buttonImage}
                    source={require('../../../assets/heart.png')}
                />
                <View
                    style={FestivalDetailScreenStyle.likeButtonBox}
                >
                    <Text
                        style={FestivalDetailScreenStyle.buttonLabel}
                    >좋아요</Text>
                    <Text>{`${currentLikeCount} 개`}</Text>
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