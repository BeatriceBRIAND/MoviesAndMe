// App.js
 
import * as React from 'react';
import {  Share, ShareSheet } from 'react-native';
import { Icon } from 'native-base';
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
import Test from './Components/Test';
import { render } from 'react-dom';
import persistStore from 'redux-persist/es/persistStore';
import { PersistGate } from 'redux-persist/integration/react';
import News from './Components/News';



function ActionBarIcon() {
  const onShare = async () => {
    try {
      const result = await Share.share({message: 'Ceci est le partage de votre film préféré'});
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      alert(error.message);
    }
  };
    return (
      <Icon name={'ios-share-outline'} onPress={onShare}/>      
    );
  };
    


const HomeStack = createStackNavigator();
function HomeStackScreen() {
 return (
   <HomeStack.Navigator>
    <HomeStack.Screen name="Rechercher" component={Search} />     
	  <HomeStack.Screen name="Detail" component={FilmDetail} options={{
      headerRight:  props => <ActionBarIcon {...props} /> }} />
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

const TestStack = createStackNavigator();
function TestStackScreen() {
  return(
    <TestStack.Navigator>
      <TestStack.Screen name="Test" component={Test} />
    </TestStack.Navigator>
  );
}

const NewsStack = createStackNavigator();
function NewsStackScreen() {
  return(
    <NewsStack.Navigator>
      <NewsStack.Screen name="Les Derniers Films" component={News} />
      <NewsStack.Screen name="Detail" component={FilmDetail} options={{
      headerRight:  props => <ActionBarIcon {...props} /> }} />
    </NewsStack.Navigator>
  );
}

const Tab = createBottomTabNavigator();

export default class App extends React.Component {
  render() {
    let persistor = persistStore(Store)
  return (
    <NavigationContainer>
	<Provider store={Store}>
    <PersistGate loading={null} persistor={persistor}>
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
          } else if (route.name === 'Test') {
            iconName = focused
            ? 'ios-camera'
            : 'ios-camera-outline';
          } else if (route.name === 'Les Derniers Films') {
            iconName = focused
            ? 'ios-notifications'
            : 'ios-notifications-outline';
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

        <Tab.Screen name="Test" component={TestStackScreen} />
        <Tab.Screen name="Rechercher" component={HomeStackScreen} />
        <Tab.Screen name="Favoris" component={FavoriteStackScreen} />
        <Tab.Screen name="Les Derniers Films" component={NewsStackScreen} />
        
      </Tab.Navigator>
      </PersistGate>
	  </Provider>
    </NavigationContainer>
  );
}
}


