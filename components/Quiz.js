import React, { Component } from 'react'
import { View, Text, StyleSheet, StatusBar } from 'react-native'
import { render } from 'react-dom'
import MyButton from './MyButton'

export default class Quiz extends Component {
  render() {
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