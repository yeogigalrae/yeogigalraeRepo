import React from 'react';
import { TouchableOpacity, Image, Text, View, FlatList } from 'react-native';
import FestivalListStyle from '../../styles/common/FestivalListStyle';
import { useNavigation } from '@react-navigation/native';

export default function FestivalList({ data, isMain}) {
  const navigation = useNavigation();

  const clickFestival = (key) => {
    navigation.navigate("festival", { festivalId: key });
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={FestivalListStyle.festivalList}
      onPress={() => clickFestival(item.id)}
      key={item.id}
    >
      <View
        style={FestivalListStyle.imageBox}
      >
        <Image
          source={require("../../assets/home.png")}
          style={FestivalListStyle.image}
        />
      </View>
      <View style={FestivalListStyle.contentBox}>
        <View style={FestivalListStyle.firstLine}>
          <Text style={FestivalListStyle.festivalSubject}>
            {item.subject}
          </Text>
          <View style={FestivalListStyle.firstLine_right}>
            <Image
              source={require("../../assets/heart.png")}
              style={FestivalListStyle.likeIcon}
            />
            <Text style={FestivalListStyle.likeCount}>{item.likeCount}</Text>
          </View>
        </View>
        <View style={FestivalListStyle.secondLine}>
          <Text>{item.startDate}</Text>
          <Text> ~ </Text>
          <Text>{item.endDate}</Text>
        </View>
        <View style={FestivalListStyle.thirdLine}>
          <Text>장소 : </Text>
          <Text>{item.address}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
  
  if(isMain){
    return (
      <>
        {data.map((item) => (
          renderItem({ item })
        ))}
      </>
    );
  } else {
    return (
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => String(item.id)}
      />
    );
  }
}