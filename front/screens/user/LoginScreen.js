import {View} from 'react-native';
import LoginStyle from '../../styles/user/LoginStyle';
import NaverLoginComponent from '../../components/user/NaverLoginComponent';

export default LoginScreen = (props) => {
    return (
        <View
            style={LoginStyle.main}
        >
            <NaverLoginComponent/>
        </View>
    );
}