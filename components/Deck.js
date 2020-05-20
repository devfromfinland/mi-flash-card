import React, { Component } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import MyButton from './MyButton'

export default class Deck extends Component {
  render() {
    const { route, navigation } = this.props
    const { deckId, data } = route.params

    const deck = data.filter((item) => item.title === deckId)[0]

    return (
      <View style={styles.container}>
        <Text style={styles.title}>{deck.title}</Text>
        <Text style={styles.description}>
          This deck has {deck.questions.length} {deck.questions.length > 1 ? 'cards' : 'card'}.
          There should be a short description of each deck in the data.
        </Text>
        <View style={{marginTop: 30}} />

        {/* {console.log('deck = ', deck)} */}

        <MyButton
          type='primary'
          onPress={() => navigation.navigate('Quiz', { deckId: deck.title, data })}>
          Start Quiz
        </MyButton>

        <MyButton 
          onPress={() => navigation.navigate('NewCard', { deckId: deck.title, data })}>
          Add new Card
        </MyButton>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 20,
  },
  title: {
    fontSize: 30,
    marginBottom: 10,
  },
  description: {
    fontSize: 18,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
})