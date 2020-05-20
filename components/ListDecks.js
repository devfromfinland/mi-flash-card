import React, { Component } from 'react'
import { View, StyleSheet, FlatList, TouchableOpacity } from 'react-native'
import MyButton from './MyButton'
import ListDeckItem from './ListDeckItem'
// import { connect } from 'react-redux'

class ListDecks extends Component {
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

    let decks = Object.values(sampleData)

    const { navigation } = this.props

    return (
      <View style={{flex: 1}}>
        <FlatList 
          data={decks}
          renderItem={({ item }) => 
            <TouchableOpacity onPress={() => {
              navigation.navigate('Deck', {
                deckId: item.title,
                data: decks
              })}
              }>
              <ListDeckItem 
                title={item.title}
                content={item.questions.length}
                />
            </TouchableOpacity>
          }
          keyExtractor={item => item.title}
        />

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

// to connect to redux
export default ListDecks