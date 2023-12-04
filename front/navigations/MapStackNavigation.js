import {Text, TouchableOpacity} from "react-native";
import { createStackNavigator } from '@react-navigation/stack';
import MapScreen from '../screens/map/MapScreen';
import CommonStyle from '../styles/common/CommonStyle';
import FestivalDetailScreen from '../screens/festival/FestivalDetailScreen';

const Stack = createStackNavigator();

export default MapStackNavigation = ({navigation}) => {
    return (
        <Stack.Navigator
            initialRouteName='map'
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
                name="map"
                component={MapScreen}
                options={{
                    headerTitle: () => (
                        <TouchableOpacity
                            onPress={() => navigation.goBack()}
                        >
                            <Text style={CommonStyle.headerTitle}>{"여기갈래"}</Text>
                        </TouchableOpacity>
                    )
                }}
            />
            <Stack.Screen
                name="festival"
                component={FestivalDetailScreen}
            />
        </Stack.Navigator>
    )
}