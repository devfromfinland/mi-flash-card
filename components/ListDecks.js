import React, { Component } from 'react'
import { View, Text, StyleSheet, StatusBar } from 'react-native'
import { render } from 'react-dom'
import MyButton from './MyButton'

export default class ListDecks extends Component {
  render() {
    let sampleData = {
      React: {
        title: 'React',
        questions: [
          {
            question: 'What is React?',
            answer: 'A library for managing user interfaces'
          },
          {
            question: 'Where do you make Ajax requests in React?',
            answer: 'The componentDidMount lifecycle event'
          }
        ]
      },
      JavaScript: {
        title: 'JavaScript',
        questions: [
          {
            question: 'What is a closure?',
            answer: 'The combination of a function and the lexical environment within which that function was declared.'
          }
        ]
      }
    }
    let decks = Object.keys(sampleData)

    const { navigation } = this.props
    return (
      <View style={{flex: 1}}>
        <Text>LIST OF DECKS</Text>
        {decks.map((deckId) => (
          <View key={deckId}>
            <Text>
              Deck {sampleData[deckId].title} has {sampleData[deckId].questions.length} cards
            </Text>
            <MyButton type='text' onPress={() => {
              navigation.navigate('Deck', {
                deckId
              })
            }}>
              Go
            </MyButton>
          </View>
        ))}
        <MyButton type='float' onPress={() => navigation.navigate('NewDeck')} />
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