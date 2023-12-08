import { Image, View, TouchableOpacity, Text, ScrollView } from 'react-native';
import FestivalDetailButtons from '../../components/festival/festivalDetail/FestivalDetailButtons';
import FestivalContent from '../../components/festival/festivalDetail/FestivalContent';
import FestivalDetailScreenStyle from '../../styles/festival/FestivalDetailScreenStyle';
import LiveChat from '../../components/festival/festivalDetail/LiveChat';
import FestivalMap from '../../components/festival/festivalDetail/FestivalMap';

export default FestivalDetailScreen = (props) => {
    const festivalInfo = props.route.params.festivalInfo;

    return (
        <ScrollView
            style={FestivalDetailScreenStyle.festivalDetail}
        >
            <View
                style={FestivalDetailScreenStyle.imageBox}
            >
                <Image
                    style={FestivalDetailScreenStyle.image}
                    source={{uri: festivalInfo.image}}
                />
            </View>
            <FestivalDetailButtons
                festivalInfo={festivalInfo}
            />
            <View
                style={FestivalDetailScreenStyle.contentBox}
            >
                <Text
                    style={FestivalDetailScreenStyle.subject}
                >{festivalInfo.name}</Text>
                <FestivalContent data={festivalInfo}/>
                <LiveChat 
                    festivalInfo={festivalInfo}
                />
                <View>
                    <Text
                        style={FestivalDetailScreenStyle.commentTitle}
                    >행사 설명</Text>
                    <Text
                        style={FestivalDetailScreenStyle.comment}
                    >{festivalInfo.description}</Text>
                </View>
                <TouchableOpacity
                    style={FestivalDetailScreenStyle.contactBox}
                >
                    <Text
                        style={FestivalDetailScreenStyle.contactTitle}
                    >문의안내</Text>
                    <Text>{festivalInfo.call}</Text>
                </TouchableOpacity>
                <View>
                    <Text
                        style={FestivalDetailScreenStyle.commentTitle}
                    >행사 장소 지도</Text>
                    <TouchableOpacity
                        style={FestivalDetailScreenStyle.map}
                    >
                        <FestivalMap
                            location={{
                                latitude: festivalInfo.latitude,
                                longitude: festivalInfo.longitude
                            }}
                            subject={festivalInfo.subject}
                        />
                    </TouchableOpacity>
                </View>
                <View>
                    <Text
                        style={FestivalDetailScreenStyle.commentTitle}
                    >URL</Text>
                    <TouchableOpacity
                        style={FestivalDetailScreenStyle.contactBox}
                    >
                        <Text
                            style={FestivalDetailScreenStyle.contactTitle}
                        >{festivalInfo.url}</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </ScrollView>
    );
}