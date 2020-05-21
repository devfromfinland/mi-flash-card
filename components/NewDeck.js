import React, { Component } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import MyButton from './MyButton'
import { TextInput, Snackbar } from 'react-native-paper'
import { gray, white } from '../utils/colors'

export default class NewDeck extends Component {
  state = {
    title: '',
    visible: false,
    message: '',
  }

  onDismissSnackBar = () => {
    this.setState(() => ({ visible: false }))
  }

  handleSubmit = () => {
    const { navigation } = this.props

    // add new deck to database
    // console.log(this.state)

    // show notification
    this.setState(() => ({
      title: '',
      visible: true,  // success, inform user on screen
      message: `New deck has been added to your database.`,
    }))
  }

  render() {
    const { visible, message } = this.state

    return (
      <View style={styles.container}>
        <TextInput 
          label='Deck title'
          placeholder='Enter deck title here...'
          mode='outlined'
          value={this.state.title}
          onChangeText={text => this.setState(() => ({ title: text }))}
        />
        <MyButton type='primary' onPress={this.handleSubmit}>Submit</MyButton>
        
        <Snackbar 
          style={{backgroundColor: gray}}
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