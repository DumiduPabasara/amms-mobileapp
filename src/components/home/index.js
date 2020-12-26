import React, { useState } from 'react';
import { ScrollView, Text, StyleSheet, RefreshControl } from 'react-native';
import { Card } from 'react-native-elements';
import Courses from './courses';
import * as Animatable from 'react-native-animatable';
import { useSelector } from 'react-redux';
import { getLoggedInUserDetails } from '../../store/login';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import Constants from 'expo-constants';
import { Colors } from 'react-native-paper';

const wait = (timeout) => {
  return new Promise(resolve => {
    setTimeout(resolve, timeout);
  });
}

const HomeScreen = ({ navigation, route }) => {

  //route takes from qrScreen as post to set to courses
  React.useEffect(() => {
    if (route.params?.post) {
      // Post updated, do something with `route.params.post`
      // For example, send the post to the server
    }
  }, [route.params?.post]);

  console.log(route.params);

  const user = useSelector(getLoggedInUserDetails);

  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);

    wait(2000).then(() => setRefreshing(false));
  }, []);

  return (
    <LinearGradient
      colors={ ["#e0ffff", "#63a8e6"] }
      start={ [0.1, 0.1] }
      style={ styles.mainBody }
    >
      <ScrollView
        contentContainerStyle={ styles.scrollView }
        refreshControl={
          <RefreshControl refreshing={ refreshing } colors={ [Colors.blueA200] } onRefresh={ onRefresh } />
        }
      >
        <Animatable.View animation="slideInDown" duration={ 1500 } delay={ 500 }>
          <Card>
            <Card.FeaturedTitle style={ { color: '#1e90ff' } }>Hello { user.firstName } { user.username }</Card.FeaturedTitle>
          </Card>
        </Animatable.View>
        <Animatable.View animation="zoomInUp" duration={ 1500 } delay={ 900 }>
          <Courses navigation={ navigation } user={ user } markedQ={ route.params?.post } />
        </Animatable.View>
      </ScrollView>
    </LinearGradient>
  )
}

const styles = StyleSheet.create({

  mainBody: {
    flex: 1,
    alignContent: 'center'
  },
  container: {
    flex: 1,
    marginTop: Constants.statusBarHeight,
  },

});

export default HomeScreen;