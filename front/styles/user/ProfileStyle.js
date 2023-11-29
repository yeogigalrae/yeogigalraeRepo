import {StyleSheet} from "react-native";
import AppStyle from "../../configs/Style.json";

export default StyleSheet.create({
    profileModifyView:{
        height: "100%",
        borderWidth: 1,
        borderColor: "red",
        alignItems: "center"
    },
    profileBox:{
        width: "90%",
        height: 500,
        marginTop: 30,
        borderRadius: 20,
        backgroundColor: AppStyle.APP_MAIN_COLOR,
        alignItems: "center",
        justifyContent: "center"
    },
    title : {
      borderWidth:1,
      borderColor: "red"  
    },
    profile: {
        backgroundColor: "white",
        width: "90%",
        height: "90%",
        borderRadius: 20
    }
})