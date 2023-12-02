import FestivalSearchScreenStyle from '../../styles/festival/FestivalSearchScreenStyle';
import { View, FlatList } from 'react-native';
import FestivalSearchScreenTop from '../../components/festival/FestivalSearchScreenTop';
import FestivalList from '../../components/common/FestivalList';
import {useEffect, useState} from "react";
import axios from 'axios';
import IPConfig from '../../configs/IPConfig.json';

export default FestivalSearchScreen = (props) => {
    const [festivalList, setFestivalList] = useState(null);

    useEffect(() => {
        getFestivalList();
    }, [props]);

    const getFestivalList = async (currentTop) => {
        console.log(props.route.params);
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
            if(props.route.params == undefined){
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
                setFestivalList(props.route.params.data);
            }
        }
    }
        
    return (
        <View style={FestivalSearchScreenStyle.festivalSearchScreen}>
            <FestivalSearchScreenTop getFestivals={getFestivalList}/>
            <FestivalList data={festivalList} isMain={false}/>
        </View>
    );
}