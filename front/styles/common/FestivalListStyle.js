import {StyleSheet} from 'react-native';
import appStyle from '../../configs/Style.json';

export default StyleSheet.create({
    festivalList : {
        borderWidth: 1,
        margin: 10,
        borderRadius: 20
    },
    imageBox: {
        borderBottomWidth: 3,
    },
    image : {
        width: "100%",
        height: 150,
        resizeMode: "contain",
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
        maxWidth: 250,
    },
    firstLine_right: {
        flexDirection: "row",
        alignItems: "center",
    },
    likeIcon : {
        width: 20,
        height: 20,
        resizeMode: "contain",
        marginLeft: 10,
        marginRight: 10
    },
    likeCount : {
        maxWidth: 50,
    },
    secondLine : {
        flexDirection: "row",
        marginTop: 2,
        marginBottom: 2
    },
    thirdLine : {
        flexDirection: "row",
    }
})