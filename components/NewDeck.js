import React, { Component } from 'react'
import { View, Text, StyleSheet, Keyboard } from 'react-native'
import MyButton from './MyButton'
import { TextInput, Snackbar } from 'react-native-paper'
import { white, green, red } from '../utils/colors'
import { saveDeckTitle } from '../utils/helpers'
import { connect } from 'react-redux'
import { createDeck, removeDeck } from '../actions/decks'

class NewDeck extends Component {
  state = {
    title: '',
    visible: false,
    message: '',
    messageType: ''
  }

  onDismissSnackBar = () => {
    this.setState(() => ({ visible: false }))
  }

  isExist = (title, deckNames) => {
    return (deckNames.find((item) => item.toUpperCase() === title.toUpperCase()) ? true : false)
  }

  removeDeck = (title) => {
    const { dispatch } = this.props

    // remove from redux
    dispatch(removeDeck(input))
  }

  handleSubmit = () => {
    const { navigation, deckNames, dispatch } = this.props
    const { title } = this.state

    if (title === '') {
      this.setState(() => ({
        messageType: 'Error',
        visible: true,  // enable message alert
        message: `Please input the deck title.`,
      }))
    } else {
      // check if the deck title is already exist
      let isExist = this.isExist(title, deckNames)

      if (isExist === true) {
        this.setState(() => ({
          messageType: 'Error',
          visible: true,  // enable message alert
          message: `The deck '${title}' is already exist.`,
        }))
      } else {
        Keyboard.dismiss()
        this.setState(() => ({
          title: '',
          // NOTE: No need to show notification when navigating to the new deck
        }))

        // update redux
        dispatch(createDeck(title))

        // update database
        saveDeckTitle(title)
          .then(
            // navigate the Deck screen with this new Deck
            navigation.navigate('Deck', {
              deckId: title
            })
          )
          .catch((e) => {
            // if error, remove newly created deck from redux
            this.removeDeck(title)
            console.warn('NewDeck: error when creating a new deck.')
          })
      }
    }
  }

  render() {
    const { visible, message, messageType } = this.state

    return (
      <View style={styles.container}>
        <TextInput 
          label='Deck title'
          placeholder='Enter deck title here...'
          mode='outlined'
          value={this.state.title}
          onChangeText={text => this.setState(() => ({ title: text }))}
        />
        <MyButton type='primary' onPress={this.handleSubmit}>Create Deck</MyButton>
        
        <Snackbar 
          style={{backgroundColor: messageType === 'OK' ? green : red }}
          duration={2000}
          visible={visible}
          onDismiss={this.onDismissSnackBar}
          >
          <Text style={{color: white}}>{message}</Text>
        </Snackbar>
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
  }
})

function mapStateToProps({decks}) {
  return {
    deckNames: Object.keys(decks)
  }
}

export default connect(mapStateToProps)(NewDeck)