import { useNavigation } from '@react-navigation/native';
import { View, Image} from 'react-native';
import MapView, { Marker, Camera } from 'react-native-maps';
// import NaverMapView, { Align, Marker} from "react-native-nmap";

export default FestivalMap = (props) => {
    const navigation = useNavigation();

    return (
        <MapView
            style={{width:"100%", height: "100%"}}
            initialRegion={{
                latitude: props.location.latitude,
                longitude: props.location.longitude,
                latitudeDelta: 0.01,
                longitudeDelta: 0.01,
            }}
            mapType="none"
            onPress={() => 
                navigation.navigate("festivalMap", {
                    location: props.location,
                    name: props.name
                }
            )}
            scrollEnabled={false}
            zoomEnabled={false}
            rotateEnabled={false}
            pitchEnabled={false}
        >
            <Marker
                key={1}
                title={props.name}
                coordinate={{
                    latitude: props.location.latitude,
                    longitude: props.location.longitude,
                }}
                tappable={false}
                >
                <Image
                    style={{width: 30, height: 30}}
                    source={require('../../../assets/marker.png')}
                />
            </Marker>
        </MapView>
    )
}
{/* <NaverMapView
    style={{ width: "100%", height: "100%" }}
    zoomControl={false}
    scrollGesturesEnabled={false}
    zoomGesturesEnabled={false}
    tiltGesturesEnabled={false}
    rotateGesturesEnabled={false}
    center={{
        zoom: 12, // 지도 확대
        latitude: props.location.latitude,
        longitude: props.location.longitude
    }}
    onMapClick={() => 
        navigation.navigate("festivalMap", {
            location: props.location,
            subject: props.subject
        }
    )}
>
    <Marker
        coordinate={{
            latitude: props.location.latitude,
            longitude: props.location.longitude,
        }}
        iconPerspectiveEnabled={true}
        isForceShowIcon={true}
        width={30}
        height={40}
        caption={{
            text: props.subject,
            textSize: 15,
            align: Align.Top,
        }}
    />
</NaverMapView> */}