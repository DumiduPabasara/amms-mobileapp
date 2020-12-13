import React, { useState, useEffect } from 'react';
import { ScrollView, Text, Platform, TouchableOpacity, StyleSheet } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';
import LogOut from '../auth/logout';
import { Card } from 'react-native-elements';
import { Avatar } from 'react-native-paper';
import * as Animatable from 'react-native-animatable';
import { useSelector } from 'react-redux';
import { getLoggedInUserDetails } from '../../store/login';
import { LinearGradient } from "expo-linear-gradient";

const Profile = () => {

  const users = useSelector(getLoggedInUserDetails);
  /*console.log(users);*/

  const [image, setImage] = useState(null);

  useEffect(() => {
    (async () => {
      if (Platform.OS !== 'web') {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
          alert('Sorry, we need camera roll permissions to make this work!');
        }
      }
    })();
  }, []);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  /*const user = { imageurl: image}*/

  return (
    <LinearGradient
                colors={["#e0ffff", "#63a8e6"]}
                start={[0.1, 0.1]}
                style={styles.mainBody}
      >
    <ScrollView >
      <Animatable.View animation="fadeInDown" duration={ 1000 } delay={ 500 }>
        <Card
          containerStyle={ { backgroundColor: '#e0ffff' } }
        >

          <TouchableOpacity
            onPress={pickImage}
          >
            <Avatar.Image
              source={{ uri: image}}
              size={ 210 }
              style={ { alignSelf: 'center', margin: 10 } }
            />
          </TouchableOpacity>
  
          <Card.Divider />
          <Text style={ { flexDirection: 'row', flex: 1, margin: 10, fontWeight: "bold", fontSize: 20 } }>My sc number : </Text>
          <Text style={ { flexDirection: 'row', flex: 2, marginLeft: 10, color: 'black' } }>{ users.firstName } </Text>

          <Text style={ { margin: 10, fontWeight: "bold", fontSize: 20 } }>My username : </Text>
          <Text style={ { marginLeft: 10 } }>{ users.username } </Text>

          <Text style={ { margin: 10, fontWeight: "bold", fontSize: 20 } }>My role : </Text>
          <Text style={ { marginLeft: 10 } }>{ users.role } </Text>

          <Text style={ { margin: 10, fontWeight: "bold", fontSize: 20 } }>I'm from : </Text>
          <Text style={ { marginLeft: 10, marginBottom: 10 } }>{ users.cityOrTown }, { users.country } </Text>

          <Card.Divider />
          <Animatable.View animation="bounce" duration={ 1000 } delay={ 1000 }>
            <LogOut />
          </Animatable.View>
        </Card>
      </Animatable.View>

    </ScrollView>
    </LinearGradient>

  )
}

const styles = StyleSheet.create({

  mainBody: {
    flex: 1,
    alignContent: 'center',
  },

});

export default Profile;