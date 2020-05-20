import React from 'react'
import { View, Text, StyleSheet, Switch } from 'react-native'
import { gray } from '../utils/colors'

export default function ListDeckItem ({ title, content, onPress }) {
  return (
    <View style={styles.container} onPress={onPress}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.body}>{content} {content > 1 ? 'cards' : 'card'}</Text>
    </View>

  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    justifyContent: 'center',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(220, 220, 220, 0.5)',
    borderBottomStartRadius: 1,
  },
  title: {
    fontSize: 20,
  },
  body: {
    color: gray,
    marginTop: 5,
  }
})