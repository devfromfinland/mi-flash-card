import React from 'react'
import { Text, TouchableOpacity, StyleSheet } from 'react-native'
import { purple, white, red, gray, black } from '../utils/colors'

export default function Button ({ children, onPress, style = {}, type }) {
  // style: default = 'outline', 'primary', 'error', 'secondary', 'text'
  switch (type) {
    case 'text':
      return (
        <TouchableOpacity onPress={onPress}>
          <Text style={[styles.btnText, { color: purple }, style]}>{children.toUpperCase()}</Text>
        </TouchableOpacity>
      )
    case 'primary':
      return (
        <TouchableOpacity style={styles.btnPrimary} onPress={onPress}>
          <Text style={[styles.btnText, { color: white }, style]}>{children.toUpperCase()}</Text>
        </TouchableOpacity>
      )
    case 'error':
      return (
        <TouchableOpacity style={styles.btnError} onPress={onPress}>
          <Text style={[styles.btnText, { color: white }, style]}>{children.toUpperCase()}</Text>
        </TouchableOpacity>
      )
    case 'secondary':
      return (
        <TouchableOpacity style={styles.btnSecondary} onPress={onPress}>
          <Text style={[styles.btnText, { color: black }, style]}>{children.toUpperCase()}</Text>
        </TouchableOpacity>
      )
    default: // outline
      return (
        <TouchableOpacity style={styles.btnOutline} onPress={onPress}>
          <Text style={[styles.btnText, { color: purple }, style]}>{children.toUpperCase()}</Text>
        </TouchableOpacity>
      )
  }
}

const styles = StyleSheet.create({
  btnText: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
  },
  btnPrimary: {
    padding: 10,
    backgroundColor: purple,
    alignSelf: 'center',
    borderRadius: 5,
    margin: 20,
  },
  btnError: {
    padding: 10,
    backgroundColor: red,
    alignSelf: 'center',
    borderRadius: 5,
    margin: 20,
  },
  btnSecondary: {
    padding: 10,
    backgroundColor: gray,
    alignSelf: 'center',
    borderRadius: 5,
    margin: 20,
  },
  btnOutline: {
    padding: 10,
    backgroundColor: white,
    borderColor: purple,
    alignSelf: 'center',
    borderRadius: 5,
    margin: 20,
  },
})