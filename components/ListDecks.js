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
      },
      Item1: {
        title: 'Item1',
        questions: [
          {
            question: 'q1',
            answer: 'a1'
          }
        ]
      },
      Item2: {
        title: 'Item2',
        questions: [
          {
            question: 'q1',
            answer: 'a1'
          }
        ]
      },
      Item3: {
        title: 'Item3',
        questions: [
          {
            question: 'q1',
            answer: 'a1'
          }
        ]
      },
      Item4: {
        title: 'Item4',
        questions: [
          {
            question: 'q1',
            answer: 'a1'
          }
        ]
      },
      Item5: {
        title: 'Item5',
        questions: [
          {
            question: 'q1',
            answer: 'a1'
          }
        ]
      },
      Item6: {
        title: 'Item6',
        questions: [
          {
            question: 'q1',
            answer: 'a1'
          }
        ]
      },
      Item7: {
        title: 'Item7',
        questions: [
          {
            question: 'q1',
            answer: 'a1'
          }
        ]
      },
      Item8: {
        title: 'Item8',
        questions: [
          {
            question: 'q1',
            answer: 'a1'
          }
        ]
      },
      Item9: {
        title: 'Item9',
        questions: [
          {
            question: 'q1',
            answer: 'a1'
          }
        ]
      },
    }

    let decks = Object.values(sampleData)

    console.log('decks', decks)

    const { navigation } = this.props

    return (
      <View style={{flex: 1}}>
        <FlatList 
          data={decks}
          renderItem={({ item }) => 
            <TouchableOpacity onPress={() => {
              navigation.navigate('Deck', {
                deckId: item.title
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