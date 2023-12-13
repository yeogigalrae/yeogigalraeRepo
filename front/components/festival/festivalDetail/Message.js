import {View, Text, Image} from 'react-native';
import LiveChatStyle from '../../../styles/festival/LiveChatScreenStyle';

export default Message = (props) => {
    return(
        <View
            style={LiveChatStyle.messageBox}
        >
            <View
                style={LiveChatStyle.messageLeft}
            >
                <Image
                    style={LiveChatStyle.profileImage}
                    source={{uri : props.data.photo}}
                />  
            </View>
            <View
                style={LiveChatStyle.messageRight}
            >
                <Text
                    style={LiveChatStyle.nickname}
                >{props.data.nickname}</Text>
                <View
                    style={LiveChatStyle.message}
                >
                    <View style={LiveChatStyle.triangle}/>
                    <View
                        style={LiveChatStyle.messageContentBox}
                    >
                        <Text>{props.data.msg}</Text>
                    </View>
                </View>
            </View>
        </View>
    )
}