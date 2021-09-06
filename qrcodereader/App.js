import React, { useState } from "react";
import {
  AppRegistry,
  StyleSheet,
  Text,
  TouchableOpacity,
  Linking, View, ScrollView, Button,
} from "react-native";

import QRCodeScanner from 'react-native-qrcode-scanner';
import { RNCamera } from 'react-native-camera';
import Scanner from "./components/Scanner";

const App = () => {
  const [scan, setScan] = useState(false);
  const [qrData, setQrData] = useState({});
  const [verified, setVerified] = useState({isValid: false,});
  const [verifyClicked, setVerifyClicked] = useState(false);
  const handleScanButton = ()=>{
    setScan(true);
  }
  const handleVerifyButton = ()=>{
    setVerifyClicked(true);
  }
  const handleClearButton = () =>{
    setQrData({});
    setVerifyClicked(false);
    setVerified({isValid: false,});
  }
  return (
    <View style={[!scan ? styles.buttonStyle : {}]}>
      <Text style={{ textAlign: 'center',}}>Click Verify Button To Verify whether the document is signed by the authority!</Text>
      {scan ? <Scanner setScan={setScan} setQrData={setQrData} setVerified={setVerified}/> : <View style={{ }}>
        <TouchableOpacity
          style={styles.button}
          onPress={handleScanButton}
        >
          <Text>Scan</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={handleVerifyButton}
        >
          <Text>Verify</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={handleClearButton}
        >
          <Text>Clear Data</Text>
        </TouchableOpacity>
        {Object.keys(qrData).length === 0 ? <Text></Text> : <Text style={{fontSize: 24, marginTop: 15}} >{qrData.name}</Text>}
        {verifyClicked ? <Text style={{fontSize: 24, marginTop: 20}}>{verified.isValid.toString()}</Text> : <Text></Text>}
      </View> }


    </View>

  );
};

const styles = StyleSheet.create({
  buttonStyle: {
    justifyContent: "center", alignItems:"center", height:"100%"
  },
  button: {
    alignItems: "center",
    backgroundColor: "#DDDDDD",
    padding: 10,
    margin: 10
  },

});

export default App;
