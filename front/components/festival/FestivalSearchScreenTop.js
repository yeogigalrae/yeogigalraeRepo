import FestivalSearchScreenStyle from '../../styles/festival/FestivalSearchScreenStyle';
import {View, Text, TouchableOpacity} from 'react-native';

export default FestivalSearchScreenTop = () => {
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