import React, { Component } from 'react'
import { View, Text, StyleSheet, StatusBar } from 'react-native'
import { render } from 'react-dom'
import Button from './Button'

export default class Quiz extends Component {
  render() {
    const { navigation } = this.props
    return (
      <View>
        <Text>QUIZ</Text>
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