import { StyleSheet } from "react-native"

export default StyleSheet.create({
    myInfo:{
        alignItems: "center",
    },
    profileBox : {
        margin: 10,
        borderWidth: 1,
        borderColor: "red",
        borderRadius: 20,
        flexDirection: "row",
        padding: 20
    },
    profileLeft:{
        borderWidth: 1,
        borderColor: "blue",
        borderRadius: 50,
        width: 100,
        height: 100,
        margin: 10,
        overflow: "hidden"
    },
    profileImage:{
        width:"100%",
        height: "100%",
        resizeMode: "contain",
    },
    profileRight:{
        borderWidth: 1,
        borderColor: "red",
        width: "60%",
    },
    profileName:{
        borderWidth: 1,
        borderColor: "red",
        flex:1,
        fontSize: 42,
        textAlignVertical: "center",
        paddingHorizontal: 10
    },
    profileNickName:{
        borderWidth: 1,
        borderColor: "red",
        flex:1,
        fontSize: 24,
        textAlignVertical: "center",
        paddingHorizontal: 10
    }
})