import * as React from 'react';
import { RTCPeerConnection, RTCView, mediaDevices, RTCIceCandidate, RTCSessionDescription } from 'react-native-webrtc';
import { Text, StyleSheet, Button, View } from 'react-native';
import {db} from '../firebase_db.js'
const configuration = {
    iceServers: [
      {
        urls: ['stun:stun1.l.google.com:19302', 'stun:stun2.l.google.com:19302'],
      },
    ],
    iceCandidatePoolSize: 10,
  };

function RoomJoinScreen({route,navigation}) {
  const token = route.params.token;
  const email = route.params.email;
  const username = route.params.username;
  function onBackPress() {
    if (cachedLocalPC) {
      cachedLocalPC.removeStream(localStream);
      cachedLocalPC.close();
    }
    setLocalStream();
    setRemoteStream();
    setCachedLocalPC();
    // cleanup
    navigation.navigate('Profil používateľa');
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

  const joinCall = async id => {
    console.log("CAUKO");
    const roomRef = await db.collection('rooms').doc(id);
    console.log("tu");
    const roomSnapshot = await roomRef.get();
    console.log("Teraz tu room ref");

    if (!roomSnapshot.exists) return
    console.log("Existuje roomka")
    const localPC = new RTCPeerConnection(configuration);
    console.log("Vytvoril som rtc");
    localPC.addStream(localStream);
    console.log("Pridalo to stream")
    const calleeCandidatesCollection = roomRef.collection('calleeCandidates');
    console.log("Neviem teraz");
    localPC.onicecandidate = e => {
      if (!e.candidate) {
        console.log('Got final candidate!');
        return;
      }
      calleeCandidatesCollection.add(e.candidate.toJSON());
    };
    console.log("Preslo to ten divny if");

    localPC.onaddstream = e => {
      if (e.stream && remoteStream !== e.stream) {
        console.log('RemotePC received the stream join', e.stream);
        setRemoteStream(e.stream);
      }
    };
    console.log("Druhy divny if");

    const offer = roomSnapshot.data().offer;
    await localPC.setRemoteDescription(new RTCSessionDescription(offer));
    console.log("Mhm toto neviem co robi absolutne");

    const answer = await localPC.createAnswer();
    await localPC.setLocalDescription(answer);
    console.log("Caukooooooooooooooooooo");

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
      <Text style={styles.heading} >Join Screen</Text>
      <Text style={styles.heading} >Room : {route.params.roomId}</Text>

      <View style={styles.callButtons} >
        <View styles={styles.buttonContainer} >
          <Button title="Click to stop call" onPress={onBackPress} />
        </View>
        <View styles={styles.buttonContainer} >
          {!localStream && <Button title='Click to start stream' onPress={startLocalStream} />}
          {localStream && <Button title='Click to join call' onPress={() => joinCall(route.params.roomId)} disabled={!!remoteStream} />}
        </View>
      </View>

      {localStream && (
        <View style={styles.toggleButtons}>
          <Button title='Switch camera' onPress={switchCamera} />
          <Button title={`${isMuted ? 'Unmute' : 'Mute'} stream`} onPress={toggleMute} disabled={!remoteStream} />
        </View>
      )}

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
    }
  });