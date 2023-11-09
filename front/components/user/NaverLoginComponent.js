import { Image, TouchableOpacity } from 'react-native';
import NaverConfig from '../../configs/NaverConfig.json';
import NaverLogin from '@react-native-seoul/naver-login';
import NaverButtonImage from '../../assets/naver_login_btn.png';
import LoginStyle from '../../styles/user/LoginStyle';

const iosKeys = {
    kConsumerKey: NaverConfig.NAVER_CLIENT_ID,
    kConsumerSecret: NaverConfig.NAVER_CLIENT_SECRET,
    kServiceAppName: "yeogigalrae",
    kServiceAppUrlScheme: "yeogigalrae-callback" // only for iOS
};

const androidKeys = {
    kConsumerKey: NaverConfig.NAVER_CLIENT_ID,
    kConsumerSecret: NaverConfig.NAVER_CLIENT_SECRET,
    kServiceAppName: "yeogigalrae"
};

const initials = Platform.OS === "ios" ? iosKeys : androidKeys;

export default NaverLoginComponent = () => {
    const naverLogin = props => {
        return new Promise((resolve, reject) => {
            NaverLogin.login(props, (err, token) => {
                console.log(`\n\n  Token is fetched  :: ${token} \n\n`);
                setNaverToken(token);
                if (err) {
                    reject(err);
                    return;
                }
                resolve(token);
            });
        });
    };

    return (
        <TouchableOpacity
            onPress={() => naverLogin(initials)}
        >
            <Image
                style={LoginStyle.naver_btn}
                source={NaverButtonImage}
            >
            </Image>
        </TouchableOpacity>
    );
}