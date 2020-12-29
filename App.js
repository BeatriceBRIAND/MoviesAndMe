// App.js
 
import 'react-native-gesture-handler';
import React from 'react' //React Navigator
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Provider } from 'react-redux'; 


//Components
 
import Search from './Components/Search'
import FilmDetail from './Components/FilmDetail'
import Store from './Store/configureStore'

const Stack = createStackNavigator();
 
export default class App extends React.Component {
 
render()
 
{
 
return (
 
<NavigationContainer>

      <Provider store={Store}>
 
      <Stack.Navigator>
 
            <Stack.Screen name="Rechercher" component={Search} />
            <Stack.Screen name="Detail" component={FilmDetail} />
 
      </Stack.Navigator>
      
      </Provider>
 
</NavigationContainer> )
 
}
 
}