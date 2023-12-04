import {StyleSheet} from 'react-native';
import appStyle from '../../configs/Style.json';

export default StyleSheet.create({
    map:{
        height: "100%",
        backgroundColor: appStyle.APP_BACKGROUD_COLOR
    },
    searchBox: {
        alignItems: "center",
        backgroundColor: "white",
        height: 70,
        justifyContent: "center",
        borderBottomWidth: 1
    },
    searchButton: {
        width: "90%",
        height: 50,
        borderRadius: 50,
        backgroundColor: "#EEEEEE",
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 20,
        justifyContent: "space-between"
    },
    searchButtonLabel: {
        fontSize: 18,
        color: "darkgray"
    },
    searchImage: {
        width: 30,
        height: 30,
    }
})