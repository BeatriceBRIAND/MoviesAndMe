// Navigation/Navigation.js

import { createStackNavigator, createAppContainer, createBottomTabNavigator } from '@react-navigation/stack'
import Search from '../Components/Search'
import Favorites from '../Components/Favorites'
import FilmDetail from '../Components/FilmDetail'

/* const SearchStackNavigator = createStackNavigator({
  Search: {
    screen: Search,
    navigationOptions: { // Ici j'ai appelé la vue "Search" mais on peut mettre ce que l'on veut. C'est le nom qu'on utilisera pour appeler cette vue
      title: 'Rechercher'
    }
  },
  FilmDetail: { // Encore une fois j'ai mis le même nom que celui du component mais libre à vous de choisir un nom différent
    screen: FilmDetail
  }
}) */

const MoviesTabNavigator = createBottomTabNavigator({
  Search: {
    screen: Search
  },
  Favorites: {
    screen: Favorites
  }
})

export default createAppContainer(MoviesTabNavigator)