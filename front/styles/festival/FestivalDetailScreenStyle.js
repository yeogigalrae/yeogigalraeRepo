import {StyleSheet} from "react-native";
import appStyle from "../../configs/Style.json";

export default StyleSheet.create({
    festivalDetail: {
        backgroundColor: appStyle.APP_BACKGROUD_COLOR,
    },
    imageBox : {
        height: 200,
        backgroundColor: "lightgray"
    },
    image : {
        resizeMode: "cover",
        width: "100%",
        height: "100%"
    },
    contentBox: {
        paddingBottom: 100
    },
    subject: {
        fontSize: 32,
        padding: 5
    },
    commentTitle: {
        padding: 5,
        fontSize: 24,
    },
    comment: {
        padding: 5,
        fontSize: 16
    },
    contactBox: {
        marginVertical: 20,
        height: 50,
        borderRadius: 10,
        backgroundColor: appStyle.APP_MAIN_COLOR,
        justifyContent: "space-evenly",
        alignItems: "center",
        flexDirection: "row"
    },
    contactTitle: {
        fontWeight: "bold",
        fontSize: 18
    },
    map: {
        borderTopWidth: 1,
        borderBottomWidth: 1,
        height: 200,
        marginBottom: 20
    },


    // FestivalDetailButtons
    buttonBox: {
        height: 60,
        flexDirection: "row",
        borderBottomWidth: 1
    },
    button : {
        flex: 1,
        justifyContent: "space-evenly",
        alignItems: "center",
        flexDirection: "row"
    },
    buttonImage: {
        width: 40,
        height: 40
    },
    likeButtonBox:{
    },
    buttonLabel: {
        fontSize: 18
    },


    // FestivalContent
    content : {
    },


    // ContentLine
    contentLine: {
        flexDirection: "row",
        padding: 5,
    },
    contentSubject: {
        fontSize: 18,
        color: "gray",
        minWidth: 120,
        borderRightColor: "lightgray",
        borderRightWidth: 1
    },
    contentContent: {
        fontSize: 14,
        marginLeft: 10,
        flexWrap: "wrap",
        maxWidth: 300
    },

    // LiveChat
    liveChatBox: {
        paddingVertical: 20,
        borderBottomWidth: 1,
        borderTopWidth: 1,
        marginVertical: 10
    },
    liveChatButton: {
        flexDirection: "row",
        width: "auto",
    },
    liveChatLabel: {
        fontSize: 18,
        padding: 5,
    },
    liveChatStateBox: {
        width: 80,
        borderRadius: 10,
        flexDirection: "row",
        justifyContent: "space-evenly",
        alignItems: "center",
        backgroundColor: appStyle.APP_MAIN_COLOR
    },
    liveChatOnState: {
        width: 10,
        height: 10,
        borderRadius: 50,
        backgroundColor: "#00FF0A"
    },
    liveChatOffState: {
        width: 10,
        height: 10,
        borderRadius: 50,
        backgroundColor: "red"
    }
})