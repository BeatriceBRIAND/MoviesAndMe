// App.js
 
import * as React from 'react';
import { Button, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { Provider } from 'react-redux'; 


//Components
 
import Search from './Components/Search'
import FilmDetail from './Components/FilmDetail'
import Store from './Store/configureStore'
import Favorites from './Components/Favorites';



const HomeStack = createStackNavigator();
function HomeStackScreen() {
 return (
   <HomeStack.Navigator>
    <HomeStack.Screen name="Rechercher" component={Search} />     
	<HomeStack.Screen name="Detail" component={FilmDetail} />
   </HomeStack.Navigator>
  );
}

const FavoriteStack = createStackNavigator();
function FavoriteStackScreen() {
  return(
    <FavoriteStack.Navigator>
      <FavoriteStack.Screen name="Favoris" component={Favorites} />
    </FavoriteStack.Navigator>
  );
}

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
	<Provider store={Store}>
      <Tab.Navigator
       screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
         let iconName;
         if (route.name === 'Rechercher') {
            iconName = focused
            ? 'md-search'
            : 'md-search-outline';
          } else if (route.name === 'Favoris') {
            iconName = focused
            ? 'md-heart'
            : 'md-heart-outline';
          }
    
     return <Ionicons name={iconName} size={size} color={color}     />;
       },
    })}
 tabBarOptions={{
      activeBackgroundColor: '#DDDDDD', // Couleur d'arrière-plan de l'onglet sélectionné
      inactiveBackgroundColor: '#FFFFFF', // Couleur d'arrière-plan des onglets non sélectionnés
      showLabel: false, // On masque les titres
      showIcon: true // On informe le TabNavigator qu'on souhaite afficher les icônes définis
    }}>

        <Tab.Screen name="Rechercher" component={HomeStackScreen} />
        <Tab.Screen name="Favoris" component={FavoriteStackScreen} />
        
      </Tab.Navigator>
	  </Provider>
    </NavigationContainer>
  );
}


