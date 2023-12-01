import { ScrollView } from 'react-native';
import FestivalTypeButtonBox from '../../components/main/FestivalTypeButtonBox';
import FestivalSearchButtonBox from '../../components/main/FestivalSearchButtonBox';
import BestFestivalListBox from '../../components/main/BestFestivalListBox';
import MainStyle from '../../styles/main/MainStyle';
import { useEffect, useState } from 'react';
import axios from 'axios';
import IPConfig from '../../configs/IPConfig.json';

export default MainScreen = (props) => {
    const [festivalList, setFestivalList] = useState(null);

    useEffect(() => {
        initMain();
    }, [])

    const initMain = async () => {
        try {
            const response = await axios({
                method: "get",
                url: IPConfig.IP + "main",
                headers: {
                    "Content-Type": "application/json"
                },
                responseType: "json",
            })
            console.log(response.data);
            setFestivalList(response.data);
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