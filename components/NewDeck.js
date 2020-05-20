import React, { Component } from 'react'
import { View, Text, StyleSheet, StatusBar } from 'react-native'
import { render } from 'react-dom'
import MyButton from './MyButton'

export default class NewDeck extends Component {
  render() {
    const { navigation } = this.props
    return (
      <View>
        <Text>NEW DECK</Text>
        <MyButton type='primary' onPress={() => navigation.navigate('ListDecks')}>Submit</MyButton>
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