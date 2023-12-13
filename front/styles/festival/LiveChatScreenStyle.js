import {StyleSheet} from "react-native";
import appStyle from '../../configs/Style.json';

export default StyleSheet.create({
    liveChat: {
        height: "100%"
    },
    liveChatArea: {
        backgroundColor: appStyle.APP_MAIN_COLOR,
        height: "90%",
    },
    liveChatInputBox: {
        backgroundColor: "white",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row",
        height: "10%",
        shadowOffset: {
            width: 0,
            height: -5
        },
        shadowOpacity: 0.2,
        shadowRadius: 5
    },
    bottomEmpty: {
        paddingBottom: 20,
        backgroundColor: appStyle.APP_MAIN_COLOR
    },
    liveChatInput: {
        borderWidth: 1,
        width: "80%",
        padding: 10,
        height: "100%",
        borderColor: appStyle.APP_MAIN_COLOR,
        backgroundColor: "white",
        flex: 5,
        fontSize: 20
    },
    liveChatInputButton: {
        justifyContent: "center",
        width: "20%",
        height: "100%",
        alignItems: "center",
        backgroundColor: appStyle.APP_MAIN_COLOR,
    },
    liveChatInputButtonImage: {
        width: 30,
        height: 30,
    },


    // Message
    messageBox: {
        maxWidth: "90%",
        minWidth: "50%",
        minHeight: 80,
        flexDirection: "row"
    },
    messageLeft: {
        borderWidth: 1,
        width: 60,
        height: 60,
        borderRadius: 50,
        overflow: "hidden",
        marginTop: 10,
        marginLeft: 10,
    },
    messageRight: {
        flex: 3,
    },
    profileImage: {
        width: "100%",
        height: "100%",
        overflow: "hidden"
    },
    nickname: {
        fontSize: 20,
        paddingTop: 20,
        paddingLeft: 10
    },
    message: {
        flexDirection: "row",
        paddingTop: 10
    },
    triangle: {
        borderColor: "white",
        borderWidth: 1,
        width: 0,
        height: 0,
        borderLeftWidth: 10,
        borderRightWidth: 10,
        borderTopWidth: 0,
        borderBottomWidth: 10,
        borderLeftColor: 'transparent',
        borderTopColor: 'transparent',
        borderBottomColor: 'transparent',
    },
    messageContentBox: {
        borderColor: "white",
        borderWidth: 1,
        minWidth: 50,
        maxWidth: 250,
        minHeight: 30,
        backgroundColor: "white",
        borderTopRightRadius: 5,
        borderBottomLeftRadius: 5,
        borderBottomRightRadius: 5,
        padding: 5
    },
})