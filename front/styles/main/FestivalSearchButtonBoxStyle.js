import {StyleSheet} from 'react-native';
import appStyle from '../../configs/Style.json';

export default StyleSheet.create({
    // festivalSearchButtonBox ==============================
    festivalSearchButtonBox : {
        justifyContent: "space-evenly",
        alignItems: "center",
    },
    
    // festivalSearchButton ==============================
    festivalSearchButton : {
        borderWidth: 1,
        width: "80%",
        height: 70,
        flex:1,
        borderRadius: 10,
        margin: 5,
        alignItems: "center",
        justifyContent: "flex-start",
        flexDirection: "row",
    },
    festivalSearchButtonLabel : {
        fontWeight: "bold",
        fontSize: 20
    },
    festivalSearchButtonIcon : {
        width: 40,
        height: 40,
        margin: 20
    }
   
})