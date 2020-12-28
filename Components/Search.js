//Components/Search.js
import React from 'react'
import { StyleSheet, Button, TextInput, View, FlatList } from 'react-native'
import film from '../Helpers/filmsData'
import FilmItem from './FilmItem'



class Search extends React.Component {
    render() {
        return (
            //Ici on retourne des éléments graphiques de nottre component custom Search
            <View style={styles.main_container}>
                <TextInput style={styles.textinput} placeholder='Titre du film'/>
                <Button style={styles.textinput} title='Rechercher' onPress={() => {}}/>
                {/* Ici j'ai simplement repris l'exemple sur la documentation de la FlatList*/}
                <FlatList
                data={film}
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