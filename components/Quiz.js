import React, { Component } from 'react'
import { View, Text, StyleSheet,Platform } from 'react-native'
import MyButton from './MyButton'
import { Ionicons } from '@expo/vector-icons'

export default class Quiz extends Component {
  state = {
    position: 1,
    side: 'question'
  }

  next = () => this.setState((state) => ({
    position: state.position + 1
  }))

  reset = () => this.setState(() => ({
    position: 1
  }))

  toggleText = () => this.setState((state) => ({
    side: state.side === 'question' ? 'answer' : 'question'
  }))

  render() {
    const { route } = this.props
    const { deckId, data } = route.params
    const { position, side } = this.state

    const deck = data.filter((item) => item.title === deckId)[0]
    
    // check if there is no card, then render Empty view
    if (deck.questions.length === 0) {
      return <View style={[styles.container, {justifyContent: 'center'}]}>
        <Text style={[styles.notif, {marginBottom: 20}]}>
          The deck has no card.
        </Text>
        <Text style={styles.notif}>
          Please go back, add cards to deck to start Quiz.
        </Text>
      </View>
    }

    // check if last card has learn, then render Complete view
    if (position > deck.questions.length) {
      return <View style={{flex: 1, margin: 20, justifyContent: 'center'}}>
        <Ionicons name={Platform.OS === 'ios' ? 'ios-happy' : 'md-happy'} size={50} style={{alignSelf: 'center'}}/>
        <Text style={[styles.notif, {marginBottom: 40, marginTop: 20}]}>
          Congratulations! You have gone through the deck. Wanna start over?
        </Text>
        <MyButton type='text' onPress={this.reset}>
          Reset
        </MyButton>
      </View>
    }

    return (
      <View style={[styles.container, {justifyContent: 'space-between'}]}>
        <Text style={{fontSize: 20}}>
          {position} / {deck.questions.length}
        </Text>

        <View style={{alignSelf: 'center'}}>
          <Text style={styles.mainText}>
            {side === 'question'
              ? deck.questions[position-1].question
              : deck.questions[position-1].answer
            }
          </Text>
          <MyButton type='text' onPress={this.toggleText}>
            {side}
          </MyButton>
        </View>

        <View style={styles.buttons}>
          <MyButton type='primary' onPress={this.next}>Correct</MyButton>
          <MyButton type='error' onPress={this.next}>Wrong</MyButton>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 20,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 30,
  },
  mainText: {
    fontSize: 30,
    marginBottom: 30,
    textAlign: 'center'
  },
  notif: {
    fontSize: 30,
    textAlign: 'center',
  }
})