import React from 'react'
import { AsyncStorage } from 'react-native'
import Permissions from 'expo-permissions'
import { Notifications } from 'expo'
// import AsyncStorage from '@react-native-community/async-storage'

const FLASHCARD_STORAGE_KEY = 'MiFlashCard:Production'
const NOTIFICATION_KEY = 'MiFlashCard:notifications'

// (done) take in a single id argument and return the deck associated with that id
export async function getDeck(id) {
  try {
    let result = await AsyncStorage.getItem(FLASHCARD_STORAGE_KEY)
    let data = Object.values(JSON.parse(result))
    let filteredData = data.filter((item) => item.title === id)[0]
    return filteredData
  } catch(e) {
    console.log('error when fetching decks')
  }
}

// (done) return all of the decks along with their titles, questions, and answers from local database
export async function getDecks() {
  try {
    const data = await AsyncStorage.getItem(FLASHCARD_STORAGE_KEY)
    return data !== null ? JSON.parse(data) : null
  } catch(e) {
    console.log('error when fetching decks')
  }
}

export function formatNewTitle(title, cards = null) {
  return {
    [title]: {
      title: title,
      questions: cards === null ? [] : [...cards]
    }
  }
}

// (done) take in a single title argument and add it to the decks
export async function saveDeckTitle(title) {
  try {
    // check data is not exist, create new
    const data = await AsyncStorage.getItem(FLASHCARD_STORAGE_KEY)

    if (data === null) {
      return saveDecks(formatNewTitle(title))
    }

    // should have a function to check if local data is valid
    // if local data was incorrectly saved, then should clear that local data

    // if data is exist, merge with existing data
    await AsyncStorage.mergeItem(FLASHCARD_STORAGE_KEY, JSON.stringify(formatNewTitle(title)))
  } catch (e) {
    console.log('error when saving deck title', e)
  }
}

// (done) replace a deck with a new one (same key) in database
async function updateDeck(deck) {
  try {
    await AsyncStorage.mergeItem(FLASHCARD_STORAGE_KEY, JSON.stringify(deck))
  } catch (e) {
    console.log('error when updating deck', e)
  }
}

export async function removeDeckFromDatabase(title) {
  try {
    getDecks()
      .then((result) => {
        const newDecks = Object.values(result)
          .filter((item) => item.title !== title)
          .reduce((obj, item) => {
            obj[item.title] = item
            return obj
          }, {})
        return newDecks
      })
      .then((newDecks) => saveDecks(newDecks))
  } catch (e) {
    console.log('@helpers, error when removing deck', e)
  }
}

// take in two arguments, title and card,
// and will add the card to the list of questions for the deck with the associated title
export async function addCardToDeck(title, card) {
  try {
    getDeck(title)
      .then((result) => {
        let newDeck = {
          [title]: {
            title: title,
            questions: [...result.questions, card]
          }
        }

        updateDeck(newDeck)
      })
  } catch (e) {
    console.log('error when adding new card to deck', e)
  }
}

// (done) save all current state to database
export async function saveDecks(decks) {
  try {
    const jsonValue = JSON.stringify(decks)
    // console.log('decks to be saved: ', jsonValue)
    await AsyncStorage.setItem(FLASHCARD_STORAGE_KEY, jsonValue)
  } catch (e) {
    console.log('error when saving decks')
  }
}

export function arrayToObject(array) {
  array.reduce((obj, item) => {
    obj[item.id] = item
    return obj
  }, {})
}

export function clearLocalNotifcation() {
  return AsyncStorage.removeItem(NOTIFICATION_KEY)
    .then(Notifications.cancelAllScheduledNotificationsAsync)
}

function createNotification() {
  return {
    title: 'Learning reminder',
    body: " 📚 You haven't complete any Quiz today.",
    ios: {
      sound: true,
    },
    android: {
      sound: true,
      priority: 'high',
      sticky: false,
      vibrate: true,
    }
  }
}

export function setLocalNotification() {
  AsyncStorage.getItem(NOTIFICATION_KEY)
    .then(JSON.parse)
    .then((data) => {
      if (data === null) {
        Permissions.askAsync(Permissions.NOTIFICATIONS)
          .then(({ status }) => {
            if (status === 'granted') {
              Notifications.cancelAllScheduledNotificationsAsync()

              let tomorrow = new Date()
              tomorrow.setDate(tomorrow.getDate() + 1)
              tomorrow.setHours(20)
              tomorrow.setMinutes(0)

              Notifications.scheduleLocalNotificationAsync(
                createNotification(),
                {
                  time: tomorrow,
                  repeat: 'day'
                },
                AsyncStorage.setItem(NOTIFICATION_KEY, JSON.stringify(true))
              )
            }
          })
      }
    })
}