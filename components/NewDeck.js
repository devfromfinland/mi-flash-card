import React, { Component } from 'react'
import { View, Text, StyleSheet, Keyboard } from 'react-native'
import MyButton from './MyButton'
import { TextInput, Snackbar } from 'react-native-paper'
import { white, green, red } from '../utils/colors'
import { saveDeckTitle } from '../utils/helpers'

export default class NewDeck extends Component {
  state = {
    title: '',
    visible: false,
    message: '',
    messageType: ''
  }

  onDismissSnackBar = () => {
    this.setState(() => ({ visible: false }))
  }

  isExist = (title, data) => {
    return (data.find((item) => item.title.toUpperCase() === title.toUpperCase()) ? true : false)
  }

  handleSubmit = () => {
    const { route, navigation } = this.props
    const { title } = this.state

    if (title === '') {
      this.setState(() => ({
        messageType: 'Error',
        visible: true,  // success, inform user on screen
        message: `Please input the deck title.`,
      }))
    } else {
      // check if the deck title is already exist
      let isExist = false

      // console.log('route in NewDeck:' , route)
      // console.log('typeof route params:' , typeof(route.params))
      
      // if (typeof(route.params) !== 'undefined') {
      //   const { data } = route.params
      //   (data !== null) 
      //     ? isExist = this.isExist(title, data)
      //     : isExist = true
      // }

      if (isExist === true) {
        this.setState(() => ({
          messageType: 'Error',
          visible: true,  // success, inform user on screen
          message: `The deck '${title}' is already exist.`,
        }))
      } else {
        Keyboard.dismiss()

        // add new deck to database
        saveDeckTitle(title)

        // update redux

        // navigate the Deck screen with this new Deck
        // navigation.navigate('Deck', {
        //   deckId: title
        // })

        this.setState(() => ({
          title: '',
          messageType: 'OK',
          visible: true,  // success, inform user on screen
          message: `New deck '${title}' has been added to database.`,
        }))
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