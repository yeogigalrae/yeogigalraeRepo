import { View } from 'react-native';
import NaverMapView, { Align, MapType, Marker} from "react-native-nmap"

export default FestivalMapScreen = (props) => {
    const location = props.route.params.location;
    const subject = props.route.params.subject;

    return (
        <View>
            <NaverMapView
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
            </NaverMapView>
        </View>
    )
}