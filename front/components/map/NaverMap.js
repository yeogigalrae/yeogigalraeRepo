// import Geolocation from '@react-native-community/geolocation';
import { useEffect, useState } from 'react';
import { View, Dimensions } from 'react-native';
// import NaverMapView, { Circle, Marker, Path, Polyline, Polygon } from "react-native-nmap";

export default NaverMap = () => {
    // const [myPosition, setMyPosition] = useState({latitude: 36.7998, longitude: 127.0749});
    const start = { latitude: 37.564362, longitude: 126.977011 };
    const end = { latitude: 37.565051, longitude: 126.978567 };
    const P2 = { latitude: 37.565383, longitude: 126.976292 };

    // useEffect(() => {
    //     // watchPosition() 도 가능
    //     Geolocation.getCurrentPosition(
    //         (info) => {
    //             setMyPosition({
    //                 latitude: info.coords.latitude,
    //                 longitude: info.coords.longitude,
    //             });
    //         },
    //         console.error,
    //         {
    //             enableHighAccuracy: true,
    //             timeout: 20000,
    //             // distanceFilter: 50
    //         }
    //     );
    // }, []);

    return (
        <></>
        // <NaverMapView
        //     style={{ width: "100%", height: "100%" }}
        //     zoomControl={false}
        //     center={{
        //         zoom: 15, // 지도 확대
        //         // tilt: 100, // 지도 기울기
        //         latitude: myPosition.latitude,
        //         longitude: myPosition.longitude
        //     }}
        // >
        // </NaverMapView>
    )
}
// return (
//     <NaverMapView style={{ width: '100%', height: '100%' }}
//         showsMyLocationButton={false}
//         center={{ ...P0, zoom: 16 }}
//         onTouch={e => console.warn('onTouch', JSON.stringify(e.nativeEvent))}
//         onCameraChange={e => console.warn('onCameraChange', JSON.stringify(e))}
//         onMapClick={e => console.warn('onMapClick', JSON.stringify(e))}>
//         <Marker coordinate={P0} onClick={() => console.warn('onClick! p0')} />
//         <Marker coordinate={P1} pinColor="blue" onClick={() => console.warn('onClick! p1')} />
//         <Marker coordinate={P2} pinColor="red" onClick={() => console.warn('onClick! p2')} />
//         <Path coordinates={[P0, P1]} onClick={() => console.warn('onClick! path')} width={5} />
//         <Polyline coordinates={[P1, P2]} onClick={() => console.warn('onClick! polyline')} />
//         <Circle coordinate={P0} color={"rgba(255,0,0,0.3)"} radius={100} onClick={() => console.warn('onClick! circle')} />
//         <Polygon coordinates={[P0, P1, P2]} color={`rgba(0, 0, 0, 0.5)`} onClick={() => console.warn('onClick! polygon')} />
//     </NaverMapView>
// )