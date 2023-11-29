import {Text, TouchableOpacity, Image} from 'react-native';
import FestivalSearchButtonBoxStyle from '../../styles/main/FestivalSearchButtonBoxStyle';
import { useNavigation } from '@react-navigation/native';
import IPConfig from '../../configs/IPConfig.json';

export default FestivalSearchButton = (props) => {
    
    const navigation = useNavigation();

    const textSearch = async () => {
        try{
            const response = await axios({
                method : "get",
                url : IPConfig.IP,
                headers : {
                    "Content-Type" : "application/json"
                },
                responseType : "json"
            })
            console.log(response.data);
        } catch(error) {
            console.log(error);
        }
        navigation.navigate("search", { data: response.data });
    }

    const mapSearch = async () => {
        try{
            const response = await axios({
                method : "get",
                url : `http://172.16.34.89:3000/map`,
                headers : {
                    "Content-Type" : "application/json"
                },
                responseType : "json"
            })
            console.log(response.data);
        } catch(error) {
            console.log(error);
        }
        navigation.navigate("map", { data: response.data });
    }

    return (
        <TouchableOpacity
            style={FestivalSearchButtonBoxStyle.festivalSearchButton}
            onPress={() => {
                if(props.screen === "search"){
                    textSearch();
                } else {
                    mapSearch();
                }
            }}
        >
            <Image
                source={require("../../assets/home.png")}
                style={FestivalSearchButtonBoxStyle.festivalSearchButtonIcon}            
            />
            <Text
                style={FestivalSearchButtonBoxStyle.festivalSearchButtonLabel}
            >
                {props.label}
            </Text>
        </TouchableOpacity>
    );
}