import News from "../screens/News"
import Categories from '../screens/Categories'
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import Ionicons from 'react-native-vector-icons/Ionicons'
import { MaterialCommunityIcons } from '@expo/vector-icons';

const Tab = createBottomTabNavigator()

export default function TabNavigator() {
    return (
        <Tab.Navigator
        screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
              let iconName;
  
              if (route.name === 'News') {
                iconName = focused
                  ? 'newspaper'
                  : 'newspaper-outline';
              } else if (route.name === 'Categories') {
                iconName = focused ? 'list' : 'list-outline';
              }
  
              // You can return any component that you like here!
              return <Ionicons name={iconName} size={size} color={color} />;
            },
            tabBarActiveTintColor: 'tomato',
            tabBarInactiveTintColor: 'gray',
          })}
        
        >
            <Tab.Screen name="News" component={News}/>
            <Tab.Screen name="Categories" component={Categories}/>
        </Tab.Navigator>
    )
}