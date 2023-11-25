import {View} from 'react-native';
import LoginStyle from '../../styles/user/LoginStyle';
// import NaverLoginComponent from '../../components/user/NaverLoginComponent';
import GoogleLoginComponent from '../../components/user/GoogleLoginComponent';

export default LoginScreen = (props) => {
    return (
        <View
            style={LoginStyle.main}
        >
            <GoogleLoginComponent/>
            {/* <NaverLoginComponent/> */}
        </View>
    );
}