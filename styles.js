import { StyleSheet, Dimensions } from 'react-native'

export default StyleSheet.create({
  navigation_icon: {
    width: (Dimensions.get('window').width) * 0.08,
    height: undefined,
    aspectRatio: 1 / 1,
  },
  form: {
    width: (Dimensions.get('window').width) * 0.6,
    backgroundColor: 'white',
    borderColor: 'black',
    borderBottomColor: 'black',
    borderBottomWidth: 1,
    margin: 10,
  },
  button: {
    width: (Dimensions.get('window').width) * 0.6,
    backgroundColor: '#f76226',
    margin: 20,
  },
  title: {
    fontSize:36,
    fontWeight:'bold',
  },
  link: { 
    color: 'brown',
  },
  background_image: {
    width: '100%',
    height: '100%',
  },
  item: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    backgroundColor: '#e6e6e6',
    padding: 20,
  },
  item_title: {
    fontSize: 25,
    fontWeight: 'bold'
  },
  item_text: {
    fontSize: 14,
  },
  icon: {
    width: (Dimensions.get('window').width) * 0.1,
    height: undefined,
    aspectRatio: 1 / 1,
    alignSelf: 'flex-end'
  },
  item_image: {
    width: (Dimensions.get('window').width),
    height: undefined,
    aspectRatio: 1 / 1,
  }
});