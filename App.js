// App.js
 
import 'react-native-gesture-handler';
 
import React from 'react' //React Navigator
 
import { NavigationContainer } from '@react-navigation/native';
 
import { createStackNavigator } from '@react-navigation/stack';
 
//Components
 
import Search from './Components/Search'
import FilmDetail from './Components/FilmDetail'


const Stack = createStackNavigator();
 
export default class App extends React.Component {
 
render()
 
{
 
return (
 
<NavigationContainer>
 
      <Stack.Navigator>
 
            <Stack.Screen name="Rechercher" component={Search} />
            <Stack.Screen name="Detail" component={FilmDetail} />
 
      </Stack.Navigator>
 
</NavigationContainer> )
 
}
 
}