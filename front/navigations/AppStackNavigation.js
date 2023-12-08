import { createStackNavigator } from '@react-navigation/stack';
import CommonStyle from '../styles/common/CommonStyle';
import LoginScreen from '../screens/user/LoginScreen';
import BottomNavigation from './BottomNavigation';
import UserInfoScreen from '../screens/user/UserInfoScreen';
import SignUpScreen from '../screens/user/SignUpScreen';
import { Text } from 'react-native';

const Stack = createStackNavigator();

export default AppStackNavigation = (props) => {
    return (
        <Stack.Navigator
            initialRouteName='login'
            screenOptions={{
                headerShown: false
            }}
        >
            <Stack.Screen
                name='signUp'
                component={SignUpScreen}
                options={{
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
                }}
            />
            <Stack.Screen name="login" component={LoginScreen} />
            <Stack.Screen name="loginSuccess" component={BottomNavigation} />
            <Stack.Screen name="userInfo" component={UserInfoScreen} />
        </Stack.Navigator>
    );
}