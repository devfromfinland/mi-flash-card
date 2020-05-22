import React, { Component } from 'react'
import { View, Text, StyleSheet, TextInput, KeyboardAvoidingView, Platform, Keyboard, Dimensions } from 'react-native'
import MyButton from './MyButton'
import { purple, white, gray, red, green } from '../utils/colors'
import { Snackbar } from 'react-native-paper'
import { addCardToDeck } from '../utils/helpers'
import { addCard, removeCard } from '../actions/decks'
import { connect } from 'react-redux'

class NewCard extends Component {
  state = {
    question: '',
    answer: '',
    visible: false,
    message: '',
    messageType: '',
  }

  isExist = (question, deck) => {
    return (deck.questions.find((item) => item.question.toUpperCase() === question.toUpperCase()) ? true : false)
  }

  removeCardFromRedux = (question) => {
    const { dispatch, deckId } = this.props
    dispatch(removeCard(deckId, question))
  }

  handleSubmit = () => {
    const { dispatch, deck, deckId } = this.props
    const { question, answer } = this.state

    if (question === '' || answer === '') {
      Keyboard.dismiss()
      this.setState(() => ({
        visible: true,
        messageType: 'Error',
        message: `Please input the question and answer.`,
      }))
    } else if (this.isExist(question, deck) === true) {
      Keyboard.dismiss()
      // inform error message
      this.setState(() => ({
        visible: true,
        messageType: 'Error',
        message: `The card's question is already exist in this deck.`,
      }))
    } else {
      Keyboard.dismiss()

      let card = {
        question,
        answer,
      }

      // save to redux
      dispatch(addCard(deck.title, card))
      
      // save to database
      addCardToDeck(deck.title, card)
        .catch((e) => {
          // if error, remove newly created card from redux
          this.removeCardFromRedux(card.question)

          console.warn('NewCard: error when creating a new card.')
        })

      // clear input and inform success message
      this.setState(() => ({
        question: '',
        answer: '',
        visible: true,
        messageType: 'OK',
        message: `New card has been added to '${deckId}' deck.`,
      }))
    }
  }

  onDismissSnackBar = () => {
    this.setState(() => ({ visible: false }))
  }

  render() {
    const { deckId } = this.props.route.params
    const { question, answer, visible, message, messageType } = this.state

    return (
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <Text style={styles.description}>@Deck:</Text>
          <Text style={styles.deckName}>{deckId}</Text>
        </View>
        
        <TextInput
          style={styles.input}
          onChangeText={text => this.setState(() => ({ question: text }))}
          placeholder='Enter the question here...'
          value={question}
        />

        <TextInput
          style={styles.input}
          onChangeText={text => this.setState(() => ({ answer: text }))}
          placeholder='Enter the answer here...'
          value={answer}
        />
        
        <MyButton type='primary' onPress={this.handleSubmit}>
          Add
        </MyButton>

        <Snackbar 
          style={{backgroundColor: messageType === 'OK' ? green : red}}
          duration={2000}
          visible={visible}
          onDismiss={this.onDismissSnackBar}
          >
          <Text style={{color: white}}>{message}</Text>
        </Snackbar>
      </KeyboardAvoidingView>
    )
  }
}

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  container: {
    flex: 1,
    margin: 20,
  },
  description: {
    fontSize: 18,
    marginBottom: 30,
  },
  deckName: {
    fontSize: 18,
    marginBottom: 30,
  },
  input: {
    fontSize: 18,
    borderWidth: 1,
    borderColor: purple,
    height: 50,
    justifyContent: 'center',
    paddingLeft: 10,
    marginBottom: 20,
    borderRadius: 5,
  },
})

function mapStateToProps({decks}, props) {
  let data = Object.values(decks)
  let { deckId } = props.route.params
  return {
    deck: data.filter((item) => item.title === deckId)[0],
    deckId,
  }
}

export default connect(mapStateToProps)(NewCard)