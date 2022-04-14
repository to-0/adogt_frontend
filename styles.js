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
    color: '#f76226',
    margin: 20,
    borderRadius: 5,
    height: 35,
  },
  button_text: {
    alignSelf: 'center',
    marginTop: 7,
    color: 'white',
    textTransform: 'uppercase'
  },
  title: {
    fontSize:36,
    fontWeight:'bold',
  },
  link: { 
    color: 'brown',
  },
  background_image: {
    width: (Dimensions.get('window').width),
    height: (Dimensions.get('window').height),
  },
  small_background_image_full_width: {
    width: Dimensions.get('window').width, 
    height: Dimensions.get('window').height * 0.85,
  },
  small_background_image_full_height: {
    width: Dimensions.get('window').width, 
    height: Dimensions.get('window').height * 1.05,
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
  },
  profile_icon: {
    width: (Dimensions.get('window').width) * 0.3,
    height: undefined,
    aspectRatio: 1 / 1,
    margin: 20,
  },
  profile_text_fields: {
    width: (Dimensions.get('window').width) * 0.7,
    flex: 1,
    margin: 20,
    marginTop: 0,
  },
  profile_text: {
    fontSize: 18,
  },
  dog_detail: {
    margin: 20,
    marginTop: 20,
  },
  detail: {
    flexDirection: 'row',
    marginBottom: 15,
  },
  detail_info: {
    fontSize: 18,
    fontWeight: 'bold',
    marginRight: 10,
  },
  detail_text: {
    fontSize:18,
  },
  dog_detail_buttons: {
    flexDirection: 'row',
    margin: 20,
    marginTop: 15,
    justifyContent: 'center',
  },
  dog_button: {
    margin: 15,
    width: (Dimensions.get('window').width) * 0.35,
    backgroundColor: '#f76226',
    color: '#f76226',
    borderRadius: 5,
    height: 35,
  },
  dog_form: {
    flexDirection: 'column',
    alignItems: 'center',
    margin: 20,
    marginTop: 40,
  },
  dog_form_item: {
    width: (Dimensions.get('window').width) * 0.8,
    height: 36,
    backgroundColor: 'white',
    borderColor: 'black',
    borderWidth: 1,
    margin: 10,
    padding: 10,
    fontSize: 16,
    borderRadius: 5,
  },
  dog_form_item_multiline: {
    height: (Dimensions.get('window').height) * 0.12,
    textAlignVertical: 'top',
  },
  dog_form_info: {
    alignSelf: 'flex-start',
    marginLeft: 15,
  },
  form_detail: {
    margin: 20,
  },
  form_info_detail: {
    flexDirection: 'row',
    marginTop: 10,
  },
  form_finished: {
    fontSize: 18,
    textTransform: 'uppercase',
  },
  checkbox_view: {
    flexDirection: 'row', 
    width: (Dimensions.get('window').width), 
    paddingLeft: 20,
  },
  registration_checkbox_view: {
    flexDirection: 'row', 
    width: (Dimensions.get('window').width), 
    justifyContent: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  checkbox: {
    marginLeft: (Dimensions.get('window').width) * 0.25,
  },
  calendar: {
    width: (Dimensions.get('window').width) * 0.8,
    marginBottom: 20,
  },
  calendar_text: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
    marginTop: 10,
  },
  center_view: {
    flex: 1, 
    alignItems: 'center', 
    justifyContent: 'flex-start', 
  },
  cButtons: {
    backgroundColor: '#f76226',
    color: '#f76226',
    borderRadius: 5,
    margin: 5,
    height: 35,
    width: (Dimensions.get('window').width) * 0.4,
  },
  dropdown: {
    width: (Dimensions.get('window').width) * 0.8,
    marginBottom: 20,
  }
});