import { StyleSheet } from 'react-native';
import appStyle from '../../configs/Style.json'

export default StyleSheet.create({
    festivalSearchScreen: {
        backgroundColor : appStyle.APP_BACKGROUD_COLOR,
        height: "100%"
    },
    top: {
        shadowOffset: {
            height: 3,
        },
        shadowOpacity: 0.3,
        shadowRadius: 2,
        shadowColor: "black",
        backgroundColor: "white"
    },
    topEmpty: {
        height: 10,
        backgroundColor: "white"
    },
    topButtonBox: {
        height: 60,
        flexDirection: "row",
        backgroundColor: "#EEEEEE",
    },

    // TouchableOpacity -------------
    topButton: {
        justifyContent: "center",
        alignItems: "center"
    },
    topLeftButtonBefore: {
        flex: 4
    },
    topLeftButtonAfter: {
        flex: 5,
        backgroundColor: appStyle.APP_MAIN_COLOR,
        borderTopRightRadius: 50,
        borderBottomRightRadius: 50,
        shadowOffset: {
            width: 3,
        },
        shadowOpacity: 0.3,
        shadowRadius: 2,
        shadowColor: "black"
    },
    topRightButtonBefore: {
        flex: 4
    },
    topRightButtonAfter: {
        borderTopLeftRadius: 50,
        borderBottomLeftRadius: 50,
        backgroundColor: appStyle.APP_MAIN_COLOR,
        flex: 5,
        shadowOffset: {
            width: -3,
        },
        shadowOpacity: 0.3,
        shadowRadius: 2,
        shadowColor: "black"
    },

    // Text -----------------
    ButtonLabel: {
        fontWeight: "bold",
        fontSize: 20
    },
    ButtonLabelBefore: {
        color: "#8F8F8F",
    },
    ButtonLabelAfter: {
        color: "black"
    },

    // top_under_Searchbox-----------
    searchBox: {
        alignItems: "center"
    },
    searchButton: {
        width: "90%",
        height: 50,
        borderRadius: 50,
        backgroundColor: "#EEEEEE",
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 20,
        justifyContent: "space-between"
    },
    searchButtonLabel: {
        fontSize: 18,
        color: "darkgray"
    },
    searchImage: {
        width: 30,
        height: 30,
    }
})