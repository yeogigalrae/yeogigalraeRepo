import { Image, View, TouchableOpacity, Text } from 'react-native';
// import NaverMap from '../../components/map/NaverMap';
import MapStyle from '../../styles/map/MapStyle';
import Maps from '../../components/map/Maps';
import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';

export default MapScreen = (props) => {
    const navigation = useNavigation();
    const [focusedFestival, setFocusedFestival] = useState(null);

    return (
        <View
            style={MapStyle.map}
        >
            {/* <View
                style={MapStyle.searchBox}
            >
                <TouchableOpacity
                    style={MapStyle.searchButton}
                    onPress={async() => {
                        try{
                            // const response = await axios({
                            //     method : "post",
                            //     url: IPConfig.IP + "coordinates",
                            //     headers: {"Content-Type" : "application/json"},
                            //     data : {
                            //         latitude : 35.851692,
                            //         longitude : 128.6950183
                            //     }
                            // })
                            console.log(response.data);
                        } catch (error){
                            console.log(error);
                        }
                    }}
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
            </View> */}
            <Maps setFocusedFestival={setFocusedFestival} />
            {
                focusedFestival ? (
                    <TouchableOpacity
                        style={MapStyle.bottomBox}
                        onPress={() => {
                            navigation.navigate("festival", {festivalInfo : focusedFestival});
                        }}
                    >
                        <View style={MapStyle.line}>
                            <Text style={MapStyle.festivalSubject}>
                                {focusedFestival.name}
                            </Text>
                        </View>
                        <View style={MapStyle.line}>
                            <View
                                style={[
                                    MapStyle.secondLine,
                                    { flex: 1 }
                                ]}
                            >
                                {
                                    focusedFestival.likestate ? (
                                        <Image
                                            source={require("../../assets/redHeart.png")}
                                            style={MapStyle.icon}
                                        />
                                    ) : (
                                        <Image
                                            source={require("../../assets/heart.png")}
                                            style={MapStyle.icon}
                                        />
                                    )
                                }
                                <Text style={MapStyle.likeCount}>{focusedFestival.like}</Text>
                            </View>
                            <View
                                style={[
                                    MapStyle.secondLine,
                                    { flex: 2 }
                                ]}
                            >
                                {/* <Image
                                    source={require("../../assets/views.png")}
                                    style={MapStyle.icon}
                                />
                                <Text style={MapStyle.likeCount}>{focusedFestival.views}</Text> */}
                            </View>
                        </View>
                        <View style={MapStyle.line}>
                            <Text>{focusedFestival.begin_date}</Text>
                            <Text> ~ </Text>
                            <Text>{focusedFestival.end_date}</Text>
                        </View>
                        <View style={MapStyle.line}>
                            <Text>장소 : </Text>
                            <Text>{focusedFestival.place}</Text>
                        </View>
                    </TouchableOpacity>
                ) : null
            }
        </View>
    );
}