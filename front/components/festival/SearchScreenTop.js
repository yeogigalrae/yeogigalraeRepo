import { Image, View, TouchableOpacity, TextInput, Keyboard } from "react-native";
import SearchScreenStyle from "../../styles/festival/SearchScreenStyle";
import { useState } from "react";

export default SearchScreenTop = (props) => {
    const [searchText, setSearchText] = useState("");

    return (
        <View
            style={SearchScreenStyle.searchBoxOutter}
        >
            <View style={SearchScreenStyle.topEmpty} />
            <View
                style={SearchScreenStyle.searchBoxInner}
            >
                <View
                    style={SearchScreenStyle.searchBoxLeft}
                >
                    <TextInput
                        style={SearchScreenStyle.searchInput}
                        placeholder="어떤 행사를 갈까요?"
                        onChangeText={(value) => setSearchText(value)}
                        value={searchText}
                        onSubmitEditing={() => {
                            props.onSubmitEditing(searchText);
                            setSearchText("");
                            Keyboard.dismiss();
                        }}
                    >
                    </TextInput>
                </View>
                <View
                    style={SearchScreenStyle.searchBoxRight}
                >
                    <Image
                        style={SearchScreenStyle.searchImage}
                        source={require("../../assets/search.png")}
                    />
                </View>
            </View>
            <View style={SearchScreenStyle.topEmpty} />
        </View>
    )
}