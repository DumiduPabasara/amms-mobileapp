import * as React from 'react';
import { ActivityIndicator, Colors } from 'react-native-paper';

const Loading = () => (
  <ActivityIndicator animating={true} color={Colors.blue50} />
);

export default Loading;