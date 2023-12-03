import { Alert, Text, View, TouchableOpacity, TextInput } from "react-native";
import SearchScreenStyle from "../../styles/festival/SearchScreenStyle";
import SearchScreenTop from "../../components/festival/SearchScreenTop";
import SearchScreenCategoryBox from "../../components/festival/SearchScreenCategoryBox";
import Keywords from "../../components/festival/Keywords";
import { useState } from "react";
import SelectedKeyword from "../../components/festival/SelectedKeyword";
import { regionKeywords, festivalCategoryKeywords } from "../../configs/SearchKeywords";
import axios from "axios";
import IPConfig from '../../configs/IPConfig.json';
import { useNavigation } from "@react-navigation/native";

export default SearchScreen = () => {
    const navigation = useNavigation();
    const [select, setSelect] = useState(1);
    const [selectedKeywords, setSelectKeyword] = useState([]);
    const [selectedDate, setSeletedDate] = useState([]);

    const selectKeyword = (keyword) => {
        if (select == 1) {
            const keywords = selectedKeywords.filter((kw) =>
                !festivalCategoryKeywords.includes(kw)
            );
            setSelectKeyword([...keywords, keyword]);
        } else if (select == 2) {
            setSelectKeyword([...selectedKeywords, keyword]);
        } else if (select == 3) {
            const keywords = selectedKeywords.filter((kw) =>
                !selectedDate.includes(kw)
            );
            setSeletedDate([keyword]);
            setSelectKeyword([...keywords, keyword]);
        }
    }

    const deleteKeyword = (keyword) => {
        const keywords = selectedKeywords.filter((kw) => kw != keyword);
        setSelectKeyword(keywords);
    }

    const textRequest = async (searchText) => {
        if(searchText != ""){
            try {
                const response = await axios({
                    method: "get",
                    url: IPConfig.IP + "festivals/" + searchText,
                    headers: {
                        "Content-Type": "application/json"
                    },
                    responseType: "json",
                })
                navigation.navigate("search", { data: response.data, top: "전체" });
            } catch (error) {
                console.log(error);
            }
        }
    }

    const keywordsRequest = async () => {
        // const query = selectedKeywords.map((value) => 
        //     `keyword=${value}`
        // ).join("&");
        if (selectedKeywords.length != 0) {
            try {
                const response = await axios({
                    method: "get",
                    url: IPConfig.IP + "festivals/" + selectedKeywords,
                    headers: {
                        "Content-Type": "application/json"
                    },
                    responseType: "json",
                })
                navigation.navigate("search", { data: response.data });
            } catch (error) {
                console.log(error);
            }
        } else {
            Alert.alert("선택된 키워드가 없습니다.", "키워드를 선택하고 진행해주세요.", [
                {
                    text: "확인",
                },
            ]);
        }
    }
    

    return (
        <View
            style={SearchScreenStyle.searchScreen}
        >
            <SearchScreenTop
                onSubmitEditing={textRequest}
            />
            <View
                style={SearchScreenStyle.titleBox}
            >
                <Text
                    style={SearchScreenStyle.title}
                >빠른 검색</Text>
                <TouchableOpacity
                    style={SearchScreenStyle.searchButton}
                    onPress={keywordsRequest}
                >
                    <Text>{"키워드로 검색"}</Text>
                </TouchableOpacity>
            </View>
            <View style={SearchScreenStyle.topEmpty} />
            <SearchScreenCategoryBox
                current={select}
                onPress={setSelect}
            />
            <View
                style={SearchScreenStyle.selectedKeywordsBox}
            >
                <SelectedKeyword
                    currentSelectedKeywords={selectedKeywords}
                    delete={deleteKeyword}
                />
            </View>
            <View
                style={SearchScreenStyle.keywordsBox}
            >
                <Keywords
                    current={select}
                    onPress={selectKeyword}
                    currentSelectedKeywords={selectedKeywords}
                />
            </View>
        </View>
    )
}