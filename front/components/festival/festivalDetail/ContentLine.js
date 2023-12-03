import {View, Text} from 'react-native';
import FestivalDetailScreenStyle from '../../../styles/festival/FestivalDetailScreenStyle';

export default ContentLine = (props) => {
    return (
        <View
            style={FestivalDetailScreenStyle.contentLine}
        >
            <Text
                style={FestivalDetailScreenStyle.contentSubject}
            >{props.subject}</Text>
            <Text
                style={FestivalDetailScreenStyle.contentContent}
            >{props.content}</Text>
        </View>
    )
}