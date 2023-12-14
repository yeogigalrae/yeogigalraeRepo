import {StyleSheet} from 'react-native';
import appStyle from '../../configs/Style';

export default StyleSheet.create({
    map:{
        height: "100%",
        backgroundColor: appStyle.APP_BACKGROUD_COLOR
    },
    searchBox: {
        alignItems: "center",
        backgroundColor: "white",
        height: "10%",
        justifyContent: "center",
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
    },

    bottomBox : {
        borderTopWidth : 1,
        width: "100%",
        padding: 10,
        position: "absolute",
        bottom: 0,
        backgroundColor: "white"
    },
    firstLine : {
        flexDirection: "row",
        alignItems: "center"
    },
    festivalSubject : {
        fontSize: 30,
    },
    secondLine: {
        flexDirection: "row",
        alignItems: "center",
    },
    icon : {
        width: 20,
        height: 20,
        resizeMode: "contain",
        marginRight: 10
    },
    likeCount : {
        maxWidth: 50,
    },
    line : {
        flexDirection: "row",
        marginVertical: 2,
        marginHorizontal: 2
    }
    
})