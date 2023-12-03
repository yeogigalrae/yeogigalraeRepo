import {View} from 'react-native';
import LoginStyle from '../../styles/user/LoginStyle';
import GoogleLoginComponent from '../../components/user/GoogleLoginComponent';
import NaverLoginComponent from '../../components/user/NaverLoginComponent';
import NaverLogin from '../../components/user/NaverLogin';

export default LoginScreen = (props) => {
    return (
        <View
            style={LoginStyle.main}
        >
            <GoogleLoginComponent/>
            {/* <NaverLoginComponent/> */}
            {/* <NaverLogin/> */}
        </View>
    );
}