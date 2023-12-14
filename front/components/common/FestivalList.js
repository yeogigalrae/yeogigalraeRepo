import { useEffect } from 'react';
import { TouchableOpacity, Image, Text, View, FlatList } from 'react-native';
import FestivalListStyle from '../../styles/common/FestivalListStyle';
import { useNavigation } from '@react-navigation/native';
import useFestivalStore from './FestivalStore';

export default function FestivalList({ data, isMain }) {
    const navigation = useNavigation();
    const setFestivalList = useFestivalStore((state) => state.setFestivalList);
    const festivalList = useFestivalStore((state) => state.festivalList);

    useEffect(() => {
        setFestivalList(data);
    }, [data, setFestivalList]);

    const clickFestival = (item) => {
        navigation.navigate("festival", {
            festivalInfo: festivalList.filter((currentFestival) => {
                return currentFestival == item;
            })[0]
        });
    };

    const renderItem = ({ item }) => {
        return (
            <TouchableOpacity
                style={FestivalListStyle.festivalList}
                onPress={() => clickFestival(item)}
                key={item.id}
            >
                <View
                    style={FestivalListStyle.imageBox}
                >
                    <Image
                        source={item.image ? { uri: item.image } : require('../../assets/home.png')}
                        style={FestivalListStyle.image}
                    />
                </View>
                <View style={FestivalListStyle.contentBox}>
                    <View style={FestivalListStyle.line}>
                        <Text style={FestivalListStyle.festivalSubject}>
                            {item.name}
                        </Text>
                    </View>
                    <View style={FestivalListStyle.line}>
                        <View
                            style={[
                                FestivalListStyle.secondLine,
                                { flex: 1 }
                            ]}
                        >
                            {
                                item.likestate ? (
                                    <Image
                                        source={require("../../assets/redHeart.png")}
                                        style={FestivalListStyle.icon}
                                    />
                                ) : (
                                    <Image
                                        source={require("../../assets/heart.png")}
                                        style={FestivalListStyle.icon}
                                    />
                                )
                            }
                            <Text style={FestivalListStyle.likeCount}>{item.like}</Text>
                        </View>
                        <View
                            style={[
                                FestivalListStyle.secondLine,
                                { flex: 2 }
                            ]}
                        >
                            {/* <Image
                                source={require("../../assets/views.png")}
                                style={FestivalListStyle.icon}
                            />
                            <Text style={FestivalListStyle.likeCount}>{item.views}</Text> */}
                        </View>
                    </View>
                    <View style={FestivalListStyle.line}>
                        <Text>{item.begin_date}</Text>
                        <Text> ~ </Text>
                        <Text>{item.end_date}</Text>
                    </View>
                    <View style={FestivalListStyle.line}>
                        <Text>장소 : </Text>
                        <Text>{item.place}</Text>
                    </View>
                </View>
            </TouchableOpacity>
        )
    };

    if (isMain) {
        return (
            <>
                {festivalList?.map((item) => (
                    renderItem({ item })
                ))}
            </>
        );
    } else {
        return (
            <FlatList
                data={festivalList}
                renderItem={renderItem}
                keyExtractor={(item) => String(item.id)}
            />
        );
    }
}