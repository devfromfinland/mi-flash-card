import React, { Component } from 'react'
import { View, StyleSheet, FlatList, TouchableOpacity, Text } from 'react-native'
import MyButton from './MyButton'
import ListDeckItem from './ListDeckItem'
import { getDecks } from '../utils/helpers'
import { connect } from 'react-redux'
import { receiveDecks } from '../actions/decks'

class ListDecks extends Component {
  componentDidMount() {
    const { dispatch } = this.props

    // get data from database and bind it to redux
    getDecks()
      .then((decks) => {
        dispatch(receiveDecks(decks))
      })
      .catch((e) => {
        console.warn('action: error in getting decks.')
      })
  }

  render() {
    const { navigation, decks } = this.props

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

function mapStateToProps ({decks}) {
  return {
    decks: Object.values(decks)
  }
}
export default connect(mapStateToProps)(ListDecks)