import React, { Component } from 'react'
import { View, StyleSheet, FlatList, TouchableOpacity, Text } from 'react-native'
import MyButton from './MyButton'
import ListDeckItem from './ListDeckItem'
import { saveDecks, getDecks } from '../utils/helpers'
// import { connect } from 'react-redux'

class ListDecks extends Component {
  state = {
    decks: null
  }

  componentDidMount() {
    // get data from local storage
    getDecks()
      .then((result) => {
        (result !== null)
          ? this.setState({ decks: Object.values(result) })
          : null
    })
  }

  render() {
    const { navigation } = this.props
    const { decks } = this.state

    return (
      <View style={{flex: 1}}>
        <FlatList 
          data={decks}
          ListEmptyComponent={
            <View style={[styles.container, {justifyContent: 'center'}]}>
              <Text style={[styles.notif, {marginBottom: 20}]}>
                There is no deck yet.
              </Text>
            </View>}
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

        <MyButton type='float' onPress={() => navigation.navigate('NewDeck', {data: decks})} />

      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 20,
  },
  notif: {
    fontSize: 30,
    textAlign: 'center',
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
})

// to connect to redux
export default ListDecks