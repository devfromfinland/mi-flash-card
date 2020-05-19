import React from 'react'
import { Platform, StyleSheet, Text, View } from 'react-native'
import Button from './Button'

const instructions = Platform.select({
  ios: `Press Cmd+R to reload,\nCmd+D or shake for dev menu`,
  android: `Double tap R on your keyboard to reload,\nShake or press menu button for dev menu`,
})

export default function App() {
  return (
    <View style={styles.container}>
      <Button onPress={console.log('Button pressed')}>Default</Button>
      <Button type='primary' onPress={console.log('Button pressed')}>Primary</Button>
      <Button type='secondary' onPress={console.log('Button pressed')}>Secondary</Button>
      <Button type='text' onPress={console.log('Button pressed')}>Text</Button>
      <Button type='error' onPress={console.log('Button pressed')}>Error</Button>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
})
