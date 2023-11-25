import {ScrollView} from 'react-native';
import FestivalTypeButtonBox from '../../components/main/FestivalTypeButtonBox';
import FestivalSearchButtonBox from '../../components/main/FestivalSearchButtonBox';
import BestFestivalListBox from '../../components/main/BestFestivalListBox';
import MainStyle from '../../styles/main/MainStyle';

export default MainScreen = (props) => {
    return (
        <ScrollView
            style={MainStyle.mainView}
        >
            <FestivalTypeButtonBox/>
            <FestivalSearchButtonBox/>
            <BestFestivalListBox/>
        </ScrollView>
    );
}