import FestivalSearchScreenStyle from '../../styles/festival/FestivalSearchScreenStyle';
import { View, FlatList } from 'react-native';
import FestivalSearchScreenTop from '../../components/festival/FestivalSearchScreenTop';
import FestivalList from '../../components/common/FestivalList';
import {useEffect, useState} from "react";
import axios from 'axios';
import IPConfig from '../../configs/IPConfig.json';

export default FestivalSearchScreen = ({route}) => {
    const [festivalList, setFestivalList] = useState(null);

    useEffect(() => {
        getFestivalList();
    }, [route]);

    const getFestivalList = async (currentTop) => {
        /*
            행사목록도 상태관리로 관리하면
            다시 요청할 필요도 없을 것 같은데 맞는지 모르겠다.
            
            지금 이코드 이상한 점
            - currentTop은 처음에 비어있을 수 밖에 없음
                (currentTop은 입력받는 값이라서)
            - 그럼 else를 타고 if문을 타서 요청하게 됨
            - 근데 그 if 문은 기본적으로 보여주는 전체검색 행사값이다.
        */
        if(currentTop == "추천"){
            try{
                const response = await axios({
                    method: "get",
                    url: IPConfig.IP+"festivalList",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    responseType: "json",
                })
                setFestivalList(response.data);
            } catch (error){
                console.log(error);
            }
        } else {
            // 검색페이지에서 가져온 데이터가 없을 경우
            if(route.params == undefined){
                try{
                    const response = await axios({
                        method: "get",
                        url: IPConfig.IP+"festivalList",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        responseType: "json",
                    })
                    setFestivalList(response.data);
                } catch (error){
                    console.log(error);
                }
            // 검색페이지에서 가져온 데이터가 있을 경우
            } else {
                setFestivalList(route.params.data);
            }
        }
    }
        
    return (
        <View style={FestivalSearchScreenStyle.festivalSearchScreen}>
            <FestivalSearchScreenTop 
                top={route.params?.top}
                getFestivals={getFestivalList}/>
            <FestivalList data={festivalList} isMain={false}/>
        </View>
    );
}