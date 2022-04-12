import * as React from 'react';
import {db} from '../firebase_db.js'

import { View, Text, Button, Dimensions, Image, TouchableOpacity, TextInput, StyleSheet } from 'react-native';
import { RTCPeerConnection, RTCView, mediaDevices, RTCIceCandidate, RTCSessionDescription } from 'react-native-webrtc';
//import * as FireStore from 'firebase/firestore';
import firestore from '@react-native-firebase/firestore';
import { NavigationContainer } from '@react-navigation/native';
import styles2 from '../styles'

function RoomCreateScreen({route,navigation}) {
  const token = route.params.token;
  const email = route.params.email;
  const username = route.params.username;
  const configuration = {
    iceServers: [
      {
        urls: ['stun:stun1.l.google.com:19302', 'stun:stun2.l.google.com:19302'],
      },
    ],
    iceCandidatePoolSize: 10,
  };
  function onBackPress() {
    if (cachedLocalPC) {
      cachedLocalPC.removeStream(localStream);
      cachedLocalPC.close();
    }
    setLocalStream();
    setRemoteStream();
    setCachedLocalPC();
    // cleanup
    navigation.navigate('Profil používateľa')
  }

  const [localStream, setLocalStream] = React.useState();
  const [remoteStream, setRemoteStream] = React.useState();
  const [cachedLocalPC, setCachedLocalPC] = React.useState();

  const [isMuted, setIsMuted] = React.useState(false);

  React.useEffect(() => {
    // startLocalStream();
  }, []);

  const startLocalStream = async () => {
    // isFront will determine if the initial camera should face user or environment
    const isFront = true;
    const devices = await mediaDevices.enumerateDevices();

    const facing = isFront ? 'front' : 'environment';
    const videoSourceId = devices.find(device => device.kind === 'videoinput' && device.facing === facing);
    const facingMode = isFront ? 'user' : 'environment';
    const constraints = {
      audio: true,
      video: {
        mandatory: {
          minWidth: 500, // Provide your own width, height and frame rate here
          minHeight: 300,
          minFrameRate: 30,
        },
        facingMode,
        optional: videoSourceId ? [{ sourceId: videoSourceId }] : [],
      },
    };
    const newStream = await mediaDevices.getUserMedia(constraints);
    setLocalStream(newStream);
  };

  const startCall = async id => {
    console.log("tu");
    const localPC = new RTCPeerConnection(configuration);
    console.log("cau");
    localPC.addStream(localStream);
    console.log("tu 2");
    
    //const roomRef = await db.collection('rooms').doc(id);
    const roomRef = await db.collection('rooms').doc(id);
    const callerCandidatesCollection = roomRef.collection('callerCandidates');
    localPC.onicecandidate = e => {
      if (!e.candidate) {
        console.log('Got final candidate!');
        return;
      }
      callerCandidatesCollection.add(e.candidate.toJSON());
    };

    localPC.onaddstream = e => {
      if (e.stream && remoteStream !== e.stream) {
        console.log('RemotePC received the stream call', e.stream);
        setRemoteStream(e.stream);
      }
    };

    const offer = await localPC.createOffer();
    await localPC.setLocalDescription(offer);

    const roomWithOffer = { offer };
    await roomRef.set(roomWithOffer);

    roomRef.onSnapshot(async snapshot => {
      const data = snapshot.data();
      if (!localPC.currentRemoteDescription && data.answer) {
        const rtcSessionDescription = new RTCSessionDescription(data.answer);
        await localPC.setRemoteDescription(rtcSessionDescription);
      }
    });

    roomRef.collection('calleeCandidates').onSnapshot(snapshot => {
      snapshot.docChanges().forEach(async change => {
        if (change.type === 'added') {
          let data = change.doc.data();
          await localPC.addIceCandidate(new RTCIceCandidate(data));
        }
      });
    });

    setCachedLocalPC(localPC);
  };

  const switchCamera = () => {
    localStream.getVideoTracks().forEach(track => track._switchCamera());
  };

  // Mutes the local's outgoing audio
  const toggleMute = () => {
    if (!remoteStream) {
      return;
    }
    localStream.getAudioTracks().forEach(track => {
      // console.log(track.enabled ? 'muting' : 'unmuting', ' local track', track);
      track.enabled = !track.enabled;
      setIsMuted(!track.enabled);
    });
  };

  return (
    <>
    <Text style={styles.heading} >Call Screen</Text>
    <Text style={styles.heading} >Room : {route.params.roomId}</Text>

    <View style={styles.callButtons} >
      <View styles={styles.buttonContainer} >
        <TouchableOpacity style={styles2.button} onPress={onBackPress}>
        <Text style={styles2.button_text}>Zastaviť hovor</Text>
        </TouchableOpacity>
      </View>
      <View styles={styles.buttonContainer} >
        {!localStream ? (
        <TouchableOpacity style={styles2.button} onPress={startLocalStream}>
          <Text style={styles2.button_text}>Spustiť stream</Text>
        </TouchableOpacity>) : null}
        {localStream ? (
        <TouchableOpacity style={styles2.button} onPress={() => startCall(route.params.roomId)} disabled={!remoteStream}>
          <Text style={styles2.button_text}>Spustiť hovor</Text>
        </TouchableOpacity>):null }
      </View>
    </View>

    {localStream ? (
      <View style={styles.toggleButtons}>
        <TouchableOpacity style={styles2.button} onPress={switchCamera}>
           <Text style={styles2.button_text}>Zmena kamery</Text>
           </TouchableOpacity>
           <TouchableOpacity style={styles2.button} onPress={toggleMute} disabled={!remoteStream}>
           <Text style={styles2.button_text}> Mute </Text>
           </TouchableOpacity>
      </View>
    ) : null}

    <View style={{ display: 'flex', flex: 1, padding: 10 }} >
      <View style={styles.rtcview}>
        {localStream && <RTCView style={styles.rtc} streamURL={localStream && localStream.toURL()} />}
      </View>
      <View style={styles.rtcview}>
        {remoteStream && <RTCView style={styles.rtc} streamURL={remoteStream && remoteStream.toURL()} />}
      </View>
    </View>

  </>
  )
}
export default RoomCreateScreen;

const styles = StyleSheet.create({
    heading: {
      alignSelf: 'center',
      fontSize: 30,
    },
    rtcview: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'black',
      margin: 5,
    },
    rtc: {
      flex: 1,
      width: '100%',
      height: '100%',
    },
    toggleButtons: {
      width: '100%',
      flexDirection: 'row',
      justifyContent: 'space-around',
    },
    callButtons: {
      padding: 10,
      width: '100%',
      flexDirection: 'row',
      justifyContent: 'space-around',
    },
    buttonContainer: {
      margin: 5,
    },
    callButtons: {
      backgroundColor: '#f76226',
      color: '#f76226',
      borderRadius: 5,
      margin: 5
    }
  });