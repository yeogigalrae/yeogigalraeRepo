import { createStackNavigator } from '@react-navigation/stack';
import {View, Text} from 'react-native';
import FestivalSearchScreen from '../screens/festival/FestivalSearchScreen';
import CommonStyle from '../styles/common/CommonStyle';

const Stack = createStackNavigator();

export default FestivalSearchScreen = (props) => {
    return (
        <Stack.Navigator
            initialRouteName='search'
            screenOptions = {{
                headerStyle: CommonStyle.headerStyle
            }}
        >
            <Stack.Screen name="search" component={FestivalSearchScreen}/>
        </Stack.Navigator>
    );
}