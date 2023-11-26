import { createStackNavigator } from '@react-navigation/stack';
import CommonStyle from '../styles/common/CommonStyle';
import LoginScreen from '../screens/user/LoginScreen';
import BottomNavigation from './BottomNavigation';

const Stack = createStackNavigator();

export default AppStackNavigation = (props) => {
    return (
        <Stack.Navigator
            initialRouteName='login'
            screenOptions = {{
                headerShown: false
            }}
        >
            <Stack.Screen name="login" component={LoginScreen}/>
            <Stack.Screen name="loginSuccess" component={BottomNavigation}/>
        </Stack.Navigator>
    );
}