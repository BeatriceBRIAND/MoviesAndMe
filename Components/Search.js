//Components/Search.js

import React from 'react'
import { StyleSheet, Button, TextInput, View, ActivityIndicator, SafeAreaView } from 'react-native'
//import film from '../Helpers/filmsData'
import FilmItem from './FilmItem'
import FilmList from './FilmList'
import { getFilmsFromApiWithSearchedText } from '../API/TMDBApi' // import { } from ... car c'est un export nommé dans TMDBApi.js


class Search extends React.Component {

    constructor(props) {
        super(props)
        //Ici on va créer les propriétés de notre component custom Search
        this.searchedText = "" // Initialisation de notre donnée searchedText 
        this.page = 0 // Compteur pour connaître la page courante
        this.totalPages = 0 // Nombre de pages totales pour savoir si on a atteint la fin des retours de l'API TMBD
        this._loadFilms = this._loadFilms.bind(this)
        this.state = { 
            films: [],
        isLoading: false // Par défaut à false car il n'y a pas de chargement tant qu'on ne lance par de recherche
        
     } 
    }

    _loadFilms() {
        if (this.searchedText.length > 0) { // Seulement si le texte recherché n'est pas vide 
        this.setState({ isLoading: true }) // Lancement du chargement
          getFilmsFromApiWithSearchedText(this.searchedText, this.page+1).then(data => {
              this.page = data.page
              this.totalPages = data.total_pages
              this.setState({ 
                  films: [ ...this.state.films, ...data.results ], //ou faire ça: "films: this.state.films.concat(data.results)" le résultat sera pareil
                isLoading: false // Arrêt du chargement
             })
          })
        }
    }

    _searchTextInputChanged(text) {
        this.searchedText = text // Modification du texte recherché à chaque saisie de texte, sans passer par le setState
    }

    _searchFilms() {
        //Ici on va remettre à zéro les films de notre state
        this.page = 0
        this.totalPages = 0
        this.setState({
            films: [],
        }, () => { // J'utilise la paramètre lenght sur mon tableau de films pour vérifier qu'il y a bien 0 film
        //console.log("Page : " + this.page + " / Totalpages : " + this.totalPages + " / Nombre de films : " + this.state.films.length)
        this._loadFilms()
        })
        
    }

    _displayDetailForFilm = (idFilm) => {
        console.log("Display film with id " + idFilm)
        this.props.navigation.navigate("Detail", { idFilm: idFilm })
    }

    _displayLoading() {
        if (this.state.isLoading) {
            return (
                <View style={styles.loading_container}>
                    <ActivityIndicator size='large'></ActivityIndicator>
                    {/* Le component ActivityIndicator possède une propriété size pour définir la taille du visuel de chargement : small ou large.
                    Par défaut size vaut small, on met donc large pour que le chargement soit bien visible */}
                </View>
            )
        }
    }


    render() {
       // console.log(this.state.isLoading)
        return (
            //Ici on retourne des éléments graphiques de nottre component custom Search
            <SafeAreaView style={styles.main_container}>
            <View style={styles.main_container}>
                <TextInput 
                style={styles.textinput}
                placeholder='Titre du film'
                onChangeText={(text) => this._searchTextInputChanged(text)}
                onSubmitEditing={() => this._searchFilms()}
                />
                <Button style={styles.textinput} title='Rechercher' onPress={() => this._searchFilms()}/>
                <FilmList
                    films={this.state.films} //C'est bien le component Search qui récupère les films depuis l'API et on les transmets icic pour que le component FilmList les affiche
                    navigation={this.props.navigation} //Ici on transmet les informations de navigation pour permettre au component Filmlist de naviguer vers le détail d'un film
                    loadFilms={this._loadFilms} // _loadFilm charge les films suivants, ça concerne l'API, le component FilmList va juste appeler cette méthode quand l'utilisateur aura parcouru tous les films et c'est le component Search qui lui fournira les films suivants
                    page={this.page}
                    totalPages={this.totalPages} // les infos page et totalPages vont être utiles, côté component FilmList, pour ne pas déclencher l'évènement pour charger plus de film si on atteint la dernière page
                    favoriteList={false} // Ici j'ai simplement ajouté un booléen à false pour indiquer qu'on n'est pas dans le cas de l'affichage de la liste des films favoris. Et ainsi pouvoir déclencher le chargement de plus de films lorsque l'utilisateur scrolle.
                    />                
                {this._displayLoading()}
            </View>
            </SafeAreaView>
        )
    }
}

const styles = StyleSheet.create( {
    main_container:{
        flex: 1,
        //marginTop: 50
    },
    textinput: {
        marginLeft: 5,
        marginRight: 5,
        height: 50,
        borderColor: '#000000',
        borderWidth: 1,
        paddingLeft:5
    },
    loading_container: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 100,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center'
    }
})




export default Search