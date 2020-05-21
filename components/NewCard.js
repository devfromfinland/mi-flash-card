import React, { Component } from 'react'
import { View, Text, StyleSheet, TextInput, KeyboardAvoidingView, Platform, Keyboard, Dimensions } from 'react-native'
import MyButton from './MyButton'
import { purple, white, gray, red, green } from '../utils/colors'
import { Snackbar } from 'react-native-paper'

export default class NewCard extends Component {
  state = {
    question: '',
    answer: '',
    visible: false,
    message: '',
    messageType: '',
  }

  isExist = (question, deck) => {
    console.log('deck: ', deck)
    return (deck.questions.find((item) => item.question.toUpperCase() === question.toUpperCase()) ? true : false)
  }

  handleSubmit = () => {
    const { deckId, data } = this.props.route.params
    const { question, answer } = this.state
    const deck = data.filter((item) => item.title === deckId)[0]

    if (question === '' || answer === '') {
      this.setState(() => ({
        visible: true,
        messageType: 'Error',
        message: `Please input the question and answer.`,
      }))
    } else if (this.isExist(question, deck) === true) {
      // inform error message
      this.setState(() => ({
        visible: true,
        messageType: 'Error',
        message: `The card's question is already exist in this deck.`,
      }))
    } else {
      Keyboard.dismiss()

      // save to database
      // AsyncStorage

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