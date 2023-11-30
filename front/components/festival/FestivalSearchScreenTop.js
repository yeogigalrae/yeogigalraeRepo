import FestivalSearchScreenStyle from '../../styles/festival/FestivalSearchScreenStyle';
import {View, Text, TouchableOpacity} from 'react-native';

export default FestivalSearchScreenTop = (props) => {
    return (
        <View style={FestivalSearchScreenStyle.top}>
            <View style={FestivalSearchScreenStyle.topEmpty}/>
                <View style={FestivalSearchScreenStyle.topButtonBox}>   
                    <TouchableOpacity
                        style={[
                            FestivalSearchScreenStyle.topButton,
                            // FestivalSearchScreenStyle.topLeftButtonBefore,
                            FestivalSearchScreenStyle.topLeftButtonAfter,
                        ]}
                        onPress={() => props.getFestivals("추천")}
                    >
                        <Text 
                            style={[
                                // FestivalSearchScreenStyle.ButtonLabelBefore,
                                FestivalSearchScreenStyle.ButtonLabelAfter,
                                FestivalSearchScreenStyle.ButtonLabel
                            ]}
                        >추천</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[
                            FestivalSearchScreenStyle.topButton,
                            // FestivalSearchScreenStyle.topRightButtonAfter
                            FestivalSearchScreenStyle.topRightButtonBefore
                        ]}
                        onPress={() => props.getFestivals("전체")}
                    >
                        <Text
                            style={[
                                // FestivalSearchScreenStyle.ButtonLabelAfter,
                                FestivalSearchScreenStyle.ButtonLabelBefore,
                                FestivalSearchScreenStyle.ButtonLabel
                            ]}
                            >전체</Text>
                    </TouchableOpacity>
                </View>
            <View style={FestivalSearchScreenStyle.topEmpty}/>
        </View>
    )
}