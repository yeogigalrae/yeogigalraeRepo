import {StyleSheet} from 'react-native';
import AppStyle from '../../configs/Style.json'

export default StyleSheet.create({
    nicknameView: {
        height: "100%",
        alignItems: "center"
    },
    nicknameBox: {
        width: "90%",
        height: 200,
        marginTop: "10%",
        borderRadius: 20,
        backgroundColor: AppStyle.APP_MAIN_COLOR,
        alignItems: "center",
        
    },
    title: {
        fontSize: 32,
        margin: 20,
        fontWeight: "bold"
    },
    inputBox: {
        backgroundColor: "white",
        borderRadius: 20,
        width: "80%",
        height: "30%",
        marginTop: 20,
        paddingHorizontal: 20,
        fontSize: 20
    },
    button: {
        width: 200,
        height: 80,
        borderRadius: 20,
        marginTop: 30,
        backgroundColor: "lightgray",
        justifyContent: "center",
        alignItems: "center"
    },
    buttonLabel: {
        fontSize: 20
    }
})