import {View, Text} from 'react-native';
import FestivalList from '../../components/common/FestivalList';
import appStyle from '../../configs/Style.json';

export default LikeListScreen = (props) => {

    const dummy = [{
        id:1,
        subject: "행사1",
        likeCount: 1234,
        startDate: "2023년 11월 14일",
        endDate: "2023년 11월 16일",
        address: "충남 아산시 ~"
    },{
        id:2,
        subject: "행사2",
        likeCount: 15,
        startDate: "2023년 11월 14일",
        endDate: "2023년 11월 16일",
        address: "전북 익산시 ~"
    },{
        id:3,
        subject: "행사3",
        likeCount: 15,
        startDate: "2023년 11월 14일",
        endDate: "2023년 11월 16일",
        address: "전북 익산시 ~"
    },{
        id:4,
        subject: "행사4",
        likeCount: 15,
        startDate: "2023년 11월 14일",
        endDate: "2023년 11월 16일",
        address: "전북 익산시 ~"
    }]

    return (
        <View
            style={{backgroundColor:appStyle.APP_BACKGROUD_COLOR}}
        >
            <FestivalList data={dummy} isMain={false}/>
        </View>
    );
}