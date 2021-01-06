// Components/Avatar.js

import React from 'react'
import { StyleSheet, Image, TouchableOpacity, View } from 'react-native'
import { Camera } from 'expo-camera';
import * as Permissions from 'expo-permissions';

class Avatar extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      avatar: require('../Images/ic_tag_faces.png'),
      hasPermission: null,
    type: Camera.Constants.Type.back,
    }
  }

  async componentDidMount() {
    this.getPermissionAsync()
}  
getPermissionAsync = async () => {
    // Camera roll Permission 
    if (Platform.OS === 'ios') {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      if (status !== 'granted') {
        alert('Sorry, we need camera roll permissions to make this work!');
      }
    }
    // Camera Permission
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasPermission: status === 'granted' });
  }
  
  avatarClicked = () => {
    // Ici nous appellerons la librairie react-native-image-picker pour récupérer un avatar
    const { cameraType } = this.state
    this.setState({cameraType:
      cameraType === Camera.Constants.Type.back
      ? Camera.Constants.Type.front
      : Camera.Constants.Type.back
    })
    takePicture = async () => {
        if (this.camera) {
          let photo = await this.camera.takePictureAsync();
          console.log('photo', photo);
        }
      }
    }
  
render(){
    const { hasPermission } = this.state
    if (hasPermission === null) {
      return <View></View>;
    } else if (hasPermission === false) {
      return <Text>No access to camera</Text>;
    } else {
      return (
        <TouchableOpacity
        style={styles.touchableOpacity}
        onPress={() => this.avatarClicked()}>
          <Image style={styles.avatar} source={this.state.avatar}></Image>
          <View style={{ flex: 1 }}>
            <Camera style={{ flex: 1 }} type={this.state.cameraType} ref={ref => {
    this.camera = ref;
  }}>
            </Camera>
        </View>
        </TouchableOpacity>
      );
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