import {View, Text} from 'react-native';
import FestivalTypeButtonBoxStyle from '../../styles/main/FestivalTypeButtonBoxStyle';
import FestivalButton from './FestivalTypeButton';

export default FestivalTypeButtonBox = (props) => {
    return (
        <View
            style={FestivalTypeButtonBoxStyle.festivalTypeButtonBox}
        >
            <FestivalButton name={"행사"} image={require("../../assets/home.png")}/>
            <FestivalButton name={"축제"} image={require("../../assets/home.png")}/>
            <FestivalButton name={"콘서트"} image={require("../../assets/home.png")}/>
            <FestivalButton name={"전시회"} image={require("../../assets/home.png")}/>
        </View>
    );
}