import FestivalSearchScreenStyle from '../../styles/festival/FestivalSearchScreenStyle';
import { View, FlatList } from 'react-native';
import FestivalSearchScreenTop from '../../components/festival/FestivalSearchScreenTop';
import FestivalList from '../../components/common/FestivalList';
import {useState} from "react";
import axios from 'axios';
import IPConfig from '../../configs/IPConfig.json';

export default FestivalSearchScreen = (props) => {
    const [festivalList, setFestivalLst] = useState(null);

    async function getFestivalList() {
        console.log(IPConfig.IP+"festivalList");
        try{
            const response = await axios({
                method: "get",
                url: IPConfig.IP+"festivalList",
                headers: {
                    "Content-Type": "application/json"
                },
                responseType: "json",
            })
            setFestivalLst(response.data);
        } catch (error){
            console.log(error);
        }
    }
        
    return (
        <View style={FestivalSearchScreenStyle.festivalSearchScreen}>
            <FestivalSearchScreenTop getFestivals={getFestivalList}/>
            <FestivalList data={festivalList} isMain={false}/>
        </View>
    );
}