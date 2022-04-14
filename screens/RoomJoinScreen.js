import * as React from 'react';
import { RTCPeerConnection, RTCView, mediaDevices, RTCIceCandidate, RTCSessionDescription, Text, StyleSheet, View,TouchableOpacity } from 'react-native-webrtc';
import {db} from '../firebase_db.js'

import styles from '../styles';

const configuration = {
  iceServers: [
    {
      urls: ['stun:stun1.l.google.com:19302', 'stun:stun2.l.google.com:19302'],
    },
  ],
  iceCandidatePoolSize: 10,
};

function RoomJoinScreen({route,navigation}) {
  const roomId = route.params.roomId;
  const [localStream, setLocalStream] = React.useState();
  const [remoteStream, setRemoteStream] = React.useState();
  const [cachedLocalPC, setCachedLocalPC] = React.useState();
  const [isMuted, setIsMuted] = React.useState(false);

  function onBackPress() {
    if (cachedLocalPC) {
      cachedLocalPC.removeStream(localStream);
      cachedLocalPC.close();
    }
    setLocalStream();
    setRemoteStream();
    setCachedLocalPC();
    
    navigation.navigate('Profil používateľa');
  }

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

  const joinCall = async id => {
    const roomRef = db.collection('rooms').doc(id);
    const roomSnapshot = await roomRef.get();

    if (!roomSnapshot.exists) return
    const localPC = new RTCPeerConnection(configuration);
    localPC.addStream(localStream);
    const calleeCandidatesCollection = roomRef.collection('calleeCandidates');
    
    localPC.onicecandidate = e => {
      if (!e.candidate) 
        return;
      
      calleeCandidatesCollection.add(e.candidate.toJSON());
    };

    localPC.onaddstream = e => {
      if (e.stream && remoteStream !== e.stream) 
        setRemoteStream(e.stream);
    };

    const offer = roomSnapshot.data().offer;
    await localPC.setRemoteDescription(new RTCSessionDescription(offer));

    const answer = await localPC.createAnswer();
    await localPC.setLocalDescription(answer);

    const roomWithAnswer = { answer };
    await roomRef.update(roomWithAnswer);

    roomRef.collection('callerCandidates').onSnapshot(snapshot => {
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
    <Text style={styles.heading} >Room : {route.params.roomId}</Text>

    <View style={styles.toggleButtons} >
      <TouchableOpacity style={styles.cButtons} onPress={onBackPress}>
        <Text style={styles.button_text}>Zastaviť hovor</Text>
      </TouchableOpacity>

      {!localStream ? (
        <TouchableOpacity style={styles.cButtons}  onPress={startLocalStream}> 
          <Text style={styles.button_text}>Stream</Text> 
        </TouchableOpacity>
      ):null}

      {localStream ? (
        <TouchableOpacity style={styles.cButtons} onPress={() => joinCall(roomId)} disabled={!!remoteStream}>
            <Text style={styles.button_text}>Pripojiť sa</Text> 
        </TouchableOpacity>
      ):null}
    </View>

    {localStream ? (
      <View style={styles.toggleButtons}>
        <TouchableOpacity style={styles.cButtons} onPress={switchCamera}> 
          <Text style={styles.button_text}>Zmena kamery</Text> 
        </TouchableOpacity>

        <TouchableOpacity style={styles.cButtons}  onPress={toggleMute} disabled={!remoteStream}> 
          <Text style={styles.button_text}>{`${isMuted ? 'Unmute' : 'Mute'}`}</Text> 
        </TouchableOpacity>
      </View>
    ):null}

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

export default RoomJoinScreen;
