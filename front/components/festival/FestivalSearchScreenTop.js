import { useState } from 'react';
import FestivalSearchScreenStyle from '../../styles/festival/FestivalSearchScreenStyle';
import { View, Text, TouchableOpacity, Image } from 'react-native';

export default FestivalSearchScreenTop = (props) => {
    const [currentTop, setCurrentTop] = useState("추천");

    return (
        <View style={FestivalSearchScreenStyle.top}>
            <View style={FestivalSearchScreenStyle.topEmpty} />
                <View style={FestivalSearchScreenStyle.topButtonBox}>
                    <TouchableOpacity
                        style={[
                            FestivalSearchScreenStyle.topButton,
                            currentTop=="추천"?
                                FestivalSearchScreenStyle.topLeftButtonAfter:
                                FestivalSearchScreenStyle.topLeftButtonBefore
                        ]}
                        onPress={() => {
                            setCurrentTop("추천");
                            props.getFestivals("추천");
                        }}
                    >
                        <Text
                            style={[
                                FestivalSearchScreenStyle.ButtonLabel,
                                currentTop=="추천"?
                                    FestivalSearchScreenStyle.ButtonLabelAfter:
                                    FestivalSearchScreenStyle.ButtonLabelBefore
                            ]}
                        >추천</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[
                            FestivalSearchScreenStyle.topButton,
                            currentTop=="추천"?
                                FestivalSearchScreenStyle.topRightButtonBefore:
                                FestivalSearchScreenStyle.topRightButtonAfter
                        ]}
                        onPress={() => {
                            setCurrentTop("전체");
                            props.getFestivals("전체");
                        }}
                    >
                        <Text
                            style={[
                                FestivalSearchScreenStyle.ButtonLabel,
                                currentTop=="추천"?
                                    FestivalSearchScreenStyle.ButtonLabelBefore:
                                    FestivalSearchScreenStyle.ButtonLabelAfter
                            ]}
                        >전체</Text>
                    </TouchableOpacity>
                </View>
            <View style={FestivalSearchScreenStyle.topEmpty} />
            {
                currentTop=="전체"?(
                    <View
                        style={FestivalSearchScreenStyle.searchBox}
                    >
                        <TouchableOpacity
                            style={FestivalSearchScreenStyle.searchButton}
                            onPress={null}
                        >
                            <Text
                                style={FestivalSearchScreenStyle.searchButtonLabel}
                            >어떤 행사를 갈까요?</Text>
                            <Image
                                style={FestivalSearchScreenStyle.searchImage}
                                source={require("../../assets/search.png")}
                            >
                            </Image>
                        </TouchableOpacity>
                    </View>
                ) : null
            }
        </View>
    )
}