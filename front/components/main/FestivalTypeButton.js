import { View, Text, Image, TouchableOpacity } from 'react-native';
import FestivalTypeButtonBoxStyle from '../../styles/main/FestivalTypeButtonBoxStyle';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import IPConfig from '../../configs/IPConfig.json';
import useUser from '../user/UserState';

export default FestivalButtons = (props) => {
    const navigation = useNavigation();
    const currentUser = useUser(state => state.user);

    const onTypeButton = async (typeName) => {
        // typeName을 파라미터로 요청하여 해당하는 행사목록 가져오기
        try{
            const response = await axios({
                method : "get",
                url : IPConfig.IP+`festivals/search/${currentUser.user_id}/${props.name}/ALL/ALL`,
                headers : {
                    "Content-Type" : "application/json"
                },
                responseType : "json"
            })
            navigation.navigate("search", { data: response.data.festivals, top: "전체"});
        } catch(error) {
            console.log(error);
        }
    }

    return (
        <TouchableOpacity
            style={FestivalTypeButtonBoxStyle.festivalTypeButton}
            onPress={() => onTypeButton(props.name)}
        >
            <Image
                source={props.image}
                style={FestivalTypeButtonBoxStyle.buttonIcon}
            />
            <Text style={FestivalTypeButtonBoxStyle.buttonLabel}>{props.name}</Text>
        </TouchableOpacity>
    );
}