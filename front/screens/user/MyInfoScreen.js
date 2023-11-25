import {Image, View, Text} from 'react-native';
import MyInfoStyle from '../../styles/user/MyInfoStyle';

export default MyInfoScreen = (props) => {
    return (
        <View
            style={MyInfoStyle.myInfo}
        >
            <View
                style={MyInfoStyle.profileBox}
            >
                <View
                    style={MyInfoStyle.profileLeft}
                >
                    <Image
                        style={MyInfoStyle.profileImage}
                        source={require("../../assets/home.png")}                    
                    />
                </View>
                <View
                    style={MyInfoStyle.profileRight}                
                >
                    <Text
                        style={MyInfoStyle.profileName}
                    >이름</Text>
                    <Text
                        style={MyInfoStyle.profileNickName}
                    >닉네임</Text>
                </View>
                <View>
                    
                </View>
            </View>
        </View>
    );
}