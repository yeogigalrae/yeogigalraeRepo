import { StyleSheet } from "react-native";
import appStyle from '../../configs/Style.json';

export default StyleSheet.create({
    searchScreen: {
        height: "100%",
        backgroundColor: appStyle.APP_BACKGROUD_COLOR
    },
    titleBox: {
        height: 50,
        borderTopWidth: 1,
        borderTopColor: "lightgray",
        justifyContent: "space-between",
        alignItems: "flex-end",
        paddingHorizontal: 20,
        flexDirection: "row"
    },
    title: {
        fontSize: 24,
        marginBottom: 8
    },
    searchButton: {
        borderRadius: 5,
        width: 100,
        height: 40,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: appStyle.APP_MAIN_COLOR
    },
    selectedKeywordsBox: {
        minHeight: 40,
        flexDirection: "row",
        justifyContent: "flex-start",
        flexWrap: "wrap"
    },
    keywordsBox : {
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "center",
    },


    // Keyword
    keyword: {
        borderWidth: 4,
        borderColor: appStyle.APP_MAIN_COLOR,
        flex: 1,
        margin: 10,
        minWidth: 70,
        maxWidth: 140,
        alignItems: "center",
        height: 40,
        justifyContent: "center",
        borderRadius: 10
    },
    keywordLabel:{
        fontSize: 18
    },


    // SelectedKeyword
    selectedKeyword: {
        backgroundColor: appStyle.APP_MAIN_COLOR,
        margin: 10,
        paddingHorizontal: 10,
        borderRadius: 50,
        flexDirection: "row",
        alignItems: "center",
        paddingBottom: 2
    },
    selectedCancle: {
        marginLeft: 5,
        paddingTop: 2
    },


    // SearchScreenTop
    searchBoxOutter: {
        alignItems: "center"
    },
    searchBoxInner: {
        alignItems: "center",
        flexDirection: "row",
        width: "90%",
        height: 50,
        borderRadius: 50,
        backgroundColor: "#EEEEEE",
        justifyContent: "space-between",
        paddingHorizontal: 20,
    },
    searchBoxLeft: {
        flex: 1
    },
    searchInput: {
    },
    searchBoxRight: {
    },
    searchImage: {
        resizeMode: "cover",
        width: 30,
        height: 30,
    },
    topEmpty: {
        height: 10,
        backgroundColor: "white"
    },


    // SearchScreenCategoryBox
    categoryBox: {
        height: 70,
        flexDirection: "row",
        backgroundColor: "#EEEEEE"
    },
    categoryButton: {
        borderBottomWidth: 2,
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    selectedButton: {
        backgroundColor: appStyle.APP_MAIN_COLOR,
        borderColor: "black",
        borderWidth: 2,
        borderRightWidth: 2,
        borderBottomWidth: 0,
    },
    categoryButtonLabel: {
        fontSize: 24
    },


})