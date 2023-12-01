import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { SafeAreaView, TouchableOpacity, Text, View, Image } from 'react-native';
import BottomTabStyle from '../styles/navigations/BottomTabStyle';
import FestivalSearchStackNavigation from './FestivalSearchStackNavigation';
import MapScreen from '../screens/map/MapScreen';
import LikeListScreen from '../screens/user/LikeListScreen';
import MainStackNavigation from './MainStackNavigation';
import MyInfoStackNavigation from './MyInfoStackNavigation';
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';

const Tab = createBottomTabNavigator();

export default BottomNavigation = (props) => {
    return (
        <>
            <SafeAreaView>
            </SafeAreaView>
            <Tab.Navigator
                initialRouteName='메인'
                backBehavior='initialRoute'
                screenOptions={({ route }) => ({
                    headerShown: false,
                    tabBarStyle: BottomTabStyle.tapBarStyle,
                    tabBarLabel: () => (
                        <Text style={{ color: "black" }}>
                            {route.name}
                        </Text>
                    )
                })}
            >
                <Tab.Screen
                    name="검색"
                    component={FestivalSearchStackNavigation}
                    options={{
                        tabBarIcon: () => {
                            return (
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
                            return (
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
                        tabBarIcon: () => {
                            return (
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
                            return (
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
                    component={MyInfoStackNavigation}
                    options={({ route }) => ({
                        unmountOnBlur: true,
                        tabBarStyle: ((route) => {
                            const routeName = getFocusedRouteNameFromRoute(route);
                            if (routeName === 'userInfo') {
                                return { display: "none" };
                            }
                            return BottomTabStyle.tapBarStyle;
                        })(route),
                        tabBarIcon: () => {
                            return (
                                <Image
                                    source={require('../assets/user.png')}
                                    style={BottomTabStyle.icon}
                                />
                            )
                        },
                    })}
                />
            </Tab.Navigator>
        </>
    );
}