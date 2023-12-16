import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator, Image } from 'react-native';
import appStyle from '../../configs/Style.json';
import axios from 'axios';
import IPConfig from '../../configs/IPConfig.json';
import useUser from '../user/UserState';

export default Maps = (props) => {
    const [location, setLocation] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);
    const [festivalList, setFestivalList] = useState(null);
    const currentUser = useUser(state => state.user);

    const getFestivalMarkers = async (region) => {
        const { latitude, longitude, latitudeDelta, longitudeDelta } = region;

        try {
            const response = await axios({
                method: "get",
                url: IPConfig.IP + `festivals/coordinates/${latitude}/${longitude}/${latitudeDelta}/${longitudeDelta}/${currentUser.user_id}`,
                headers: { "Content-Type": "application/json" },
            })
            console.log("{Maps} : getFestivalMarkers / response.data.festivals.length = ", response.data.festivals.length);
            setFestivalList(response.data.festivals);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        (async () => {

            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                setErrorMsg('Permission to access location was denied');
                return;
            }

            let location = await Location.getCurrentPositionAsync({});
            setLocation(location);
        })();
    }, []);

    return (
        <>
            {
                location ? (
                    <MapView
                        style={{ flex: 5 }}
                        initialRegion={{
                            latitude: location.coords.latitude,
                            longitude: location.coords.longitude,
                            latitudeDelta: 0.01,
                            longitudeDelta: 0.01,
                        }}
                        mapType="none"
                        showsUserLocation={true}
                        // followsUserLocation={true} // 자동으로 내위치로 지도 이동
                        minZoomLevel={8} // 줌 축소
                        maxZoomLevel={16} // 줌 확대
                        // loadingEnabled={true}
                        loadingIndicatorColor={appStyle.APP_MAIN_COLOR}
                        onRegionChangeComplete={getFestivalMarkers}
                        onPress={() => {
                            props.setFocusedFestival(null);
                        }}
                    >
                        {
                            festivalList?.map((value, idx) => {
                                return(
                                    <Marker
                                        key={idx}
                                        title={value.name}
                                        coordinate={{
                                            latitude: value.latitude,
                                            longitude: value.longitude,
                                        }}
                                        onSelect={() => {
                                            props.setFocusedFestival(value);
                                        }}
                                    >
                                        <Image
                                            style={{ width: 30, height: 30 }}
                                            source={require("../../assets/marker.png")}
                                        />
                                    </Marker>
                                )
                            })
                        }
                    </MapView>
                ) : (
                    <View
                        style={{ justifyContent: "center", alignItems: "center", height: "80%" }}
                    >
                        <ActivityIndicator
                            size="large"
                            color={appStyle.APP_MAIN_COLOR}
                            animating={true}
                        />
                    </View>
                )
            }
        </>
    )
}