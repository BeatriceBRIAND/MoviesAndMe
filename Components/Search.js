//Components/Search.js
import React from 'react'
import { StyleSheet, Button, TextInput, View, FlatList } from 'react-native'
//import film from '../Helpers/filmsData'
import FilmItem from './FilmItem'
import { getFilmsFromApiWithSearchedText } from '../API/TMDBApi' // import { } from ... car c'est un export nommé dans TMDBApi.js



class Search extends React.Component {

    constructor(props) {
        super(props)
        //Ici on va créer les propriétés de notre component custom Search
        this.searchedText = "" // Initialisation de notre donnée searchedText dans le state
        this.state = { 
            films: [] } 
    }

    _loadFilms() {
        if (this.searchedText.length > 0) { // Seulement si le texte recherché n'est pas vide 
          getFilmsFromApiWithSearchedText(this.searchedText).then(data => {
              this.setState({ films: data.results })
          })
        }
    }

    _searchTextInputChanged(text) {
        this.searchedText = text // Modification du texte recherché à chaque saisie de texte, sans passer par le setState
    }


    render() {
        console.log("RENDER")
        return (
            //Ici on retourne des éléments graphiques de nottre component custom Search
            <View style={styles.main_container}>
                <TextInput 
                style={styles.textinput}
                placeholder='Titre du film'
                onChangeText={(text) => this._searchTextInputChanged(text)}
                />
                <Button style={styles.textinput} title='Rechercher' onPress={() => this._loadFilms()}/>
                {/* Ici j'ai simplement repris l'exemple sur la documentation de la FlatList*/}
                <FlatList
                data={this.state.films}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({item}) => <FilmItem film={item}/>}
                />
            </View>
        )
    }
}

const styles = StyleSheet.create( {
    main_container:{
        flex: 1,
        marginTop: 50
    },
    textinput: {
        marginLeft: 5,
        marginRight: 5,
        height: 50,
        borderColor: '#000000',
        borderWidth: 1,
        paddingLeft:5
    }
})

export default Search