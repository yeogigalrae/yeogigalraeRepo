import { useEffect } from "react";
import { Alert, Linking, Platform } from "react-native";
import { check, PERMISSIONS, request, RESULTS } from "react-native-permissions";

function usePermissions() {
  // 권한 관련
  // 파일명을 usePermissions.android.ts, usePermissions.ios.ts 와 같은 형식으로 디바이스별로 나누어도 되긴 한다.
  useEffect(() => {
    if (Platform.OS === "android") {
      check(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION)
        .then((result) => {
          console.log("check location", result);
          if (result === RESULTS.BLOCKED || result === RESULTS.DENIED) {
            Alert.alert(
              "이 앱은 위치 권한 허용이 필요합니다.",
              "앱 설정 화면을 열어서 항상 허용으로 바꿔주세요.",
              [
                {
                  text: "네",
                  // 여기서는 설정을 이용하지만, url 의 스킴을 이용해서 다른 앱으로 이동하는 것도 가능하다.
                  // ex) tel://01000000000 혹은 sms://01000000000
                  onPress: () => Linking.openSettings(),
                },
                {
                  text: "아니오",
                  onPress: () => console.log("No Pressed"),
                  style: "cancel",
                },
              ]
            );
          }
        })
        .catch(console.error);
    } else if (Platform.OS === "ios") {
      check(PERMISSIONS.IOS.LOCATION_ALWAYS)
        .then((result) => {
          if (result === RESULTS.BLOCKED || result === RESULTS.DENIED) {
            Alert.alert(
              "이 앱은 백그라운드 위치 권한 허용이 필요합니다.",
              "앱 설정 화면을 열어서 항상 허용으로 바꿔주세요.",
              [
                {
                  text: "네",
                  onPress: () => Linking.openSettings(),
                },
                {
                  text: "아니오",
                  onPress: () => console.log("No Pressed"),
                  style: "cancel",
                },
              ]
            );
          }
        })
        .catch(console.error);
    }
//     if (Platform.OS === "android") {
//       check(PERMISSIONS.ANDROID.CAMERA)
//         .then((result) => {
//           // GRANTED 를 넣은 이유는 ELSE 문으로 가지 않게 하기 위해서 넣었음.
//           // TODO: 사실 깔끔하게 만들기 위해서는 분리할 필요가 있음 if (alreadyGranted) return 과 같이...
//           if (result === RESULTS.DENIED || result === RESULTS.GRANTED) {
//             return request(PERMISSIONS.ANDROID.CAMERA);
//           } else {
//             console.log(result);
//             throw new Error("카메라 지원 안 함");
//           }
//         })
//         .catch(console.error);
//     } else {
//       check(PERMISSIONS.IOS.CAMERA)
//         .then((result) => {
//           if (
//             result === RESULTS.DENIED ||
//             result === RESULTS.LIMITED ||
//             result === RESULTS.GRANTED
//           ) {
//             return request(PERMISSIONS.IOS.CAMERA);
//           } else {
//             console.log(result);
//             throw new Error("카메라 지원 안 함");
//           }
//         })
//         .catch(console.error);
//     }
  }, []);
}

export default usePermissions;