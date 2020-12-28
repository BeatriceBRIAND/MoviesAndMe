//Components/Search.js
import React from 'react'
import { StyleSheet, Button, TextInput, View } from 'react-native'



class Search extends React.Component {
    render() {
        return (
            //Ici on retourne des éléments graphiques de nottre component custom Search
            <View style={{marginTop: 50}}>
                <TextInput style={styles.textinput} placeholder='Titre du film'/>
                <Button style={styles.textinput} title='Rechercher' onPress={() => {}}/>
            </View>
        )
    }
}

const styles = StyleSheet.create( {
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