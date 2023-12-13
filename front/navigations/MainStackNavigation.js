import {Text} from "react-native";
import { createStackNavigator } from '@react-navigation/stack';
import FestivalSearchScreen from '../screens/festival/FestivalSearchScreen';
import MapScreen from '../screens/map/MapScreen';
import MainScreen from '../screens/main/MainScreen';
import CommonStyle from '../styles/common/CommonStyle';
import FestivalDetailScreen from '../screens/festival/FestivalDetailScreen';
import FestivalMapScreen from '../screens/festival/FestivalMapScreen';
import SearchScreen from "../screens/festival/SearchScreen";
import LiveChatScreen from "../screens/festival/LiveChatScreen";

const Stack = createStackNavigator();

export default MainStackNavigation = (props) => {
    return (
        <Stack.Navigator
            initialRouteName='main'
            screenOptions={({ route }) => ({
                headerShown: false,
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
                name="main"
                component={MainScreen}
                options={{
                }}
            />
            <Stack.Screen
                name="search"
                component={FestivalSearchScreen}
                options={{
                    headerShown: false
                }}
            />
            <Stack.Screen
                name="map"
                component={MapScreen}
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
                name="textSearch"
                component={SearchScreen}
            />
            <Stack.Screen
                name="liveChat"
                component={LiveChatScreen}
            />
        </Stack.Navigator>
    )
}