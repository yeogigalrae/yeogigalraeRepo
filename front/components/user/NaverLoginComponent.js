import { Image, TouchableOpacity } from 'react-native';
import NaverConfig from '../../configs/NaverConfig.json';
import NaverLogin, {
  NaverLoginResponse,
  GetProfileResponse
} from '@react-native-seoul/naver-login';
import NaverButtonImage from '../../assets/naver_login_btn.png';
import LoginStyle from '../../styles/user/LoginStyle';
import {useState} from 'react';

const consumerKey = NaverConfig.NAVER_CLIENT_ID;
const consumerSecret = NaverConfig.NAVER_CLIENT_SECRET;
const appName = 'yeogigalrae';
const serviceUrlScheme = 'yeogigalrae-callback';

NaverLogin.initialize(context, {consumerKey}, {consumerSecret}, {appName});

export default NaverLoginComponent = () => {

  const login = async () => {
    const result = await NaverLogin.login({
      appName,
      consumerKey,
      consumerSecret,
      serviceUrlScheme,
    });
    console.log(result);
  };

  return (
    <TouchableOpacity
      onPress={login}
    >
      <Image
        style={LoginStyle.naver_btn}
        source={NaverButtonImage}
      >
      </Image>
    </TouchableOpacity>
  );
}