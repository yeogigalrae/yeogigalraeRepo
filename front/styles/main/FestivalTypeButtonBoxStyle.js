import {StyleSheet} from 'react-native';
import appStyle from '../../configs/Style';

export default StyleSheet.create({
    // festivalTypeButtonBox ==============================
    festivalTypeButtonBox : {
        width: '100%',
        flexDirection: "row",
        alignItems: "center"
    },

    // FestivalButton ==============================

    festivalTypeButton : {
        height: 100,
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    buttonIcon : {
        width: 40,
        height: 40,
    },
    buttonLabel : {
        fontWeight: "bold",
        paddingTop: 10
    }
})