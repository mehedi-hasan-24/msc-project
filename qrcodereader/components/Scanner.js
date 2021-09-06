import React from 'react';
import {RNCamera} from 'react-native-camera';
import QRCodeScanner from 'react-native-qrcode-scanner';
import {View} from 'react-native';
// import axios from "axios";

const Scanner = ({setScan, setQrData, setVerified}) => {
  const onSuccess = async e => {
    // Linking.openURL(e.data).catch(err =>
    //   console.error('An error occured', err)
    // );
    // console.log(e.data)
    try {
      let student_data = JSON.parse(e.data);
      let data =
        student_data.name +
        student_data.email +
        student_data.class_roll +
        student_data.registration +
        student_data.session +
        student_data.dept;
      let public_key = student_data.public_key;
      let signature = student_data.signature;
      // ###########################################
      // As the server is running at localhost the url "http:192.168.0.120:3001/user/verify" may change depending upon local environment
      const result = await fetch('http:192.168.0.120:3001/user/verify', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          data,
          public_key,
          signature,
        }),
      })
        .then(response => response.json())
        .catch(error => {
          console.error(error);
        });

      setVerified(result);
      setQrData(student_data);
      setScan(false);
    } catch (e) {
      // console.log(e);
      setVerified({isValid: false});
      setScan(false);
    }
  };
  return (
    <View
      style={{
        width: 50,
        height: 50,
        backgroundColor: 'powderblue',
      }}>
      <QRCodeScanner
        onRead={onSuccess}
        flashMode={RNCamera.Constants.FlashMode.auto}
      />
    </View>
  );
};

export default Scanner;
