import { createStackNavigator } from '@react-navigation/stack';
import {View, Text} from 'react-native';
import FestivalSearchScreen from '../screens/festival/FestivalSearchScreen';
import CommonStyle from '../styles/common/CommonStyle';
import FestivalDetailScreen from '../screens/festival/FestivalDetailScreen';
import SearchScreen from '../screens/festival/SearchScreen';
import LiveChatScreen from '../screens/festival/LiveChatScreen';

const Stack = createStackNavigator();

export default FestivalSearchStackNavigation = ({navigation}) => {

    return (
        <Stack.Navigator
            initialRouteName='search'
            screenOptions={{
                headerStyle: CommonStyle.headerStyle,
                headerTintColor: "black",
                headerTitleStyle: {
                    fontWeight: "bold",
                },
                headerTitleAlign: 'center',
                headerTitle: () => (
                    <Text style={CommonStyle.headerTitle}>{"여기갈래"}</Text>
                )
            }}
        >
            <Stack.Screen 
                name="search" 
                component={FestivalSearchScreen}
                options={{
                    headerShown: false
                }}
            />
            <Stack.Screen
                name="festival"
                component={FestivalDetailScreen}
            />
            <Stack.Screen
                name="textSearch"
                component={SearchScreen}
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
    );
}