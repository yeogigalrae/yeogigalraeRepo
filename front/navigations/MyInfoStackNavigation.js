import {Text} from "react-native";
import { createStackNavigator } from '@react-navigation/stack';
import LikeListScreen from '../screens/user/LikeListScreen';
import MyInfoScreen from '../screens/user/MyInfoScreen';
import CommonStyle from '../styles/common/CommonStyle';
import NoticeScreen from '../screens/user/NoticeScreen';
import UserInfoScreen from "../screens/user/UserInfoScreen";

const Stack = createStackNavigator();

export default MyInfoStackNavigation = () => {
    return (
        <Stack.Navigator
            initialRouteName='myInfo'
            backBehavior='initialRoute'
            screenOptions={{
                headerStyle: CommonStyle.headerStyle,
                headerTintColor: "black",
                headerTitleStyle: {
                    fontWeight: "bold",
                },
                headerTitleAlign: 'center',
                headerTitle: () => (
                    <Text style={CommonStyle.headerTitle}>{"여기갈래"}</Text>
                ),
            }}
        >
            <Stack.Screen
                name="myInfo"
                component={MyInfoScreen}
                options={{
                    headerLeft: () => null
                }}
            />
            {/* <Stack.Screen
                name="likeList"
                component={LikeListScreen}
                options={{
                }}
            /> */}
            <Stack.Screen
                name="notice"
                component={NoticeScreen}
            />
            <Stack.Screen
                name="userInfo"
                component={UserInfoScreen}
            />
        </Stack.Navigator>
    )
}