import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator, Image } from 'react-native';
import appStyle from '../../configs/Style.json';
import axios from 'axios';
import IPConfig from '../../configs/IPConfig.json';

export default Maps = () => {
    const [location, setLocation] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);
    const [currentCoords, setCurrentCoords] = useState(location?.coords);

    const handleRegionChangeComplete = (region) => {
        const { latitude, longitude, latitudeDelta, longitudeDelta } = region;
        console.log('Latitude:', latitude);
        console.log('Longitude:', longitude);
        console.log('Latitude Delta:', latitudeDelta);
        console.log('Longitude Delta:', longitudeDelta);
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

    const getFestivalMarker = async (latitude, longitude) => {
        try {
            const response = await axios({
                method: "get",
                url: IPConfig.IP + `coordinates/${latitude}/${longitude}`,
                headers: { "Content-Type": "application/json" },
            })
            console.log("{Maps} : getFestivalMarker / response.data = ", response.data);
        } catch (error) {
            console.log(error);
        }
    }

    let text = 'Waiting..';
    if (errorMsg) {
        text = errorMsg;
    } else if (location) {
        getFestivalMarker(location.coords.latitude, location.coords.longitude);
    }

    return (
        <>
            {
                location ? (
                    <MapView
                        style={{ width: "100%", height: "90%" }}
                        initialRegion={{
                            latitude: location.coords.latitude,
                            longitude: location.coords.longitude,
                            latitudeDelta: 0.01,
                            longitudeDelta: 0.01,
                        }}
                        mapType="none"
                        showsUserLocation={true}
                        follwsUserLocation={() => {
                            if (currentCoords) {

                            }
                        }}
                        // followsUserLocation={true} // 자동으로 내위치로 지도 이동
                        // minZoomLevel={8} // 줌 축소
                        maxZoomLevel={16} // 줌 확대
                        // loadingEnabled={true}
                        loadingIndicatorColor={appStyle.APP_MAIN_COLOR}
                        // onRegionChangeComplete={handleRegionChangeComplete}
                    >
                        <Marker
                            title={"여기갈래"}
                            description='설명설명'
                            coordinate={{
                                latitude: location.coords.latitude,
                                longitude: location.coords.longitude,
                            }}
                        >
                            <Image
                                style={{ width: 30, height: 30 }}
                                source={require("../../assets/marker.png")}
                            />
                        </Marker>
                        <Marker
                            icon={require('../../assets/home.png')}
                            title={"여기갈래"}
                            description='설명설명'
                            coordinate={{
                                latitude: location.coords.latitude + 0.001,
                                longitude: location.coords.longitude + 0.001,
                            }}
                            callout={{ permanent: true }}
                        >
                            <Image
                                style={{ width: 30, height: 30 }}
                                source={require("../../assets/marker.png")}
                            />
                        </Marker>
                        {/* <Marker
                            key={1}
                            coordinate={{
                                latitude: location.coords.latitude,
                                longitude: location.coords.longitude,
                            }}
                            title={"여긴어디"}
                            description={"설명설명"}
                        /> */}
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