import { StyleSheet } from "react-native"
import AppStyle from '../../configs/Style.json';

export default StyleSheet.create({
    myInfo: {
        height: "100%",
        alignItems: "center",
        backgroundColor: AppStyle.APP_BACKGROUD_COLOR
    },
    profileBox: {
        marginTop: 10,
        width: "90%",
        borderWidth: 1,
        borderRadius: 20,
        flexDirection: "row",
        padding: 30,
    },
    profileLeft: {
        borderWidth: 1,
        borderRadius: 50,
        width: 100,
        height: 100,
        marginRight: 30,
        overflow: "hidden"
    },
    profileImage: {
        width: "100%",
        height: "100%",
        resizeMode: "cover",
    },
    profileRight: {
        width: "60%",
    },
    profileName: {
        flex: 1,
        fontSize: 32,
        fontWeight: "bold",
        textAlignVertical: "center",
        paddingHorizontal: 10
    },
    profileNickName: {
        flex: 1,
        fontSize: 24,
        textAlignVertical: "center",
        paddingHorizontal: 10
    },
    myInfoMenuBox: {
        margin: 10,
        marginBottom: 0,
        borderWidth: 1,
        borderRadius: 20,
        width: "90%",
    },
    splitLine: {
        borderTopWidth: 1,
        borderTopColor: 'rgba(0, 0, 0, 0.1)',
        width: "90%",
        alignSelf: "center"
    },

    //============MyInfoMenuLine
    myInfoMenuLine: {
        justifyContent: "center",
        width: "100%",
        height: 50,
        paddingHorizontal: 20,
    },
    menuTitle: {
        fontSize: 18,
        fontWeight: "bold",
    },

    //
    alertContainer: {
        backgroundColor: 'white',
        borderRadius: 8,
        padding: 16,
    },
    alertTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 8,
        color: "red"
    },
    alertMessage: {
        fontSize: 16,
    },
})