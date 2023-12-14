import FestivalSearchScreenStyle from '../../styles/festival/FestivalSearchScreenStyle';
import { View, FlatList, SafeAreaView, ActivityIndicator } from 'react-native';
import FestivalSearchScreenTop from '../../components/festival/FestivalSearchScreenTop';
import FestivalList from '../../components/common/FestivalList';
import { useEffect, useState } from "react";
import axios from 'axios';
import IPConfig from '../../configs/IPConfig.json';
import appStyle from '../../configs/Style';
import useUser from '../../components/user/UserState';
import useFestivalStore from '../../components/common/FestivalStore';

export default FestivalSearchScreen = ({ route }) => {
    const festivalList = useFestivalStore((state) => state.festivalList);
    const setFestivalList = useFestivalStore((state) => state.setFestivalList);
    const currentUser = useUser((state) => state.user);

    useEffect(() => {
        getFestivalList();
    }, [route]);

    const getFestivalList = async (currentTop) => {
        if (route.params == undefined) {
            if (currentTop == "추천" || currentTop == null) {
                try {
                    setFestivalList(null);
                    const response = await axios({
                        method: "get",
                        url: IPConfig.IP + `festivals/recommends/${currentUser.user_id}`,
                        headers: {
                            "Content-Type": "application/json"
                        },
                        responseType: "json",
                    })
                    console.log("{FestivalSearchScreen} : getFestivalList[상단헤더가 추천 일 경우] / response.data = ", response.data);
                    setFestivalList(response.data.festivals);
                } catch (error) {
                    console.log(error);
                }
            } else if (currentTop == "전체") {
                try {
                    setFestivalList(null);
                    const response = await axios({
                        method: "get",
                        url: IPConfig.IP + `festivals/${currentUser.user_id}`,
                        headers: {
                            "Content-Type": "application/json"
                        },
                        responseType: "json",
                    })
                    setFestivalList(response.data.festivals);
                    console.log("{FestivalSearchScreen} : getFestivalList[상단헤더가 전체 일 경우] / response.data = ", response.data);
                } catch (error) {
                    console.log(error);
                }
            }
        } else {
            setFestivalList(route.params.data);
            route.params = undefined
            // 검색페이지에서 가져온 데이터가 없을 경우
            // 검색페이지에서 텍스트를 입력 한 경우에도 행사가 없을 수 가 있으니 이점 다시 보완
        }
    }

    return (
        <SafeAreaView
            style={{ backgroundColor: appStyle.APP_MAIN_COLOR }}
        >
            <View style={FestivalSearchScreenStyle.festivalSearchScreen}>
                <FestivalSearchScreenTop
                    top={route.params?.top}
                    getFestivals={getFestivalList}
                />
                {
                    festivalList ? (
                        <>
                            <FestivalList data={festivalList} isMain={false} />
                        </>
                    ) : (
                        <View
                            style={{ justifyContent: "center", alignItems: "center", height: "80%" }}
                        >
                            <ActivityIndicator
                                size="large"
                                color={appStyle.APP_MAIN_COLOR}
                                animating={true}
                            />
                        </View>
                    )
                }
            </View>
        </SafeAreaView>
    );
}
