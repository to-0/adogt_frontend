import * as React from 'react';
import { Text, TextInput, TouchableOpacity, Dimensions,KeyboardAvoidingView} from 'react-native';

import styles from '../styles';
import {Globals} from '../Globals';

function OptionsScreen() {
    const [remote_host, setRemote] = React.useState(Globals.host);
    const [finalHost, setFinal] = React.useState(Globals.host);

    return (
      <KeyboardAvoidingView style={styles.center_view}>
        <Text style={[styles.title, {marginTop: (Dimensions.get('window').height) * 0.23}]}>
          {finalHost}
        </Text>
        <TextInput placeholder='IP adresa backend-u' onChangeText={(value) => setRemote(value)} style={[styles.login_form, {marginTop: (Dimensions.get('window').height) * 0.08}]}/>

        <TouchableOpacity style={styles.button} onPress={()=>{setFinal(remote_host); Globals.host = remote_host;}}>
          <Text style={styles.button_text}>Zmeniť IP adresu</Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    );
  }

  export default OptionsScreen;