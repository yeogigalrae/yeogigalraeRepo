import { View, SafeAreaView, Text, Image } from 'react-native';
import FestivalList from '../../components/common/FestivalList';
import appStyle from '../../configs/Style';
import { useEffect} from 'react';
import axios from 'axios';
import useUser from '../../components/user/UserState';
import IPConfig from '../../configs/IPConfig.json';
import useFestivalStore from '../../components/common/FestivalStore';
import useLikeFestivalStore from '../../components/common/likeFestivalStore';
import LikeListStyle from '../../styles/user/LikeListStyle';

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
                {
                    likeFestivalList == []?(
                        <FestivalList data={likeFestivalList} isMain={false} />
                    ) : (
                        <View
                            style={LikeListStyle.noListView}
                        >
                            <Image
                                source={require('../../assets/logo.png')}
                                style={LikeListStyle.noListLogo}
                            />
                            <View
                                style={LikeListStyle.textView}
                            >
                                <Text
                                    style={LikeListStyle.noListText}
                                >좋아요한 행사가 없습니다.</Text>
                                <Text
                                    style={LikeListStyle.noListTextSub}
                                >행사 좋아요를 눌러서 목록에 추가해주세요.</Text>
                            </View>
                        </View>    
                    )
                }
            </View>
        </SafeAreaView>
    );
}