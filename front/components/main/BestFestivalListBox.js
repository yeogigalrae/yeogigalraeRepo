import {View, Text} from 'react-native';
import BestFestivalListBoxStyle from '../../styles/main/BestFestivalListBoxStyle';
import FestivalList from '../common/FestivalList';

export default BestFestivalListBox = (props) => {

    return (
        <View
            style={BestFestivalListBoxStyle.bestFestivalListBox}
        >
            <View style={BestFestivalListBoxStyle.titleBox}>
                {/* Text에는 바텀 라인이 안생겨서 뷰로 한번더 감싸줌 */}
                <View style={BestFestivalListBoxStyle.titleBottomLine}>
                    <Text style={BestFestivalListBoxStyle.title}>인기행사</Text>
                </View>
            </View>
            <View style={BestFestivalListBoxStyle.festivalListBox}>
                <FestivalList 
                    data={props.list}
                    isMain={true}
                />
            </View>
        </View>
    );
}