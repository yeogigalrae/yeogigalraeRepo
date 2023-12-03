import {StyleSheet} from 'react-native';
import appStyle from '../../configs/Style.json';

export default StyleSheet.create({
    festivalList : {
        borderWidth: 1,
        margin: 10,
        borderRadius: 20,
        backgroundColor: appStyle.APP_BACKGROUD_COLOR,
    },
    imageBox: {
        borderBottomWidth: 3,
    },
    image : {
        width: "100%",
        height: 150,
        resizeMode: "cover",
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20
    },

    // contentBox 
    contentBox : {
        padding: 10
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