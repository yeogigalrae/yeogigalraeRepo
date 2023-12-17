import { Image, View, TouchableOpacity, Text, ScrollView } from 'react-native';
import FestivalDetailButtons from '../../components/festival/festivalDetail/FestivalDetailButtons';
import FestivalContent from '../../components/festival/festivalDetail/FestivalContent';
import FestivalDetailScreenStyle from '../../styles/festival/FestivalDetailScreenStyle';
import LiveChat from '../../components/festival/festivalDetail/LiveChat';
import FestivalMap from '../../components/festival/festivalDetail/FestivalMap';
import CommonStyle from '../../styles/common/CommonStyle';
import useFestivalStore from '../../components/common/FestivalStore';
import { useState } from 'react';

export default FestivalDetailScreen = (props) => {
    const festivalList = useFestivalStore(state => state.festivalList);
    const [currentFestival, setCurrentFestival] = useState(
        festivalList.find((festival) => {
            return props.route.params.festivalInfo.id == festival.id
        })
    );

    return (
        <ScrollView
            style={FestivalDetailScreenStyle.festivalDetail}
        >
            <View
                style={FestivalDetailScreenStyle.imageBox}
            >
                {
                    currentFestival.image ? (
                        <Image
                            style={FestivalDetailScreenStyle.image}
                            source={{ uri: currentFestival.image }}
                        />
                    ) : (
                        <View
                            style={CommonStyle.noListView}
                        >
                            <Image
                                source={require('../../assets/logo.png')}
                                style={CommonStyle.noListLogo}
                            />
                            <View
                                style={CommonStyle.textView}
                            >
                                <Text
                                    style={CommonStyle.noListText}
                                >이미지가 없습니다.</Text>
                            </View>
                        </View>
                    )
                }
            </View>
            <FestivalDetailButtons
                festivalInfo={currentFestival}
            />
            <View
                style={FestivalDetailScreenStyle.contentBox}
            >
                <Text
                    style={FestivalDetailScreenStyle.subject}
                >{currentFestival.name}</Text>
                <FestivalContent data={currentFestival} />
                <LiveChat
                    festivalInfo={currentFestival}
                />
                <View>
                    <Text
                        style={FestivalDetailScreenStyle.commentTitle}
                    >행사 설명</Text>
                    <Text
                        style={FestivalDetailScreenStyle.comment}
                    >{currentFestival.info}</Text>
                </View>
                <View
                    style={{ marginTop: 100 }}
                >
                    <Text
                        style={FestivalDetailScreenStyle.commentTitle}
                    >행사 내용</Text>
                    <Text
                        style={FestivalDetailScreenStyle.comment}
                    >{currentFestival.description}</Text>
                </View>
                <TouchableOpacity
                    style={FestivalDetailScreenStyle.contactBox}
                >
                    <Text
                        style={FestivalDetailScreenStyle.contactTitle}
                    >문의안내</Text>
                    <Text>{currentFestival.call}</Text>
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
                                latitude: currentFestival.latitude,
                                longitude: currentFestival.longitude
                            }}
                            name={currentFestival.name}
                        />
                    </TouchableOpacity>
                </View>
                <View
                    style={{ marginTop: 100 }}
                >
                    <Text
                        style={FestivalDetailScreenStyle.commentTitle}
                    >URL</Text>
                    <TouchableOpacity
                        style={[FestivalDetailScreenStyle.contactBox, { marginTop: 0 }]}
                    >
                        <Text
                            style={FestivalDetailScreenStyle.contactTitle}
                        >{currentFestival.url ? currentFestival.url : "URL 준비중입니다.."}</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </ScrollView>
    );
}