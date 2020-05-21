import React, { Component } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import MyButton from './MyButton'
import { getDeck } from '../utils/helpers'

export default class Deck extends Component {
  state = {
    deck: null
  }

  componentDidMount() {
    const { deckId } = this.props.route.params

    getDeck(deckId)
      .then((result) => this.setState({
        deck: result
      }))
  }

  render() {
    const { route, navigation } = this.props
    const { deckId, data } = route.params

    const { deck } = this.state
    
    console.log('fetched deck: ', deck)

    if (deck === null || typeof(deck) === 'undefined') {
      return <View><Text>Fail</Text></View>
    }

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
    alignSelf: 'center',
  },
  description: {
    fontSize: 18,
    alignSelf: 'center',
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
})