import { StyleSheet } from 'react-native';
import AppStyle from '../../configs/Style.json';

export default StyleSheet.create({
    userInfo: {
        height: "100%",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: AppStyle.APP_BACKGROUD_COLOR
    },
    container: {
        borderWidth: 3,
        borderColor: AppStyle.APP_MAIN_COLOR,
        width: "90%",
        height: 700,
        borderRadius: 20,
    },
    profileBox: {
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        flexDirection: "row",
        padding: 20,
        borderBottomWidth: 1,
        borderBottomColor: "lightgray"
    },
    imageBox: {
        borderWidth: 1,
        borderColor: "black",
        width: 100,
        height: 100,
        borderRadius: 50,
    },
    miniImage: {
        borderWidth: 1,
        borderColor: "black",
        borderRadius: 50,
        width: 30,
        height: 30,
        position: "absolute",
        backgroundColor: "white",
        resizeMode: "cover",
        top: 90,
        left: 85
    },
    profileLabel: {
        width: "auto",
        marginLeft: 30,
        fontSize: 32,
        textAlignVertical: "center"
    },
    addressInput: {
        fontSize: 16,
        marginVertical: 3
    },
    radioButton : {
        flexDirection: "row",
        alignItems: "center",
    },
    radioLabel : {
        fontSize: 18,
        marginBottom: 4
    },
    radioOuter : {
        borderWidth: 2,
        width: 20,
        height: 20,
        borderRadius: 50,
        marginHorizontal: 10,
        justifyContent: "center",
        alignItems: "center"
    },
    radioInner : {
        width: 10,
        height: 10,
        backgroundColor: "black",
        borderRadius: 50
    },
    radioViewOuter: {
        flexDirection: "row",
        alignItems: "center",
        width: "100%",
        justifyContent: "space-evenly"
    },
    dateTimePickerButton: {
        flexDirection: "row",
        alignItems: "baseline"
    },
    dateTimePickerBox: {
        alignItems: "center",
        flexDirection: "row",
    },
    dateText : { // 2023, 11, 10
        borderWidth: 0.3,
        backgroundColor: "white",
        fontSize: 16,
        paddingHorizontal: 10,
        paddingTop: 2,
    },
    dateLabel: { // 년, 월, 일
        fontSize: 20,
        marginLeft: 10,
    },
    submit: {
        backgroundColor: AppStyle.APP_MAIN_COLOR,
        borderRadius: 20,
        alignSelf: "center",
        marginTop: 10,
        width: 100,
        alignItems: "center",
        shadowColor: "black",
        shadowOffset: 2,
        shadowRadius: 2,
        shadowOpacity: 0.2
    },
    
    
    /// common =======
    outerBox: {
        padding: 10
    },
    label: {
        fontSize: 24,
        fontWeight: "bold",
        padding: 10
    },
    modify: {
        borderWidth: 1,
        borderColor: AppStyle.APP_MAIN_COLOR,
        padding: 10,
        borderRadius: 10
    },
    Input: {
        width: "100%",
        paddingHorizontal: 10,
        fontSize: 16
    },
    InputBottom: {
        marginLeft: 10,
        width: "90%",
        borderBottomWidth: 1,
        borderColor: 'lightgray'
    }
})