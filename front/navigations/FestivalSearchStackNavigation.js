import { createStackNavigator } from '@react-navigation/stack';
import {View, Text} from 'react-native';
import FestivalSearchScreen from '../screens/festival/FestivalSearchScreen';
import CommonStyle from '../styles/common/CommonStyle';
import FestivalDetailScreen from '../screens/festival/FestivalDetailScreen';

const Stack = createStackNavigator();

export default FestivalSearchStackNavigation = (props) => {
    return (
        <Stack.Navigator
            initialRouteName='search'
            screenOptions = {{
                headerStyle: CommonStyle.headerStyle
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
        </Stack.Navigator>
    );
}