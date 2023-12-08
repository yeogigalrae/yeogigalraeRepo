import { StyleSheet } from 'react-native';
import appStyle from '../../configs/Style';

export default styles = StyleSheet.create({
    main: {
        height: '100%',
        backgroundColor: appStyle.APP_BACKGROUD_COLOR,
        justifyContent: "center",
        alignItems: "center"
    },
    container: {
        borderWidth: 2,
        borderColor: appStyle.APP_MAIN_COLOR,
        borderRadius: 10,
        width: "90%",
        height: "90%",
        justifyContent: "space-around",
        alignItems: "center"
    },
    topBox: {
        width: "50%",
        height: 80,
        alignSelf: "center",
        alignItems: "center",
        justifyContent: "center"
    },
    title: {
        fontSize: 36,
        fontWeight: "bold",
    },
    signUpBox: {
        width: "90%",
        position: "relative"
    },
    inputBox: {
        borderWidth: 1,
        borderColor: appStyle.APP_MAIN_COLOR,
        padding: 10,
        borderRadius: 10,
        marginVertical: 5,
        minHeight: 50,
        maxHeight: 50,
        justifyContent: "center",
        fontSize: 20,
    },
    idCheckButton: {
        backgroundColor: appStyle.APP_MAIN_COLOR,
        borderRadius: 5,
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: 5,
    },
    inputAfter: {
        position: "absolute",
        backgroundColor: "white",
        left: 10,
        top: -8,
        paddingHorizontal: 5,
        color: appStyle.APP_MAIN_COLOR
    },
    signUpButton: {
        backgroundColor: appStyle.APP_MAIN_COLOR,
        borderRadius: 10,
        justifyContent: "center",
        alignItems: "center",
        height: 50,
        marginTop: 5
    },
    signUpButtonLabel: {
        fontSize: 20
    },
    checkIcon: {
        width: 40,
        height: 40
    },
    retry : {
        borderColor :"red"
    }
})