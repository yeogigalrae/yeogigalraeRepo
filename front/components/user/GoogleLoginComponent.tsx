// import {
//     GoogleSignin,
//     GoogleSigninButton,
//     statusCodes,
// } from '@react-native-google-signin/google-signin';
// import { useEffect, useState } from 'react';
// import useUser from './UserState';
// import axios from 'axios';
// import { useNavigation } from '@react-navigation/native';
// import { StackNavigationProp } from '@react-navigation/stack';
// import IPConfig from '../../configs/IPConfig.json';
// import GoogleConfig from '../../configs/GoogleConfig.json';

// type RootStackParamList = {
//     loginSuccess: undefined;
//     userInfo: undefined;
// };

// export default function () {
//     GoogleSignin.configure({
//         scopes: ['https://www.googleapis.com/auth/drive.readonly'],
//         webClientId: GoogleConfig.WEB_CLIENT_ID,
//     });

//     // typescript에서는 이렇게 navigation을 써야한다...
//     // StackNavigationProp에 위에서 정의한 타입을 전달합니다.
//     const loginSuccessNavigation = useNavigation<StackNavigationProp<RootStackParamList, 'loginSuccess'>>();
//     const userInfoNavigaiton = useNavigation<StackNavigationProp<RootStackParamList, 'userInfo'>>();

//     const setUser = useUser((state) => state.setUser);
//     const setIdToken = useUser((state) => state.setIdToken);
//     const currentUser = useUser((state) => state.user);
//     const currentIdToken = useUser((state) => state.idToken);

//     // // user정보가 store에 들어왔으면 작업 진행
//     // useEffect(() => {
//     //     if (currentUser.name != "") {
//     //         console.log(currentUser);
//     //         if (currentUser.gender && currentUser.birth &&
//     //             currentUser.nickname) {
//     //             loginSuccessNavigation.navigate("loginSuccess");
//     //         } else {
//     //             userInfoNavigaiton.navigate("userInfo");
//     //         }
//     //     }
//     // }, [currentUser]);

//     // 백엔드에 값 넘겨주고 필요한 정보만 받아서 상태관리
//     const login = async (idToken: string, user: any) => {
//         try {
//             const response = await axios({
//                 method: "post",
//                 url: IPConfig.IP+"users/login",
//                 // url: IPConfig.IP,
//                 headers: {
//                     "Content-Type": "application/json"
//                 },
//                 data: {
//                     idToken: idToken,
//                     user: user
//                 },
//                 responseType: "json",
//             })
//             console.log(response.data);
//             return response.data;
//         } catch (error) {
//             console.log(error);
//         }
//     }

//     return (
//         <GoogleSigninButton
//             size={GoogleSigninButton.Size.Wide}
//             color={GoogleSigninButton.Color.Dark}
//             onPress={async () => {
//                 try {
//                     await GoogleSignin.hasPlayServices();
//                     const { idToken, user } = await GoogleSignin.signIn();
//                     if (idToken != null && user != null) {
//                         const response = await login(idToken, user)
//                         setIdToken(JSON.stringify(idToken))
//                         setUser(response);
//                         console.log(response);
//                         if(response.nickname != ""){
//                             loginSuccessNavigation.replace("loginSuccess");
//                         } else {
//                             userInfoNavigaiton.replace("userInfo");
//                         }
//                     }
//                 } catch (error: any) {
//                     if (error.code === statusCodes.SIGN_IN_CANCELLED) {
//                         // user cancelled the login flow
//                     } else if (error.code === statusCodes.IN_PROGRESS) {
//                         // operation (e.g. sign in) is in progress already
//                     } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
//                         // play services not available or outdated
//                     } else {
//                         // some other error happened
//                     }
//                 }
//             }}
//         />
//     );
// }
