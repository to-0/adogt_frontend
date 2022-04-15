import * as React from 'react';
import {db} from '../firebase_db.js';
import { View, Text, TouchableOpacity } from 'react-native';
import { RTCPeerConnection, RTCView, mediaDevices, RTCIceCandidate, RTCSessionDescription } from 'react-native-webrtc';

import styles from '../styles';

function RoomCreateScreen({route,navigation}) {
  const roomId = route.params.roomId;
  const [localStream, setLocalStream] = React.useState();
  const [remoteStream, setRemoteStream] = React.useState();
  const [cachedLocalPC, setCachedLocalPC] = React.useState();
  const [isMuted, setIsMuted] = React.useState(false);

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
    
    navigation.navigate('Profil používateľa')
  };

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
    console.log("Tu");
  };

  const startCall = async id => {
    const localPC = new RTCPeerConnection(configuration);
    localPC.addStream(localStream);
    
    const roomRef = db.collection('rooms').doc(id);
    const callerCandidatesCollection = roomRef.collection('callerCandidates');
    localPC.onicecandidate = e => {
      if (!e.candidate)
        return;
      
      callerCandidatesCollection.add(e.candidate.toJSON());
    };

    localPC.onaddstream = e => {
      if (e.stream && remoteStream !== e.stream)
        setRemoteStream(e.stream);
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
    if (!remoteStream)
      return;
    
    localStream.getAudioTracks().forEach(track => {
      track.enabled = !track.enabled;
      setIsMuted(!track.enabled);
    });
  };

  return (
    <>
    <Text style={styles.heading} >Miestnosť: {roomId}</Text>
    <View style={[styles.side_buttons_view, {marginTop: 0, marginBottom: 0}]} >
      <TouchableOpacity style={[styles.side_button, {marginTop: 0, marginBottom: 0}]} onPress={onBackPress}>
        <Text style={styles.button_text}>Zastaviť hovor</Text>
      </TouchableOpacity>

      {!localStream ? (
        <TouchableOpacity style={[styles.side_button, {marginTop: 0, marginBottom: 0}]} onPress={startLocalStream}>
          <Text style={styles.button_text}>Spustiť video</Text>
        </TouchableOpacity>
      ) : null}

      {localStream ? (
        <TouchableOpacity style={[styles.side_button, {marginTop: 0, marginBottom: 0}]} onPress={() => startCall(roomId)} disabled={!!remoteStream}>
          <Text style={styles.button_text}>Spustiť hovor</Text>
        </TouchableOpacity>
      ):null }
    </View>

    {localStream ? (
      <View style={[styles.side_buttons_view, {marginTop: 0, marginBottom: 0}]}>
        <TouchableOpacity style={[styles.side_button, {marginBottom: 0}]} onPress={switchCamera}>
          <Text style={styles.button_text}>Zmena kamery</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.side_button, {marginBottom: 0}]} onPress={toggleMute} disabled={!remoteStream}>
          <Text style={styles.button_text}> Stlmiť zvuk </Text>
        </TouchableOpacity>
      </View>
    ) : null}


    <View style={styles.video_call_view} >
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