import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Button, Dimensions, Image } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';

export default function QRScannerScreen( {route} ) {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);

  const { courseName } = route.params;
  let courseId = JSON.stringify(courseName);

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const handleBarCodeScanned = ({ data, courseId }) => {

    setScanned(true);

    let scannedData = data;

    if ( scannedData.includes(courseId) ) {

      alert(`Your Attendance is marked for the course ${courseName}`);
    }

    else {
      alert(`Invalid QR code scanned\n Attendance not marked ${courseName} !`);
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
const qrSize = width * 0.9;

const styles = StyleSheet.create({

    container: {
        flex: 1,
        alignItems: 'center',
      },
      qr: {
        marginTop: '20%',
        marginBottom: '20%',
        width: qrSize,
        height: qrSize,
      },

})

/*import React from 'react';
import { View, Text } from 'react-native';


const QRScannerScreen = () => {

    return(
        <View>
            <Text>This is QR Scanner</Text>
        </View>
    )
}

export default QRScannerScreen;*/