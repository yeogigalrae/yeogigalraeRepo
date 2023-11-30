import { SafeAreaView, Text, View } from 'react-native';
import { NavigationContainer } from "@react-navigation/native"
import AppStackNavigation from './navigations/AppStackNavigation';

export default function App() {
  return (
    <View
      style={{ height: "100%"}}
    >
      <NavigationContainer>
        <AppStackNavigation/>
      </NavigationContainer>
    </View>
  );
}