import React from 'react';
import { ActivityIndicator, Colors} from 'react-native-paper';
import { View, StyleSheet, Text } from 'react-native';

const Loading = () => {

  return (
    <View style={styles.mainBody}>
      <ActivityIndicator animating={true} color={Colors.blueA200} />
    </View>
    
  )
}

const styles = StyleSheet.create ({
  mainBody: {
		flex: 1,
		justifyContent: 'center',
    alignContent: 'center',
    marginTop: 10
	}
})
  
export default Loading;