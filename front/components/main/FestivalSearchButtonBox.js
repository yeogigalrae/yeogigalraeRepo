import {View, Text} from 'react-native';
import FestivalSearchButtonBoxStyle from '../../styles/main/FestivalSearchButtonBoxStyle';
import FestivalSearchButton from './FestivalSearchButton';

export default FestivalSearchButtonBox = (props) => {
    return (
        <View
            style={FestivalSearchButtonBoxStyle.festivalSearchButtonBox}
        >
            <FestivalSearchButton label="검색하여 찾아보기" screen="search"/>
            <FestivalSearchButton label="지도로 찾아보기" screen="map"/>
        </View>
    );
}