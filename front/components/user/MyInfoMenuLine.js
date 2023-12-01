import {View, TouchableOpacity, Text} from "react-native";
import MyInfoStyle from '../../styles/user/MyInfoStyle';
import appStyle from '../../configs/Style.json';
import { useNavigation } from '@react-navigation/native';

export default MyInfoMenuLine = (props) => {
    const navigation = useNavigation();

    const clickMenu = () => {
        navigation.navigate(props.screen, {data: props.data});
    }

    if(props.isTitle){
        return(
            <View
                style={[
                    MyInfoStyle.myInfoMenuLine,
                    {
                        backgroundColor:appStyle.APP_MAIN_COLOR,
                        borderTopStartRadius: 20,
                        borderTopEndRadius: 20
                    }
                ]}
            >
                <Text
                   style={MyInfoStyle.menuTitle}
                >
                    {props.text}
                </Text>
            </View>
        )
    } else {
        return( 
            <TouchableOpacity
                style={MyInfoStyle.myInfoMenuLine}
                onPress={() => { 
                    if(props.onPress == undefined){
                        clickMenu();
                    } else {
                        props.onPress();
                    }
                }}
            >
                <Text
                    style={props.style}
                >
                    {props.text}
                </Text>
            </TouchableOpacity>
        )
    }
}