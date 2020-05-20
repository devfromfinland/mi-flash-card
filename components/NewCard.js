import React, { Component } from 'react'
import { View, Text, StyleSheet, StatusBar } from 'react-native'
import { render } from 'react-dom'
import MyButton from './MyButton'

export default class NewCard extends Component {
  render() {
    const { route, navigation } = this.props
    const { deckId, data } = route.params

    // console.log('props in NewCard:', JSON.stringify(this.props))
    
    return (
      <View>
        <Text>NEW CARD</Text>
        <Text>DeckID = {deckId}</Text>
        <MyButton type='primary' onPress={() => navigation.navigate('Deck')}>Submit</MyButton>
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