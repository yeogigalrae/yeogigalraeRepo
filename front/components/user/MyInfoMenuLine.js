import {View, TouchableOpacity, Text} from "react-native";
import MyInfoStyle from '../../styles/user/MyInfoStyle';
import appStyle from '../../configs/Style.json';

export default MyInfoMenuLine = (props) => {

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