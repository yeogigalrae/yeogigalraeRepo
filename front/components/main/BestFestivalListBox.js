import {View, Text} from 'react-native';
import BestFestivalListBoxStyle from '../../styles/main/BestFestivalListBoxStyle';
import FestivalList from '../common/FestivalList';

const dummy = [
    {
        id:1,
        subject: "행사1",
        likeCount: 1234,
        startDate: "2023년 11월 14일",
        endDate: "2023년 11월 16일",
        address: "충남 아산시 ~"
    },  
    {
        id:2,
        subject: "행사2",
        likeCount: 1,
        startDate: "2023년 11월 14일",
        endDate: "2023년 11월 16일",
        address: "전북 익산시 ~"
    }
]

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
                    data={dummy}
                    isMain={true}
                />
            </View>
        </View>
    );
}