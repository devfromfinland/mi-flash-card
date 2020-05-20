import React from 'react'
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

function MyStatusBar ({ backgroundColor, ...props }) {
  return (
    <View style={{backgroundColor, height: Constants.statusBarHeight}}>
      <StatusBar translucent backgroundColor={backgroundColor} {...props} />
    </View>
  )
}

const instructions = Platform.select({
  ios: `Press Cmd+R to reload,\nCmd+D or shake for dev menu`,
  android: `Double tap R on your keyboard to reload,\nShake or press menu button for dev menu`,
})

const Stack = createStackNavigator()

let sampleData = {
  React: {
    title: 'React',
    questions: [
      {
        question: 'What is React?',
        answer: 'A library for managing user interfaces'
      },
      {
        question: 'Where do you make Ajax requests in React?',
        answer: 'The componentDidMount lifecycle event'
      }
    ]
  },
  JavaScript: {
    title: 'JavaScript',
    questions: [
      {
        question: 'What is a closure?',
        answer: 'The combination of a function and the lexical environment within which that function was declared.'
      }
    ]
  }
}

export default function App() {
  return (
    <View style={styles.container}>
      <MyStatusBar backgroundColor={purple} barStyle='light'/>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name='Decks' component={ListDecks}/>
          <Stack.Screen name='Deck' component={Deck}/>
          <Stack.Screen name='NewCard' component={NewCard}/>
          <Stack.Screen name='NewDeck' component={NewDeck}/>
          <Stack.Screen name='Quiz' component={Quiz}/>
        </Stack.Navigator>
      </NavigationContainer>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})
