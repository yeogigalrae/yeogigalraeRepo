import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { SafeAreaView, TouchableOpacity, Text, View, Image } from 'react-native';
import BottomTabStyle from '../styles/navigations/BottomTabStyle';
import FestivalSearchStackNavigation from './FestivalSearchStackNavigation';
import MapScreen from '../screens/map/MapScreen';
import MainStackNavigation from './MainStackNavigation';
import MyInfoStackNavigation from './MyInfoStackNavigation';
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';
import LikeStackNavigation from './LikeStackNavigation';
import CommonStyle from '../styles/common/CommonStyle';
import MapStackNavigation from './MapStackNavigation';

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
                    unmountOnBlur: true,
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
                    options={({ route }) => ({
                        tabBarIcon: () => {
                            return (
                                <Image
                                    source={require('../assets/search.png')}
                                    style={BottomTabStyle.icon}
                                />
                            )
                        },
                        tabBarStyle: ((route) => {
                            const routeName = getFocusedRouteNameFromRoute(route);
                            if (routeName === 'textSearch') {
                                return { display: "none" }
                            } else {
                                return BottomTabStyle.tapBarStyle;
                            }
                        })(route)
                    })}
                />
                <Tab.Screen
                    name="주변"
                    component={MapStackNavigation}
                    options={{
                        tabBarStyle: { display: "none" },
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
                    options={({ route }) => ({
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
                        },
                        tabBarStyle: ((route) => {
                            const routeName = getFocusedRouteNameFromRoute(route);
                            if (routeName === 'festivalMap' || routeName === "festival") {
                                return { display: "none" };
                            }
                            return BottomTabStyle.tapBarStyle;
                        })(route),
                    })}
                />
                <Tab.Screen
                    name="좋아요"
                    component={LikeStackNavigation}
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