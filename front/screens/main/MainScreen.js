import { ScrollView, Alert, BackHandler } from 'react-native';
import FestivalTypeButtonBox from '../../components/main/FestivalTypeButtonBox';
import FestivalSearchButtonBox from '../../components/main/FestivalSearchButtonBox';
import BestFestivalListBox from '../../components/main/BestFestivalListBox';
import MainStyle from '../../styles/main/MainStyle';
import { useEffect, useState } from 'react';
import axios from 'axios';
import IPConfig from '../../configs/IPConfig.json';
import useUser from '../../components/user/UserState';
// import usePermissions from '../../components/map/usePermissions';

export default MainScreen = (props) => {
    const [festivalList, setFestivalList] = useState();
    const currentUser = useUser(state => state.user);

    useEffect(() => {
        // const backAction = () => {
        //     Alert.alert('앱 종료', '앱을 종료하시겠습니까?', [
        //         { text: '확인', onPress: () => BackHandler.exitApp() },
        //         { text: '취소', onPress: () => null },
        //     ]);
        //     return true;
        // };
        // const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);
        // return () => {
        //     backHandler.remove();
        // };
        initMain();
    }, [])

    const initMain = async () => {
        try {
            const response = await axios({
                method: "get",
                url: IPConfig.IP + `festivals/top5/${currentUser.id}`,
                headers: {
                    "Content-Type": "application/json"
                },
                responseType: "json",
            })
            console.log("{MainScreen} : initMain / response.data = ", response.data);
            setFestivalList(response.data.festivals);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <ScrollView
            style={MainStyle.mainView}
        >
            <FestivalTypeButtonBox />
            <FestivalSearchButtonBox />
            {
                festivalList != null ?
                    <BestFestivalListBox list={festivalList} />
                    : null
            }
        </ScrollView>
    );
}