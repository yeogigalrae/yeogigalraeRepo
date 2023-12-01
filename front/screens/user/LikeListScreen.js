import { View, Text } from 'react-native';
import FestivalList from '../../components/common/FestivalList';
import appStyle from '../../configs/Style.json';
import { useEffect, useState } from 'react';
import axios from 'axios';
import useUser from '../../components/user/UserState';
import IPConfig from '../../configs/IPConfig.json';

export default LikeListScreen = (props) => {
    const currentUser = useUser((state) => state.user);
    const [festivalList, setFestivalList] = useState(null);

    useEffect(() => {
        getFestivalList();
    }, []);

    const getFestivalList = async () => {
        try {
            const response = await axios({
                method: "get",
                url: IPConfig.IP+"festivalList",
                headers: {
                    "Content-Type": "application/json"
                },
                data: {
                    user: currentUser
                },
                responseType: "json",
            })
            console.log(response.data);
            setFestivalList(response.data);
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <View
            style={{ backgroundColor: appStyle.APP_BACKGROUD_COLOR }}
        >
            <FestivalList data={festivalList} isMain={false} />
        </View>
    );
}