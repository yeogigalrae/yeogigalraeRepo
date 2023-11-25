import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { TouchableOpacity, Text, View, Image } from 'react-native';
import BottomTabStyle from '../styles/navigations/BottomTabStyle';
import FestivalSearchScreen from '../screens/festival/FestivalSearchScreen';
import MapScreen from '../screens/map/MapScreen';
import LikeListScreen from '../screens/user/LikeListScreen';
import MyInfoScreen from '../screens/user/MyInfoScreen';
import MainStackNavigation from './MainStackNavigation';

const Tab = createBottomTabNavigator();

export default BottomNavigation = (props) => {
    return (
        <Tab.Navigator
            initialRouteName='메인'
            screenOptions={({route}) => ({ 
                headerShown : false,
                tabBarStyle : BottomTabStyle.tapBarStyle,
                tabBarLabel: () => (
                    <Text style={{color: "black" }}>
                        {route.name}
                    </Text>
                )
            })}
        >
            <Tab.Screen 
                name="검색" 
                component={FestivalSearchScreen}
                options={{
                    tabBarIcon: () => {
                        return(
                            <Image
                                source={require('../assets/search.png')}
                                style={BottomTabStyle.icon}
                            />
                        )
                    }
                }}
            />
            <Tab.Screen 
                name="주변" 
                component={MapScreen}
                options={{
                    tabBarIcon: () => {
                        return(
                            <Image
                                source={require('../assets/map.png')}
                                style={BottomTabStyle.icon}
                            />
                        )
                    }
                }}
            />
            <Tab.Screen 
                name="메인" 
                component={MainStackNavigation}
                options={{
                    tabBarButton: ({ children, onPress, style }) => {
                        return (
                            <TouchableOpacity
                                style={[style, BottomTabStyle.main]}
                                onPress={onPress}
                            >
                                <View
                                    style={[BottomTabStyle.mainInnerBox]}    
                                >
                                    {children}
                                </View>
                            </TouchableOpacity>
                        )
                    },
                    tabBarIcon : () => {
                        return(
                            <View
                                style={BottomTabStyle.mainIconOuterBox}
                            >
                                <View
                                    style={BottomTabStyle.mainIconBox}
                                >
                                    <Image
                                        source={require('../assets/home.png')}
                                        style={BottomTabStyle.mainIcon}
                                    />
                                </View>
                            </View>
                        )
                    }
                }}
            />
            <Tab.Screen 
                name="좋아요" 
                component={LikeListScreen}
                options={{
                    tabBarIcon: () => {
                        return(
                            <Image
                                source={require('../assets/heart.png')}
                                style={BottomTabStyle.icon}
                            />
                        )
                    }
                }}
            />
            <Tab.Screen 
                name="내정보" 
                component={MyInfoScreen}
                options={{
                    tabBarIcon: () => {
                        return(
                            <Image
                                source={require('../assets/user.png')}
                                style={BottomTabStyle.icon}
                            />
                        )
                    }
                }}
            />
        </Tab.Navigator>
    );
}