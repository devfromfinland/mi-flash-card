import React, { Component } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import MyButton from './MyButton'
import { connect } from 'react-redux'
// import { TextInput } from 'react-native-paper'
// import { removeCard } from '../actions/decks'

class Deck extends Component {
  // state = {
  //   input: '' // FOR TESTING
  // }

  // removeCardFromRedux = () => {
  //   const { dispatch, deckId } = this.props
  //   dispatch(removeCard(deckId, this.state.input))
    
  //   // FOR TESTING
  //   // this.setState(() => ({ input: '' }))
  // }

  render() {
    const { navigation, deck } = this.props

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

        <MyButton
          type='primary'
          onPress={() => navigation.navigate('Quiz', { deckId: deck.title })}>
          Start Quiz
        </MyButton>

        <MyButton 
          onPress={() => navigation.navigate('NewCard', { deckId: deck.title })}>
          Add new Card
        </MyButton>

        {/* FOR TEST */}
        {/* <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <TextInput 
            label='Card question'
            placeholder='Which card question you want to remove?'
            mode='flat'
            value={this.state.input}
            onChangeText={text => this.setState(() => ({ input: text }))}
          />
          <MyButton 
            type='primary'
            onPress={this.removeCardFromRedux}>
            Remove card
          </MyButton>
        </View> */}
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

function mapStateToProps({decks}, props) {
  let data = Object.values(decks)
  let { deckId } = props.route.params
  return {
    deck: data.filter((item) => item.title === deckId)[0],
    deckId,
  }
}

export default connect(mapStateToProps)(Deck)