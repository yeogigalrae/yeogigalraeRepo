import { createStackNavigator } from '@react-navigation/stack';
import FestivalSearchScreen from '../screens/festival/FestivalSearchScreen';
import MapScreen from '../screens/map/MapScreen';
import MainScreen from '../screens/main/MainScreen';
import CommonStyle from '../styles/common/CommonStyle';
import FestivalDetailScreen from '../screens/festival/FestivalDetailScreen';

const Stack = createStackNavigator();

export default MainStackNavigation = (props) => {
    return (
        <Stack.Navigator
            initialRouteName='main'
            screenOptions={({route}) => ({ 
                headerShown : false,
                tabBarStyle : CommonStyle.headerStyle,
                tabBarLabel: () => (
                    <Text style={{color: "black" }}>
                        {여기갈래}
                    </Text>
                )
            })}
        >
            <Stack.Screen 
                name="main" 
                component={MainScreen}
            />
            <Stack.Screen 
                name="search" 
                component={FestivalSearchScreen}
            />
            <Stack.Screen 
                name="map" 
                component={MapScreen}
            />
            <Stack.Screen 
                name="festival" 
                component={FestivalDetailScreen}
            />
        </Stack.Navigator>
    )
}