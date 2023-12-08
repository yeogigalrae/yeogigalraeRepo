import {Text, View, TouchableOpacity} from "react-native";
import SearchScreenStyle from "../../styles/festival/SearchScreenStyle";

export default SearchScreenCategoryBox = (props) => {

    return (
        <View
            style={SearchScreenStyle.categoryBox}
        >
            <TouchableOpacity
                style={[
                    SearchScreenStyle.categoryButton,
                    props.current == 1 ? SearchScreenStyle.selectedButton : { borderRightWidth: 1, borderRightColor: "lightgray" }
                ]}
                onPress={() => {
                    props.onPress(1);
                }}
            >
                <Text
                    style={SearchScreenStyle.categoryButtonLabel}
                >분류</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={[
                    SearchScreenStyle.categoryButton,
                    props.current == 2 ? SearchScreenStyle.selectedButton : { borderRightWidth: 1, borderRightColor: "lightgray" }
                ]}
                onPress={() => {
                    props.onPress(2);
                }}
            >
                <Text
                    style={SearchScreenStyle.categoryButtonLabel}
                >지역</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={[
                    SearchScreenStyle.categoryButton,
                    props.current == 3 ? SearchScreenStyle.selectedButton : null
                ]}
                onPress={() => {
                    props.onPress(3);
                }}
            >
                <Text
                    style={SearchScreenStyle.categoryButtonLabel}
                >날짜</Text>
            </TouchableOpacity>
        </View>
    )
}