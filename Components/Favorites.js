//Component/Favorites.js

import React from 'react'
import { Button, StyleSheet, Text } from 'react-native'

class Favorites extends React.Component {

    render() {
    return (
        <Button
        title="Mes Favoris"
        onPress={() =>
            {this.props.navigation.navigate('Favoris')
        }}
        />        
    )   
    }
}

const styles = StyleSheet.create({})

export default Favorites