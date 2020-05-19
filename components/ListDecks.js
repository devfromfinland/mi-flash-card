import React, { Component } from 'react'
import { View, Text, StyleSheet, StatusBar } from 'react-native'
import { render } from 'react-dom'
import Button from './Button'

export default class ListDecks extends Component {
  render() {
    const { navigation } = this.props
    return (
      <View>
        <Text>LIST OF DECKS</Text>
        <Button type='primary' onPress={() => navigation.navigate('Deck')}>Go to Deck</Button>
        <Button onPress={() => navigation.navigate('NewDeck')}>Add new Deck</Button>
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