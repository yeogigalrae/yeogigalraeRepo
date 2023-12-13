import {Text} from "react-native";
import { createStackNavigator } from '@react-navigation/stack';
import CommonStyle from '../styles/common/CommonStyle';
import FestivalDetailScreen from '../screens/festival/FestivalDetailScreen';
import FestivalMapScreen from '../screens/festival/FestivalMapScreen';
import LikeListScreen from "../screens/user/LikeListScreen";
import LiveChatScreen from "../screens/festival/LiveChatScreen";

const Stack = createStackNavigator();

export default LikeStackNavigation = (props) => {
    return (
        <Stack.Navigator
            initialRouteName='likeList'
            screenOptions={({ route }) => ({
                tabBarStyle: CommonStyle.headerStyle,
                tabBarLabel: () => (
                    <Text style={{ color: "black" }}>
                        {여기갈래}
                    </Text>
                ),
                headerShown: true,
                headerStyle: CommonStyle.headerStyle,
                headerTintColor: "black",
                headerTitleStyle: {
                    fontWeight: "bold",
                },
                headerTitleAlign: 'center',
                headerTitle: () => (
                    <Text style={CommonStyle.headerTitle}>{"여기갈래"}</Text>
                )
            })}
        >
            <Stack.Screen
                name="likeList"
                component={LikeListScreen}
                options={{
                    headerShown: false,
                }}
            />
            <Stack.Screen
                name="festival"
                component={FestivalDetailScreen}
            />
            <Stack.Screen
                name="festivalMap"
                component={FestivalMapScreen}
            />
            <Stack.Screen
                name="liveChat"
                component={LiveChatScreen}
            />
        </Stack.Navigator>
    )
}