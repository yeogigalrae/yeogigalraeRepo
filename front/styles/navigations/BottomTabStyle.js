import {StyleSheet} from 'react-native';
import appStyle from '../../configs/Style.json';

export default StyleSheet.create({
    main : {
        // borderColor: "blue",
        // borderWidth: 1,
    },
    mainInnerBox : {
        height: 80
    },
    mainIconOuterBox : {
        width: 80,
        height: 80,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 50,
        backgroundColor: appStyle.APP_MAIN_COLOR
    },
    mainIconBox : {
        width:60,
        height:60,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 50,
        backgroundColor: "white"
    },
    mainIcon : {
        width: 40,
        height: 40,
        marginBottom: 5
    },
    icon :{
        width: 30,
        height: 30
    },
    tapBarStyle : {
        backgroundColor: appStyle.APP_MAIN_COLOR
    }
})