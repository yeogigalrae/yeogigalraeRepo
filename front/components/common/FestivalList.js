import React from 'react';
import { TouchableOpacity, Image, Text, View, FlatList } from 'react-native';
import FestivalListStyle from '../../styles/common/FestivalListStyle';
import { useNavigation } from '@react-navigation/native';

export default function FestivalList({ data, isMain}) {
  const navigation = useNavigation();

  const clickFestival = (item) => {
    navigation.navigate("festival", { festivalInfo : item });
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={FestivalListStyle.festivalList}
      onPress={() => clickFestival(item)}
      key={item.id}
    >
      <View
        style={FestivalListStyle.imageBox}
      >
        <Image
          source={{uri: item.image}}
          style={FestivalListStyle.image}
        />
      </View>
      <View style={FestivalListStyle.contentBox}>
        <View style={FestivalListStyle.line}>
          <Text style={FestivalListStyle.festivalSubject}>
            {item.subject}
          </Text>
        </View>
        <View style={FestivalListStyle.line}>
          <View
            style={[
              FestivalListStyle.secondLine,
              {flex: 1}
            ]}
          >
            <Image
              source={require("../../assets/heart.png")}
              style={FestivalListStyle.icon}
            />
            <Text style={FestivalListStyle.likeCount}>{item.likeCount}</Text>
          </View>
          <View
            style={[
              FestivalListStyle.secondLine,
              {flex: 2}
            ]}
          >
            <Image
              source={require("../../assets/heart.png")}
              style={FestivalListStyle.icon}
            />
            <Text style={FestivalListStyle.likeCount}>{item.views}</Text>
          </View>
        </View>
        <View style={FestivalListStyle.line}>
          <Text>{item.startDate}</Text>
          <Text> ~ </Text>
          <Text>{item.endDate}</Text>
        </View>
        <View style={FestivalListStyle.line}>
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