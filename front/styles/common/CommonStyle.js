import {StyleSheet} from 'react-native';
import appStyle from '../../configs/Style';

export default StyleSheet.create({
    headerStyle : {
        backgroundColor : appStyle.APP_MAIN_COLOR
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: "bold",
    },
    noListView: {
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
        position: "relative"
    },
    noListLogo : {
        width: 200,
        height: 200,
        opacity: 0.3
    },
    textView:{
        justifyContent: "center",
        alignItems: "center",
        position: "absolute",
    },
    noListText : {
        fontSize: 24,
        color: "gray"
    },
    noListTextSub: {
        fontSize: 14,
        color: "gray",
        margin: 10
    }
})