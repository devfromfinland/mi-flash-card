import React, { Component } from 'react'
import { View, Text, StyleSheet, TextInput, KeyboardAvoidingView, Platform, Keyboard } from 'react-native'
import MyButton from './MyButton'
import { purple, white, gray } from '../utils/colors'
import { Snackbar } from 'react-native-paper'

export default class NewCard extends Component {
  state = {
    question: '',
    answer: '',
    visible: false,
    message: '',
  }

  handleSubmit = () => {
    // save to database
    
    
    // hide the keyboard
    Keyboard.dismiss()

    // clear input for new input
    this.setState(() => ({
      question: '',
      answer: '',
      visible: true,  // success, inform user on screen
      message: 'New card has been added.',
    }))
  }

  _onToggleSnackBar = () => this.setState(state => ({ visible: !state.visible }));

  _onDismissSnackBar = () => this.setState({ visible: false });

  render() {
    const { route, navigation } = this.props
    const { deckId, data } = route.params
    const { question, answer } = this.state

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
          style={styles.notif}
          visible={this.state.visible}
          onDismiss={this._onDismissSnackBar}
          >
          <Text style={{color: white}}>{this.state.message}</Text>
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
  notif: {
    position: 'absolute',
    bottom: 0,
    backgroundColor: gray,
  },
})