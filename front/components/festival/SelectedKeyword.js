import {View, Text, TouchableOpacity} from "react-native";
import SearchScreenStyle from "../../styles/festival/SearchScreenStyle";

export default SelectedKeyword = (props) => {

    return (
        props.currentSelectedKeywords?.map((keyword, idx) => {
            return(
                <View
                    key={idx}
                    style={SearchScreenStyle.selectedKeyword}
                >
                    <Text
                    >{keyword}</Text>
                    <TouchableOpacity
                        style={SearchScreenStyle.selectedCancle}
                        onPress={() => props.delete(keyword)}
                    >
                        <Text>X</Text>
                    </TouchableOpacity>
                </View>
            )
        })
    )
}