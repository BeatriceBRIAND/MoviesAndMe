// Components/Avatar.js

import { View } from 'native-base';
import React from 'react'
import { StyleSheet, Image, TouchableOpacity } from 'react-native'
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions'


class Avatar extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      avatar: require('../Images/ic_tag_faces.png'),
      hasCameraPermission: null,
    }
    // this.setState est appelé dans un callback dans showImagePicker, pensez donc bien à binder la fonction _avatarClicked
    this._avatarClicked = this._avatarClicked.bind(this)
  }

  async componentDidMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
    this.setState({ hasCameraPermission: status === "granted" });
   }

  _avatarClicked= async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
     allowsEditing: true,
     aspect: [4, 3]
    });
    if (!result.cancelled) {
     this.setState({ avatar: this.state});
    }
   }
  

  render() {
    const { avatar, hasCameraPermission } = this.state;
  if (hasCameraPermission === null) {
   return <View></View>
  }
  else if (hasCameraPermission === false) {
   return <Text>Access to camera has been denied.</Text>;
  }
  else {
    return(
      <View>
      <TouchableOpacity
        style={styles.touchableOpacity}
        onPress={this._avatarClicked}>
          <Image style={styles.avatar} source={this.state.avatar} />
      </TouchableOpacity>
      </View>
    )
  }
}
}

const styles = StyleSheet.create({
  touchableOpacity: {
    margin: 5,
    width: 100, // Pensez bien à définir une largeur ici, sinon toute la largeur de l'écran sera cliquable
    height: 100,
    justifyContent: 'center',
    alignItems: 'center'
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderColor: '#9B9B9B',
    borderWidth: 2
  }
})

export default Avatar