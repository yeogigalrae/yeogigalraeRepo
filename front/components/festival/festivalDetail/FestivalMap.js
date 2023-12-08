import {View} from 'react-native';
// import NaverMapView, { Align, Marker} from "react-native-nmap";
import appStyle from '../../../configs/Style';
import { useNavigation } from '@react-navigation/native';

export default FestivalMap = (props) => {
    const navigation = useNavigation();

    return (
        <View>
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
        </View>
    )
}