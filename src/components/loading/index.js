import React from 'react';
import { ActivityIndicator, Colors} from 'react-native-paper';
import { View } from 'react-native';

const Loading = () => {

  return (
    <View>
      <ActivityIndicator animating={true} color={Colors.blueA200} />
    </View>
    
  )
}
  
export default Loading;