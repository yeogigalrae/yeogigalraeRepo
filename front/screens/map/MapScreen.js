import { Image, View, TouchableOpacity, Text } from 'react-native';
import NaverMap from '../../components/map/NaverMap';
import MapStyle from '../../styles/map/MapStyle';
import Maps from '../../components/map/Maps';

export default MapScreen = (props) => {
    return (
        <View
            style={MapStyle.map}
        >
            <View
                style={MapStyle.searchBox}
            >
                <TouchableOpacity
                    style={MapStyle.searchButton}
                >
                    <Text
                        style={MapStyle.searchButtonLabel}
                    >어떤 행사를 갈까요?</Text>
                    <Image
                        style={MapStyle.searchImage}
                        source={require("../../assets/search.png")}
                    >
                    </Image>
                </TouchableOpacity>
            </View>
            {/* <NaverMap/> */}
            <Maps/>
        </View>
    );
}