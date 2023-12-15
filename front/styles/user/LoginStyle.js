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
        justifyContent: "space-evenly",
        alignItems: "center",
        paddingTop: 20
    },
    topBox: {
        borderWidth: 2,
        borderColor: appStyle.APP_MAIN_COLOR,
        width: "50%",
        height: 80,
        position: "absolute",
        alignSelf: "center",
        top: -40,
        backgroundColor: "white",
        borderRadius: 10,
        alignItems: "center",
        justifyContent: "center"
    },
    title: {
        fontSize: 36,
        fontWeight: "bold",
    },
    appIconBox: {
    },
    appIcon: {
        resizeMode: "contain",
        height: 150,
    },
    loginBox: {
        width: "90%",
    },
    inputBox: {
        borderWidth: 1,
        borderColor: appStyle.APP_MAIN_COLOR,
        padding: 10,
        borderRadius: 10,
        marginVertical: 5,
        minHeight: 50,
        maxHeight: 50,
        fontSize: 20,
    },
    inputAfter: {
        position: "absolute",
        backgroundColor: "white",
        left: 15,
        top: -3,
        paddingHorizontal: 5,
        color: appStyle.APP_MAIN_COLOR
    },
    loginButton: {
        backgroundColor: appStyle.APP_MAIN_COLOR,
        borderRadius: 10,
        justifyContent: "center",
        alignItems: "center",
        height: 50,
        marginTop: 5
    },
    loginButtonLabel: {
        fontSize: 20
    },
    signUpButton: {
        alignItems: "center",
        marginTop: 20,
        alignSelf: "center"
    },
    signUpLabel: {
        color: "gray",
        fontSize: 20
    },
    LabelUnder: {
        borderBottomColor: "gray",
        borderBottomWidth: 1,
        width: 70
    }
})