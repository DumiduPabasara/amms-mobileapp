import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Button, Dimensions, Image, Alert} from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';

export default function QRScannerScreen( {route} ) {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);

  const { courseCode } = route.params;
  const courseId = courseCode.toString();
  /*console.log(courseId);*/

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const handleBarCodeScanned = ({ data }) => {

    setScanned(true);

    let scannedData = data;

    let scannedCourseId = scannedData.slice(0,7);

    /*console.log(scannedCourseId);*/

    /*console.log(scannedCourseId.includes(courseId));*/

    if ( scannedCourseId.includes(courseId) ) {

      Alert.alert(`Your Attendance is marked for the course ${courseId}`);
    }

    else {
      Alert.alert(`Invalid QR code scanned for ${courseId} !`);
    }

    /*alert(`Bar code with type ${type} and data ${data} has been scanned!`)*/

  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View
      style={{
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-end',
      }}>
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={[StyleSheet.absoluteFill, styles.container]}
      >
        <Image
          style={styles.qr}
          source={require('../../../../../images/QR.png')}
        />
      </BarCodeScanner>

      {scanned && <Button title={'Tap to Scan Again'} onPress={() => setScanned(false)} />}
    </View>
  );
}

const { width } = Dimensions.get('window');
const qrSize = width * 1.2;

const styles = StyleSheet.create({

    container: {
        flex: 1,
        alignItems: 'center',
      },
      qr: {
        marginTop: '10%',
        marginBottom: '20%',
        width: qrSize,
        height: qrSize,
      },

})
