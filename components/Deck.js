import React, { Component } from 'react'
import { View, Text, StyleSheet, StatusBar } from 'react-native'
import { render } from 'react-dom'
import MyButton from './MyButton'

export default class Deck extends Component {
  render() {
    const { route, navigation } = this.props
    const { deckId } = route.params

    return (
      <View>
        <Text>DECK</Text>
        <Text>Received: {deckId}</Text>
        <MyButton type='primary' onPress={() => navigation.navigate('Quiz')}>Go to Quiz</MyButton>
        <MyButton onPress={() => navigation.navigate('NewCard')}>Add new Card</MyButton>
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