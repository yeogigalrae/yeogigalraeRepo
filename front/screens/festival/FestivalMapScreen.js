import { View, Image } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import appStyle from "../../configs/Style.json";
// import NaverMapView, { Align, MapType, Marker} from "react-native-nmap"

export default FestivalMapScreen = (props) => {
    const location = props.route.params.location;
    const name = props.route.params.name;

    return (
        <View>
            <MapView
                style={{ width: "100%", height: "100%" }}
                initialRegion={{
                    latitude: location.latitude,
                    longitude: location.longitude,
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
                showsMyLocationButton={false} // 뭔지 모르겠음
                minZoomLevel={8} // 줌 축소
                maxZoomLevel={16} // 줌 확대
                loadingEnabled={true}
                loadingIndicatorColor={appStyle.APP_MAIN_COLOR}
            >
                <Marker
                    title={name}
                    coordinate={{
                        latitude: location.latitude,
                        longitude: location.longitude,
                    }}
                >
                    <Image
                        style={{ width: 30, height: 30 }}
                        source={require('../../assets/marker.png')}
                    />
                </Marker>
            </MapView>
            {/* <NaverMapView
                style={{ width: "100%", height: "100%" }}
                center={{
                    zoom: 16, // 지도 확대
                    latitude: location.latitude,
                    longitude: location.longitude
                }}
                mapType={MapType.Terrain}
                zoomControl={true}
                minZoomLevel={8}
                maxZoomLevel={17}
                scaleBar={true}
            >
                <Marker
                    coordinate={{
                        latitude: location.latitude,
                        longitude: location.longitude,
                    }}
                    isForceShowIcon={true}
                    caption={{
                        text: subject,
                        textSize: 20,
                        align: Align.Top,
                        haloColor: "#00FF00",
                    }}
                    flat={true}
                />
            </NaverMapView> */}
        </View>
    )
}