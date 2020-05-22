import { CREATE_DECK, GET_DECKS, REMOVE_DECK, ADD_CARD, REMOVE_CARD } from '../actions/decks'
import { arrayToObject } from '../utils/helpers'

export default function decks (state = {}, action) {
  switch (action.type) {
    case GET_DECKS:
      return {
        ...state,
        ...action.decks
      }
    case CREATE_DECK:
      return {
        ...state,
        ...action.deck
      }
    case REMOVE_DECK:
      const newState = Object.values(state).filter((item) => item.title !== action.title)
      const convertedToObject = newState.reduce((obj, item) => {
        obj[item.title] = item
        return obj
      }, {})
      return convertedToObject
    case ADD_CARD:
      return {
        ...state,
        [action.title]: {
          title: state[action.title].title,
          questions: [
            ...state[action.title].questions,
            action.card,
          ]
        }
      }
    case REMOVE_CARD:
      console.log('begin', state)
      return {
        ...state,
        [action.title]: {
          title: state[action.title].title,
          questions: [
            ...state[action.title].questions.filter((item) => item.question !== action.cardQuestion)
          ]
        }
      }
    default:
      return state
  }
}