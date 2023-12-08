import MapView, { Marker } from 'react-native-maps';
// import Geolocation from '@react-native-community/geolocation';

export default Maps = () => {
    const info = {latitude: 0, longitude: 0}

    // useEffect(() => {
    //     // watchPosition() 도 가능
    //     Geolocation.getCurrentPosition(
    //         (info) => {
    //             setMyPosition({
    //                 latitude: info.latitude,
    //                 longitude: infolongitude,
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

    function getInitialState() {
        return {
            region: {
                latitude: 37.78825,
                longitude: -122.4324,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
            },
        };
    }

    function onRegionChange(region) {
        this.setState({ region });
    }

    function render() {
        return (
            <MapView
                region={this.state.region}
                onRegionChange={this.onRegionChange}
            />
        );
    }

    return (
        <MapView
            style={{ width: "100%", height: "100%" }}
            initialRegion={{
                latitude: 35.851692,
                longitude: 128.6950183,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
            }}
            mapType="hybrid"
        // onRegionChangeComplete={region => {
        //     setLocation({
        //         latitude: region.latitude,
        //         longitude: region.longitude,
        //     });
        // }}
        >
            <Marker
                key={1}
                coordinate={{
                    latitude: 35.851692,
                    longitude: 128.6950183,
                }}
                title={"여긴어디"}
                description={"설명설명"}
            />
        </MapView>
    )
}