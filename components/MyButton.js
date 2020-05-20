import React from 'react'
import { Text, TouchableOpacity, StyleSheet } from 'react-native'
import { purple, white, red, gray, black } from '../utils/colors'
import { FontAwesome } from '@expo/vector-icons'

export default function MyButton ({ children, onPress, style = {}, type }) {
  // style: default = 'outline', 'primary', 'error', 'secondary', 'text', 'float'
  switch (type) {
    case 'float':
      return (
        <TouchableOpacity style={styles.btnFloat} onPress={onPress}>
          <FontAwesome name='plus' color={white} size={30}/>
        </TouchableOpacity>
      )
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
    fontSize: 18,
  },
  btnPrimary: {
    padding: 10,
    backgroundColor: purple,
    alignSelf: 'center',
    borderRadius: 5,
    marginLeft: 20,
    marginRight: 20,
    marginTop: 10,
  },
  btnError: {
    padding: 10,
    backgroundColor: red,
    alignSelf: 'center',
    borderRadius: 5,
    marginLeft: 20,
    marginRight: 20,
    marginTop: 10,
  },
  btnSecondary: {
    padding: 10,
    backgroundColor: gray,
    alignSelf: 'center',
    borderRadius: 5,
    marginLeft: 20,
    marginRight: 20,
    marginTop: 10,
  },
  btnOutline: {
    padding: 10,
    backgroundColor: white,
    borderColor: purple,
    alignSelf: 'center',
    borderRadius: 5,
    marginLeft: 20,
    marginRight: 20,
    marginTop: 10,
  },
  btnFloat: {
    position: 'absolute',
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    right: 30,
    bottom: 30,
    backgroundColor: purple,
    borderRadius: 50,
  },
})