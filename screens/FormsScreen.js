import * as React from 'react';
import { View, Text, TextInput, Button, FlatList, AppRegistry, Dimensions, ImageBackground, Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import styles from '../styles'
const HOST = '192.168.1.18'
function FormsScreen({route, navigation}) {
    return(
        <View>
            <Text>Some forms will be here</Text>
        </View>
    )
}
export default FormsScreen