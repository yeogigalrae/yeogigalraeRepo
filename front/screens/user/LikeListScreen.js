import { View, Text, SafeAreaView } from 'react-native';
import FestivalList from '../../components/common/FestivalList';
import appStyle from '../../configs/Style';
import { useCallback, useEffect, useState } from 'react';
import axios from 'axios';
import useUser from '../../components/user/UserState';
import IPConfig from '../../configs/IPConfig.json';
import useFestivalStore from '../../components/common/FestivalStore';
import useLikeFestivalStore from '../../components/common/likeFestivalStore';

export default LikeListScreen = (props) => {
    const currentUser = useUser((state) => state.user);
    const festivalList = useFestivalStore((state) => state.festivalList);
    const likeFestivalList = useLikeFestivalStore((state) => state.likeFestivalList);
    const setLikeFestivalList = useLikeFestivalStore((state) => state.setLikeFestivalList);

    useEffect(() => {
        getFestivalList();
    }, []);

    const getFestivalList = async () => {
        try {
            const response = await axios({
                method: "get",
                url: IPConfig.IP + `festivals/${currentUser.user_id}/liked`,
                headers: {
                    "Content-Type": "application/json"
                },
                responseType: "json",
            })
            console.log("{ LikeListScreen } : getFestivalList / response.data = ", response.data);
            setLikeFestivalList(response.data.festivals);
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <SafeAreaView
            style={{ backgroundColor: appStyle.APP_MAIN_COLOR }}
        >
            <View
                style={{ backgroundColor: appStyle.APP_BACKGROUD_COLOR, height: "100%" }}
            >
                <FestivalList data={likeFestivalList} isMain={false} />
            </View>
        </SafeAreaView>
    );
}