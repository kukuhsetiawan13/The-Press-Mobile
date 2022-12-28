import { StatusBar } from 'expo-status-bar';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import client from './config';
import { StyleSheet, Text, View } from 'react-native';
import Navbar from './components/Navbar';
import Toast from 'react-native-toast-message';
import FilteredNews from './screens/FilteredNews';
import NewsDetails from './screens/NewsDetails'
import TabNavigator from './navigators/TabNavigator';


import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator()

export default function App() {
  return (
    <ApolloProvider client={client}>
      <NavigationContainer>
        <View style={styles.container}>
          <Navbar/>
          <Stack.Navigator>
            <Stack.Screen name="Home" options={{ headerShown: false }} component={TabNavigator}/>
            <Stack.Screen name="News by Filter" component={FilteredNews} options={({route}) => ({title: route.params.categoryName}) }/>
            <Stack.Screen name="NewsDetails" component={NewsDetails} options={{title: 'News Details'}}/>
          </Stack.Navigator>
          <Toast />
        </View>
      </NavigationContainer>
    </ApolloProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 50,
    flex: 1,
    backgroundColor: '#fff',
  },
});
