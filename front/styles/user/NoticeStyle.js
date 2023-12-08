import { StyleSheet } from 'react-native';
import appStyle from '../../configs/Style';

export default StyleSheet.create({
    notice: {
        height: "100%",
        backgroundColor: appStyle.APP_BACKGROUD_COLOR,
        alignItems: "center",
        paddingTop: "10%"
    },
    container: {
        borderWidth: 3,
        borderColor: appStyle.APP_MAIN_COLOR,
        width: "90%",
        borderRadius: 20,
    },
    titleBox: {
        alignItems: "center",
        justifyContent: "center",
        height: 80,
        borderBottomColor: "lightgray",
        borderBottomWidth: 1,
    },
    title: {
        fontSize: 34
    },
    settingBox: {
    },
    noticeSetting: {
        paddingHorizontal: 10,
        justifyContent: "space-between",
        flexDirection: "row",
        alignItems: "center",
        height: 50,
    },
    noticeSettingLabel: {
        fontSize: 18
    },
    onNotice: {
        borderWidth: 2,
        width: 70,
        height: 30,
        borderRadius: 50,
        backgroundColor: "white",
        justifyContent: "center",
        paddingHorizontal: 2,
        alignItems: "flex-start"
    },
    offNotice: {
        borderWidth: 2,
        width: 70,
        height: 30,
        borderRadius: 50,
        backgroundColor: "gray",
        justifyContent: "center",
        paddingHorizontal: 2,
        alignItems: "flex-end"
    },
    noticeCurr: {
        width: 25,
        height: 25,
        backgroundColor: "black",
        borderRadius: 50
    },
    splitLine: {
        borderTopWidth: 1,
        borderTopColor: 'rgba(0, 0, 0, 0.1)',
        width: "90%",
        alignSelf: "center"
    },
    submit: {
        backgroundColor: appStyle.APP_MAIN_COLOR,
        borderRadius: 20,
        alignSelf: "center",
        width: 100,
        alignItems: "center",
        shadowColor: "black",
        shadowOffset: 2,
        shadowRadius: 2,
        shadowOpacity: 0.2,
        marginVertical: 10
    },
    label: {
        fontSize: 24,
        fontWeight: "bold",
        padding: 10
    },
})