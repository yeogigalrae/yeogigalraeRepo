import { StyleSheet } from 'react-native';
import appStyle from '../../configs/Style';

export default StyleSheet.create({
    festivalList: {
        borderWidth: 1,
        margin: 10,
        borderRadius: 20,
        backgroundColor: appStyle.APP_BACKGROUD_COLOR,
        shadowOffset: {
            height: 3,
        },
        shadowOpacity: 0.3,
        shadowRadius: 2,
        shadowColor: "black",
    },
    imageBox: {
        borderBottomWidth: 3,
        backgroundColor: "lightgray",
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20
    },
    image: {
        width: "100%",
        height: 150,
        resizeMode: "cover",
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20
    },

    // contentBox 
    contentBox: {
        padding: 10
    },
    firstLine: {
        flexDirection: "row",
        alignItems: "center"
    },
    festivalSubject: {
        fontSize: 30,
    },
    secondLine: {
        flexDirection: "row",
        alignItems: "center",
    },
    icon: {
        width: 20,
        height: 20,
        resizeMode: "contain",
        marginRight: 10
    },
    likeCount: {
        maxWidth: 50,
    },
    line: {
        flexDirection: "row",
        marginVertical: 2,
        marginHorizontal: 2,
        maxWidth: "100%",
        // overflow: "hidden"
    },
    text: {
        flex: 1
    }
})