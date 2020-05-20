import React, { Component } from 'react'
import { View, Text, StyleSheet, StatusBar } from 'react-native'
import { render } from 'react-dom'
import MyButton from './MyButton'

export default class Quiz extends Component {
  render() {
    const { route, navigation } = this.props
    const { deckId, data } = route.params
    
    return (
      <View>
        <Text>QUIZ</Text>
        <Text>DeckID = {deckId}</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
})