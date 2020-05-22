import { getDecks, saveDeckTitle, formatNewTitle } from '../utils/helpers'
export const CREATE_DECK = 'CREATE_DECK'
export const GET_DECKS = 'GET_DECKS'
export const REMOVE_DECK = 'REMOVE_DECK'
export const ADD_CARD = 'ADD_CARD'
export const REMOVE_CARD = 'REMOVE_CARD'

export function receiveDecks (decks) {
  return {
    type: GET_DECKS,
    decks,
  }
}

export function createDeck (title) {
  return {
    type: CREATE_DECK,
    deck: formatNewTitle(title),
  }
}

export function removeDeck (title) {
  return {
    type: REMOVE_DECK,
    title,
  }
}

export function addCard (title, card) {
  return {
    type: ADD_CARD,
    title,
    card,
  }
}

export function removeCard (title, cardQuestion) {
  return {
    type: REMOVE_CARD,
    title,
    cardQuestion,
  }
}

export function handleGetDecks() {
  return (dispatch) => {
    console.log('handleGetDecks')
    return getDecks()
      .then((decks) => {
        console.log('action, decks: ', decks)
        dispatch(receiveDecks(decks))
      })
      .catch((e) => {
        console.warn('action: error in getting decks.')
      })
  }
}

export function handleCreateDeck(title) {
  return (dispatch) => {
    dispatch(createDeck(title))

    return saveDeckTitle(title)
      .catch((e) => {
        console.warn('action: error in creating a new deck.')

        // remove deck from redux's state
      })
  }
}