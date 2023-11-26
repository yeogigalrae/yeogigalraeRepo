import {
    GoogleSignin,
    GoogleSigninButton,
    statusCodes,
} from '@react-native-google-signin/google-signin';
import { useEffect, useState } from 'react';
import useUser from './UserState';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

type RootStackParamList = {
    loginSuccess: undefined;
};
// typescript에서는 이렇게 navigation을 써야한다...
// StackNavigationProp에 위에서 정의한 타입을 전달합니다.
type NavigationProp = StackNavigationProp<RootStackParamList, 'loginSuccess'>;

export default function () {
    GoogleSignin.configure({
        scopes: ['https://www.googleapis.com/auth/drive.readonly'],
        webClientId: '364841318578-s772bcki0psd5mqbugii02s8u9embc9o.apps.googleusercontent.com',
    });

    const navigation = useNavigation<NavigationProp>();

    const setUser = useUser((state) => state.setUser);
    const setIdToken = useUser((state) => state.setIdToken);
    const currentUser = useUser((state) => state.user);
    const currentIdToken = useUser((state) => state.idToken);

    // user정보가 store에 들어왔으면 작업 진행
    useEffect(() => {
        if (currentUser.name != "") {
            console.log(currentUser);
            navigation.navigate("loginSuccess");
        }
    }, [currentUser]);

    // 백엔드에 값 넘겨주고 필요한 정보만 받아서 상태관리
    const login = async (idToken: string, user: any) => {
        try {
            const response = await axios({
                method: "post",
                url: "http://10.20.60.16:3001/",
                // url : "http://localhost:3001/",
                headers: {
                    "Content-Type": "application/json"
                },
                data: {
                    idToken: idToken,
                    user: user
                },
                responseType: "json",
            })
            return response.data;
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <GoogleSigninButton
            size={GoogleSigninButton.Size.Wide}
            color={GoogleSigninButton.Color.Dark}
            onPress={async () => {
                try {
                    await GoogleSignin.hasPlayServices();
                    const { idToken, user } = await GoogleSignin.signIn();
                    if (idToken != null && user != null) {
                        const response = await login(idToken, user)
                        setIdToken(JSON.stringify(idToken))
                        setUser(response);
                    }
                } catch (error: any) {
                    if (error.code === statusCodes.SIGN_IN_CANCELLED) {
                        // user cancelled the login flow
                    } else if (error.code === statusCodes.IN_PROGRESS) {
                        // operation (e.g. sign in) is in progress already
                    } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
                        // play services not available or outdated
                    } else {
                        // some other error happened
                    }
                }
            }}
        />
    );
}
