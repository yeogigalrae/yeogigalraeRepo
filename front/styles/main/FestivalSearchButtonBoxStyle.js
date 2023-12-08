import { StyleSheet } from 'react-native';
import appStyle from '../../configs/Style';

export default StyleSheet.create({
    // festivalSearchButtonBox ==============================
    festivalSearchButtonBox: {
        justifyContent: "space-evenly",
        alignItems: "center",
    },

    // festivalSearchButton ==============================
    festivalSearchButton: {
        borderColor: appStyle.APP_MAIN_COLOR,
        borderWidth: 3,
        backgroundColor: "white",
        width: "80%",
        height: 70,
        flex: 1,
        borderRadius: 10,
        margin: 5,
        alignItems: "center",
        justifyContent: "flex-start",
        flexDirection: "row",
    },
    festivalSearchButtonLabel: {
        fontWeight: "bold",
        fontSize: 20,
    },
    festivalSearchButtonIcon: {
        width: 40,
        height: 40,
        margin: 20
    }

})