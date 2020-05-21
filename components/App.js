import React, { Component } from 'react'
import { Platform, StyleSheet, Text, View, StatusBar } from 'react-native'
import Constants from 'expo-constants'
import MyButton from './MyButton'
import { purple } from '../utils/colors'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import ListDecks from './ListDecks'
import Deck from './Deck'
import NewCard from './NewCard'
import NewDeck from './NewDeck'
import Quiz from './Quiz'
import { getDecks } from '../utils/helpers'

function MyStatusBar ({ backgroundColor, ...props }) {
  return (
    <View style={{backgroundColor, height: Constants.statusBarHeight}}>
      <StatusBar translucent backgroundColor={backgroundColor} {...props} />
    </View>
  )
}

const Stack = createStackNavigator()

class App extends Component {
  componentDidMount() {
    // load data from local storage, then set data to redux store
    
  }

  render() {
    return (
      <View style={styles.container}>
        <MyStatusBar backgroundColor={purple} barStyle='light'/>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen name='ListDecks' component={ListDecks}/>
            <Stack.Screen name='Deck' component={Deck}/>
            <Stack.Screen name='NewCard' component={NewCard}/>
            <Stack.Screen name='NewDeck' component={NewDeck}/>
            <Stack.Screen name='Quiz' component={Quiz}/>
          </Stack.Navigator>
        </NavigationContainer>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})

export default App