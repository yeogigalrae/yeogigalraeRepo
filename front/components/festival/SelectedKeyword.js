import {View, Text, TouchableOpacity} from "react-native";
import SearchScreenStyle from "../../styles/festival/SearchScreenStyle";

export default SelectedKeyword = (props) => {

    return (
        props.currentSelectedKeywords?.map((keyword, idx) => {
            return(
                <TouchableOpacity
                    key={idx}
                    style={SearchScreenStyle.selectedKeyword}
                    onPress={() => props.delete(keyword)}
                >
                    <Text
                    >{keyword}  X</Text>
                </TouchableOpacity>
            )
        })
    )
}