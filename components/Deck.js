import React, { Component } from 'react'
import { View, Text, StyleSheet, StatusBar } from 'react-native'
import { render } from 'react-dom'
import Button from './Button'

export default class Deck extends Component {
  render() {
    const { navigation } = this.props

    return (
      <View>
        <Text>DECK</Text>
        <Button type='primary' onPress={() => navigation.navigate('Quiz')}>Go to Quiz</Button>
        <Button onPress={() => navigation.navigate('NewCard')}>Add new Card</Button>
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