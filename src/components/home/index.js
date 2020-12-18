import React from 'react';
import { ScrollView, Text, StyleSheet } from 'react-native';
import { Card } from 'react-native-elements';
import Courses from './courses';
import * as Animatable from 'react-native-animatable';
import { useSelector } from 'react-redux';
import { getLoggedInUserDetails } from '../../store/login';
import { LinearGradient } from "expo-linear-gradient";

const HomeScreen = ( {navigation} ) => {

  const user = useSelector(getLoggedInUserDetails);

  /*const Courses = React.forwardRef(({navigation}, ref) => (

    <Courses navigation={ navigation } user={ user } ref={ref}/>

  ));*/

  return (
    <LinearGradient
      colors={["#e0ffff", "#63a8e6"]}
      start={[0.1, 0.1]}
      style={styles.mainBody}
    >
      <ScrollView >
        <Animatable.View animation="slideInDown" duration={ 1500 } delay={ 500 }>
          <Card>
            <Card.FeaturedTitle style={ { color: '#1e90ff' } }>Hello { user.firstName } { user.username }</Card.FeaturedTitle>
          </Card>
        </Animatable.View>
        <Animatable.View animation="zoomInUp" duration={ 1500 } delay={ 900 }>
          <Courses navigation={ navigation } user={ user }/>
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

});

export default HomeScreen;