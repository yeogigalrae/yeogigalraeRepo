interface ILocation {
    latitude: number;
    longitude: number;
}

export default Imap = () => {
    const [location, setLocation] = useState < ILocation | undefined > (undefined);

    useEffect(() => {
        Geolocation.getCurrentPosition(
            position => {
                const { latitude, longitude } = position.coords;
                setLocation({
                    latitude,
                    longitude,
                });
            },
            error => {
                console.log(error.code, error.message);
            },
            { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 },
        );
    }, []);
    return (
        <Container>
            {location && (
                <MapView
                    style={{ flex: 1 }}
                    initialRegion={{
                        latitude: location.latitude,
                        longitude: location.longitude,
                        latitudeDelta: 0.0922,
                        longitudeDelta: 0.0421,
                    }}>
                    <Marker
                        coordinate={{
                            latitude: location.latitude,
                            longitude: location.longitude,
                        }}
                    />
                </MapView>
            )}
        </Container>
    );
};