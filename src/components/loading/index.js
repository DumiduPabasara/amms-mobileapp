import React from 'react';
import { ActivityIndicator} from 'react-native-paper';
import { View } from 'react-native';

const Loading = () => {

  return (
    <View>
      <ActivityIndicator animating={true}  />
    </View>
    
  )
}
  
export default Loading;