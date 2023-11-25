import { SafeAreaView, Text, View } from 'react-native';
import BottomNavigation from './navigations/BottomNavigation';
import { NavigationContainer } from "@react-navigation/native"
import LoginScreen from './screens/user/LoginScreen';

export default function App() {
  return (
    <View
      style={{ height: "100%" }}
    >
      <SafeAreaView
      >
        {/* <LoginScreen/> */}
      </SafeAreaView>
      <NavigationContainer>
        <BottomNavigation />
      </NavigationContainer>
    </View>
  );
}