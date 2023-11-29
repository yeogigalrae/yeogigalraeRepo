import { View, Text, Image, TouchableOpacity } from 'react-native';
import FestivalTypeButtonBoxStyle from '../../styles/main/FestivalTypeButtonBoxStyle';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import IPConfig from '../../configs/IPConfig.json';

export default FestivalButtons = (props) => {
    const navigation = useNavigation();

    const onTypeButton = async (typeName) => {
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
        // navigation.navigate("search", { data: response.data });
    }

    return (
        <TouchableOpacity
            style={FestivalTypeButtonBoxStyle.festivalTypeButton}
            onPress={onTypeButton}
        >
            <Image
                source={props.image}
                style={FestivalTypeButtonBoxStyle.buttonIcon}
            />
            <Text style={FestivalTypeButtonBoxStyle.buttonLabel}>{props.name}</Text>
        </TouchableOpacity>
    );
}