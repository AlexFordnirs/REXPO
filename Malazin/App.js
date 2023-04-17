import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import {SafeAreaView,  StyleSheet ,Text, View, Button, Image} from 'react-native';
import { Camera } from 'expo-camera';
import { RadioButton } from 'react-native-paper';
import Parse from 'parse/react-native.js';
//import SafeAreaView from 'react-native-safe-area-view';
import AsyncStorage from '@react-native-async-storage/async-storage';
import UploadImage from './UploadingImage';
import Gallery from './Gallery';
Parse.setAsyncStorage(AsyncStorage);

export default function App() {
  const [checked, setChecked] = React.useState('Front Image');
  const [hasCameraPermission, setHasCameraPermission] = useState(null);
  const [camera, setCamera] = useState(null);
  const [image, setImage] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
useEffect(() => {
    (async () => {
      const cameraStatus = await Camera.requestCameraPermissionsAsync();
      setHasCameraPermission(cameraStatus.status === 'granted');
})();
  }, []);
const takePicture = async () => {
    if(camera){
        const data = await camera.takePictureAsync(null)
        setImage(data.uri);
    }
  }

  if (hasCameraPermission === false) {
    return <Text>No access to camera</Text>;
  }
  return (
   <View style={{ flex: 1}}>
      <View style={styles.cameraContainer}>
            <Camera 
            ref={ref => setCamera(ref)}
            style={styles.fixedRatio} 
            type={type}
            ratio={'1:1'} />
      </View>
      <Button
            title="Flip Image"
            onPress={() => {
              setType(
                type === Camera.Constants.Type.back
                  ? Camera.Constants.Type.front
                  : Camera.Constants.Type.back
              );
            }}>
        </Button>
       <Button title="Take Picture" onPress={() => takePicture()} />
        {image && <Image source={{uri: image}} style={{flex:1}}/>}
        <Text>Back Image</Text>
        <RadioButton
        label="Back Image"
        value="Back Image"
        color='red'
        status={ checked === 'Back Image' ? 'checked' : 'unchecked' }
        onPress={() => {
          setType(
            type === Camera.Constants.Type.back
              ? Camera.Constants.Type.front
              : Camera.Constants.Type.back
          ); setChecked('Back Image')
        }}
      />
      <Text>Front Image</Text>
      <RadioButton
       label="Front Image"
        color='blue'
        value="Front Image"
        status={ checked === 'Front Image' ? 'checked' : 'unchecked' }
        onPress={() => {
          setType(
            type === Camera.Constants.Type.back
              ? Camera.Constants.Type.front
              : Camera.Constants.Type.back
          ); setChecked('Front Image')
        }}
      />
  <SafeAreaView style={styles.container}>
		<UploadImage/>
    <Gallery/>
	</SafeAreaView>
   </View>
  );
}
const styles = StyleSheet.create({
  cameraContainer: {
      flex: 1,
      flexDirection: 'row'
  },
  fixedRatio:{
      flex: 1,
      aspectRatio: 1
  },
  container: {
    backgroundColor: '#f5f5f5',
    flex: 1,
    },
    title: {
    fontSize: 18,
    textAlign: 'center',
    fontWeight: 'bold',
    }
})
