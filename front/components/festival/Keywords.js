import { Text, TouchableOpacity } from "react-native";
import SearchScreenStyle from "../../styles/festival/SearchScreenStyle";
import { regionKeywords, festivalCategoryKeywords } from "../../configs/SearchKeywords";
import Calendar from "./CalendarPicker";

export default Keyword = (props) => {
    var keywordList = null;
    switch (props.current) {
        case 1:
            keywordList = festivalCategoryKeywords.filter((keyword) =>
                !props.currentSelectedKeywords.includes(keyword)
            );
            break;
        case 2:
            keywordList = regionKeywords.filter((keyword) =>
                !props.currentSelectedKeywords.includes(keyword)
            );
            break;
        case 3:
            keywordList = null
            break;
    }

    if(props.current == 3){
        return(
            <Calendar
                select={props.onPress}
            />
        )
    } else {
        return (
            keywordList?.map((keyword, idx) => {
                return (
                    <TouchableOpacity
                        key={idx}
                        style={[
                            SearchScreenStyle.keyword,
                        ]}
                        onPress={() => {
                            props.onPress(keyword)
                        }}
                    >
                        <Text
                            style={SearchScreenStyle.keywordLabel}
                        >{keyword}</Text>
                    </TouchableOpacity>
                )
            })
        )
    }
}