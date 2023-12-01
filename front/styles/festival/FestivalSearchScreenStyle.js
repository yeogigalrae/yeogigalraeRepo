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
        height: "10%",
        backgroundColor: "white"
    },
    topEmpty: {
        height: "8%",
        backgroundColor: "white"
    },
    topButtonBox: {
        height: "84%",
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
    }
})