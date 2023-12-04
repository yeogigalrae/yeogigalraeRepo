import { Text, TouchableOpacity, Image } from 'react-native';
import FestivalSearchButtonBoxStyle from '../../styles/main/FestivalSearchButtonBoxStyle';
import { useNavigation } from '@react-navigation/native';

export default FestivalSearchButton = (props) => {

    const navigation = useNavigation();

    const textSearch = async () => {
        navigation.navigate("textSearch");
    }

    const mapSearch = async () => {
        navigation.navigate("map");
    }

    return (
        <TouchableOpacity
            style={FestivalSearchButtonBoxStyle.festivalSearchButton}
            onPress={() => {
                if (props.screen === "search") {
                    textSearch();
                } else {
                    mapSearch();
                }
            }}
        >
            <Image
                source={props.screen === "search" ?
                    require("../../assets/festivalSearch.png"):
                    require("../../assets/mapSearch.png")
                }
                style={FestivalSearchButtonBoxStyle.festivalSearchButtonIcon}
            />
            <Text
                style={FestivalSearchButtonBoxStyle.festivalSearchButtonLabel}
            >
                {props.label}
            </Text>
        </TouchableOpacity>
    );
}